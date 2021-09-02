import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { Request, Response } from 'express';
import { Observable, of, throwError } from "rxjs";
import { map } from 'rxjs/operators';
import { IdempData } from "./idemp.cache";
import { IdempService } from "./idemp.service";

@Injectable()
export class IdempHttpInterceptor implements NestInterceptor {

    constructor(private idempService: IdempService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {

        try {
            const req: Request = context.switchToHttp().getRequest();
            const res: Response = context.switchToHttp().getResponse();
            const idempData = new IdempData();
            const needIdempotency = req.method == 'POST';

            if (needIdempotency) {

                idempData.idempotencyKey = req.headers['x-idempotency-key'] as string;

                if (!idempData.idempotencyKey) {
                    return throwError(new BadRequestException('Should be informed x-idempotency-key in header request'));
                }

                let transactionPrevious = null;
                try {
                    transactionPrevious = await this.idempService.get(idempData.idempotencyKey);
                } catch (err) {
                    if (err.name == 'LockError') {
                        return throwError(new RequestTimeoutException('Request timeout'));
                    }
                    return throwError(err);
                }

                if (transactionPrevious) {
                    return of(transactionPrevious.bodyResponse);
                }

                idempData.bodyRequest = JSON.stringify(req.body);
            }

            return next.handle()
                .pipe(
                    map(data => {
                        if (needIdempotency) {
                            if (res.statusCode >= 200 && res.statusCode <= 299) {
                                idempData.bodyResponse = data;
                                this.idempService.put(idempData).then();
                            }
                            this.idempService.finish().then();
                        }
                        return data;
                    })
                );
        } catch (err) {
            return throwError(err);
        }
    }
}
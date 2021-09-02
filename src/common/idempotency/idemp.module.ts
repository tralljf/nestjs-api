import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RedisModule } from "../redis/redis.module";
import { IdempCache } from "./idemp.cache";
import { IdempDml } from "./idemp.dml";
import { IdempService } from "./idemp.service";

@Module({
    imports: [RedisModule],
    providers: [IdempCache, IdempService, IdempDml],
    exports: [IdempService]
})
export class IdempModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}
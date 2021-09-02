import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RedisConnection } from "./redis.connection";

@Module({
    providers: [RedisConnection],
    exports: [RedisConnection]
})
export class RedisModule implements NestModule {
    configure(consumer: MiddlewareConsumer) { }
}
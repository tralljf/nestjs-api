import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerStartup {
    
    static init(app: INestApplication) {
        
        const config = new DocumentBuilder()
            .setTitle('Core Consent')
            .setDescription('The consent api')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('swagger', app, document);
    }
}
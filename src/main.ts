import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from "./interceptors";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    );

    app.useGlobalInterceptors(new ResponseInterceptor());

    app.use(cookieParser());
    
    await app.listen(process.env.PORT ?? 3000);
    console.log("Server is running on *3000 port");
}
bootstrap();

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
} from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const i18n = I18nContext.current(context);

        return next.handle().pipe(
            map(({ data, message }: { data: any, message: string }) => {
                return { success: true, message, data, error: null, errorName: null };
            }),
            catchError(err => {
                const status =
                    err instanceof HttpException
                        ? err.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR;

                const error =
                    err instanceof HttpException
                        ? err.getResponse()
                        : new InternalServerErrorException().getResponse();

                return throwError(
                    () =>
                        new HttpException(
                            {
                                success: false,
                                message: i18n.t("response.error"),
                                data: null,
                                error,
                                errorName: err.constructor.name,
                            },
                            status
                        )
                );
            })
        );
    }
}

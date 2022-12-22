import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            // setHeaders:{
            //     'X-RapidAPI-Key': 'db5bfb6e7dmshd75f04e1b5703dap101c4fjsnd53293920013',
            //     'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
            // },
            setParams:{
                key: '5cc88aa4332c48ba8eccdeda0a8ba42a',
            }
        });
        return next.handle(req);
    }
}
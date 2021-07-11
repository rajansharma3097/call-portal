import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { TokenService } from "../token/token.service";
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private baseUrl = environment.apiUrl;
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let accessToken = this.tokenService.getToken();
    let logoutUrl   = this.baseUrl+"/token/revoke";
    if (
      req.url.indexOf(logoutUrl) === 0 &&
      this.tokenService.getAdminToken()
    ) {
      accessToken = this.tokenService.getAdminToken();
    }
   // console.log(accessToken);
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return next.handle(req);
  }
}

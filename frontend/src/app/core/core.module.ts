import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SettingsService } from './settings/settings.service';
import { ThemesService } from './themes/themes.service';
import { TranslatorService } from './translator/translator.service';
import { MenuService } from './menu/menu.service';
import { AuthService } from './auth/auth.service';
import { TokenService } from './token/token.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthGuardService } from './auth/auth-guard.service';
import { JwtHelperService } from './auth/jwt-helper.service';

@NgModule({
    imports: [
    ],
    providers: [
        SettingsService,
        ThemesService,
        TranslatorService,
        MenuService,
        AuthService,
        TokenService,
        AuthGuardService,
        JwtHelperService
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

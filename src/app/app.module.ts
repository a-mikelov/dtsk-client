import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TUI_SANITIZER,
    TUI_SVG_SRC_PROCESSOR,
    TuiButtonModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {environment} from '../environments/environment'
import {StoreRouterConnectingModule} from '@ngrx/router-store'
import {AuthModule} from './auth/auth.module'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {AuthInterceptor} from './shared/services/auth-interceptor.service'
import {HeroModule} from "./hero/hero.module"
import {of} from "rxjs"
import ruLocale from '@angular/common/locales/ru'
import {TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE} from '@taiga-ui/i18n'
import {ServicesModule} from "./services/services.module";
import {ProductsModule} from "./products/products.module";
import {AngularYandexMapsModule, YaConfig} from "angular8-yandex-maps";
import {registerLocaleData} from "@angular/common";
import {SupportModule} from "./support/support.module";
import {ContactsModule} from "./contacts/contacts.module";
import {PageFooterModule} from "./page-footer/page-footer.module";
import {PageHeaderModule} from "./page-header/page-header.module";
import {reducers} from "./store/reducers";
import {OrderServiceModule} from "./order-service/order-service.module";

const mapConfig: YaConfig = {
  apikey: 'be640658-9c20-46d8-ab54-555efd7fc3ee',
  lang: 'ru_RU',
}

registerLocaleData(ruLocale, 'ru')

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule.forRoot(),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({
                maxAge: 25,
                logOnly: environment.production,
            }),
        StoreRouterConnectingModule.forRoot(),
        HeroModule,
        OrderServiceModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        ServicesModule,
        ProductsModule,
        AngularYandexMapsModule.forRoot(mapConfig),
        SupportModule,
        ContactsModule,
        PageFooterModule,
        PageHeaderModule,
        TuiButtonModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    {
      provide: TUI_SVG_SRC_PROCESSOR,
      useFactory: () => {
        return (src: string): string => {
          const myCustomPrefix = `icons::`

          return src.startsWith(myCustomPrefix)
            ? `assets/icons/${src.replace(myCustomPrefix, ``)}.svg`
            : src
        }
      },
    },
],
  bootstrap: [AppComponent],
})
export class AppModule {}

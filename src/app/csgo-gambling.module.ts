import { BrowserModule } from '@angular/platform-browser';
import {
    NgModule,
    Injectable,
    APP_INITIALIZER
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { CsgoGamblingComponent } from './csgo-gambling.component';
import { TerraComponentsModule } from '@plentymarkets/terra-components/app/terra-components.module';
import {
    LocaleService,
    TranslationModule,
    TranslationService
} from 'angular-l10n';
import {
    AlertModule,
    ButtonsModule,
    ModalModule,
    TooltipModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { ROUTER_PROVIDERS } from '@angular/router/src/router_module';
import { routing } from './csgo-gambling.routing';
import { TableComponent } from './table/table.component';
import { DataService } from './table/service/data.service';

@Injectable()
export class LocalizationConfig
{

    constructor(public locale:LocaleService, public translation:TranslationService)
    {
    }

    load():Promise<any>
    {

        //Definitions for i18n
        if(process.env.ENV === 'production')
        {
        }
        else
        {
        }

        this.translation.addConfiguration().addProvider('src/app/assets/locale_');

        this.locale.addConfiguration()
            .addLanguages(['de',
                           'en'])
            .setCookieExpiration(30)
            .defineDefaultLocale('en', 'EN');

        //
        //let langInLocalStorage:string = localStorage.getItem('plentymarkets_lang_');
        //
        //if(langInLocalStorage != null)
        //{
        //    this.locale.setCurrentLocale(langInLocalStorage, langInLocalStorage.toUpperCase());
        //}
        //else
        //{
        //    let lang = navigator.language.slice(0, 2).toLocaleLowerCase();
        //
        //    if(lang !== 'de' && lang !== 'en')
        //    {
        //        lang = 'en';
        //    }
        //
        //    this.locale.setCurrentLocale(lang, lang.toUpperCase());
        //    localStorage.setItem('plentymarkets_lang_', lang);
        //}

        //this.localization.updateTranslation();

        let promise:Promise<any> = new Promise((resolve:any) => {
            this.translation
                .translationChanged
                .subscribe(() => {
                    resolve(true);
                });
        });

        this.locale.init();
        this.translation.init();

        return promise;
    }
}

export function initLocalization(localizationConfig:LocalizationConfig):Function
{
    return () => localizationConfig.load();
}

@NgModule({
              declarations: [
                  CsgoGamblingComponent,
                  TableComponent
              ],
              imports:      [
                  routing,
                  RouterModule,
                  BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  ModalModule,
                  HttpModule,
                  TooltipModule,
                  AlertModule,
                  ButtonsModule,
                  TerraComponentsModule.forRoot(),
                  TranslationModule.forRoot()
              ],
              providers:    [
                  COMPILER_PROVIDERS,
                  LocalizationConfig,
                  DataService,
                  {
                      provide:    APP_INITIALIZER, // APP_INITIALIZER will execute the function when the app is initialized and delay what
                                                   // it provides.
                      useFactory: initLocalization,
                      deps:       [LocalizationConfig],
                      multi:      true
                  }
              ],
              bootstrap:    [
                  CsgoGamblingComponent
              ]
          })
export class CsGoGamblingModule
{
}

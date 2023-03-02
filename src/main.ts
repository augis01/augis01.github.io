import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { CsGoGamblingModule } from './app/';

if(process.env.ENV === 'production')
{
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CsGoGamblingModule);

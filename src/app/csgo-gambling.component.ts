import {
    Component,
    OnInit,
    ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';


@Component({
               selector: 'app-root',
               template: require('./csgo-gambling.component.html'),
               styles:   [require('./csgo-gambling.component.scss').toString()]
           })
export class CsgoGamblingComponent implements OnInit
{
    private _viewContainerRef:ViewContainerRef;

    public constructor(private viewContainerRef:ViewContainerRef,
                       private _router:Router)
    {

        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;
    }

    ngOnInit()
    {
    }

    onLinkClick(type:string)
    {
        this._router.navigateByUrl(type);
    }
}

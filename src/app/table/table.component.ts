import {
    Component,
    OnInit,
    ViewContainerRef,
} from '@angular/core';
import {
    TerraButtonInterface,
    TerraSimpleTableCellInterface,
    TerraSimpleTableHeaderCellInterface,
    TerraSimpleTableRowInterface
} from '@plentymarkets/terra-components';
import { DataService } from './service/data.service';
import { DataInterface } from './service/interface/data.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
               selector: 'csgo-gambling-table',
               template: require('./table.component.html'),
               //styles:   [require('./table.component.scss').toString()]
           })
export class TableComponent implements OnInit
{
    private headerList:Array<TerraSimpleTableHeaderCellInterface> = [];
    private rowList:Array<TerraSimpleTableRowInterface> = [];

    private _viewContainerRef:ViewContainerRef;
    private type:string;

    public constructor(private viewContainerRef:ViewContainerRef,
                       private dataService:DataService,
                       private _activatedRoute:ActivatedRoute)
    {
        // You need this small hack in order to catch application root view container ref
        this._viewContainerRef = viewContainerRef;
    }

    ngOnInit()
    {
        this.type = this._activatedRoute.routeConfig.data.type;

        this.headerList.push({
                                 caption: 'Name',
                                 width:   1
                             },
                             {
                               caption: "Type",
                               width: 1
                             },
                             {
                                 caption: 'Code',
                                 width:   1
                             },
                             {
                                 caption: 'Link',
                                 width:   1
                             });

        this.dataService.getData().subscribe((datas:Array<DataInterface>)=>{
            this.initTable(datas);
        });
    }

    private initTable(datas:Array<DataInterface>)
    {
        for(let data of datas)
        {
            let cells:Array<TerraSimpleTableCellInterface> = [];

            let nameCell:TerraSimpleTableCellInterface = {
                caption: data.name
            };

            cells.push(nameCell);

            let typeCell:TerraSimpleTableCellInterface = {
                caption: data.type
            };

            cells.push(typeCell);

            let codeCell:TerraSimpleTableCellInterface = {
                caption: data.code
            };

            cells.push(codeCell);

            let linkButtons:Array<TerraButtonInterface> = [];

            let linkButton:TerraButtonInterface = {
                clickFunction: ()=>{
                    window.open(data.link);
                },
                icon: 'icon-next'
            };

            linkButtons.push(linkButton);

            let linkCell:TerraSimpleTableCellInterface = {
                buttonList: linkButtons
            };

            cells.push(linkCell);

            let row:TerraSimpleTableRowInterface = {
                cellList: cells
            };

            if(this.type === 'all' || data.type === this.type)
            {
                this.rowList.push(row);
            }
        }
    }
}

import { ModuleWithProviders } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import { TableComponent } from './table/table.component';

const csGoGamblingRoutes:Routes = [
    {
        path:       '',
        redirectTo: 'all',
        pathMatch:  'full'
    },
    {
        path:      'all',
        component: TableComponent,
        data: {
            type: 'all'
        }
    },
    {
        path:      'bet',
        component: TableComponent,
        data: {
            type: 'bet'
        }
    }
];

export const csGoGamblingProviders:any[] = [];

export const routing:ModuleWithProviders = RouterModule.forRoot(csGoGamblingRoutes);

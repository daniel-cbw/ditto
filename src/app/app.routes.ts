import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { BasicTreeComponent } from './lib/js/tree/basictree/basictree.component';
import { FullTreeComponent } from './lib/js/tree/fulltree/fulltree.component';
import { TemplatesComponent } from './lib/js/tree/templates/templates.component';
import { FieldsComponent } from './lib/js/tree/fields/fields.component';
import { FilterComponent } from './lib/js/tree/filter/filter.component';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  {
    path: 'full',
    component: FullTreeComponent
  },
  {
    path: 'basic',
    component: BasicTreeComponent
  },
  {
    path: 'fields',
    component: FieldsComponent
  },
  {
    path: 'templates',
    component: TemplatesComponent
  },
  {
    path: 'filter',
    component: FilterComponent
  },
  { path: '**',    component: NoContentComponent },
];

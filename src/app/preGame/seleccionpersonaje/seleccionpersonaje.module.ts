import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {SeleccionpersonajePage} from './seleccionpersonaje.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionpersonajePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
    declarations: [SeleccionpersonajePage]
})
export class SeleccionpersonajePageModule {}

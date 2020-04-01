import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { AjustesPage } from './ajustes.page';
import {PerfilComponent} from './perfil/perfil.component';
import {EditarComponent} from './perfil/editar/editar.component';
import {CamaraComponent} from './perfil/camara/camara.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


const routes: Routes = [
  {
    path: '',
    component: AjustesPage
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'perfil/editar',
    component: EditarComponent
  },
  {
    path: 'perfil/camara',
    component: CamaraComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],

  declarations: [AjustesPage, PerfilComponent, EditarComponent, CamaraComponent ]
})
export class AjustesPageModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
   /* { path: 'maingame', loadChildren: './../onGame/maingame/maingame.module#MaingamePageModule' },
    { path: 'salir', loadChildren: './../preGame/seleccionpersonaje/seleccionpersonaje.module#SeleccionpersonajePageModule' },
    {
        path: 'tabs',
        redirectTo: '/tabs/maingame',
        pathMatch: 'full'
    }*/
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {}

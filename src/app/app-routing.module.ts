import { TabsPage } from './tabs/tabs.page';
import { ModalPage } from './ajustes/modal/modal.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {TabsPageModule} from './tabs/tabs.module';
const routes: Routes = [
  
  { path: 'register', loadChildren: './preGame/register/register.module#RegisterPageModule' },
  { path: 'seleccionpersonaje', loadChildren: './preGame/seleccionpersonaje/seleccionpersonaje.module#SeleccionpersonajePageModule' },
  { path: 'creacionpersonaje', loadChildren: './preGame/creacionpersonaje/creacionpersonaje.module#CreacionpersonajePageModule' },
  { path: 'ajustes', loadChildren: './ajustes/ajustes.module#AjustesPageModule' },
  { path: 'crearclase', loadChildren: './preGame/crearclase/crearclase.module#CrearclasePageModule' },
  { path: 'modal', loadChildren: './ajustes/modal/modal.module#ModalPageModule' },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
        {
            path: '',
            children: [
                {
                    path: 'maingame',
                    loadChildren: () =>
                        import('./onGame/maingame/maingame.module').then(m => m.MaingamePageModule)
                }
            ]
        },
        {
            path: 'inicio',
            children: [
                {
                    path: '',
                    loadChildren: () =>
                        import('./onGame/inicio/inicio.module').then(m => m.InicioPageModule)
                }
            ]
        },
        {
            path: 'salir',
            children: [
                {
                    path: '',
                    loadChildren: () =>
                        import('./preGame/seleccionpersonaje/seleccionpersonaje.module').then(m => m.SeleccionpersonajePageModule)
                }
            ]
        },
    ]},
  { path: 'secondaryrouter', loadChildren: './ajustes/secondaryrouter/secondaryrouter.module#SecondaryrouterPageModule', outlet: 'secondary' },
  {
    path: 'login',
    children: [
        {
            path: '',
            loadChildren: () =>
                import('./preGame/login/login.module').then(m => m.LoginPageModule)
        }
    ]
},
{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  entryComponents: [ModalPage]
})
export class AppRoutingModule {}

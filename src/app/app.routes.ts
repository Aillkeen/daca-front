import { DuvidaDetailComponent } from './components/duvida-detail/duvida-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/security/login/login.component";
import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from "@angular/core";
import { AuthGuard } from './components/security/auth.guard';
import { UsuarioNewComponent } from './components/usuario-new/usuario-new.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { DuvidaNewComponent } from './components/duvida-new/duvida-new.component';
import { DuvidaListComponent } from './components/duvida-list/duvida-list.component';
import { ResumoComponent } from './components/resumo/resumo.component';


export const ROUTES: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: '' , component:  HomeComponent, canActivate: [AuthGuard]},
  { path: 'usuario-new' , component: UsuarioNewComponent, canActivate: [AuthGuard] },
  { path: 'usuario-new/:id' , component: UsuarioNewComponent, canActivate: [AuthGuard] },
  { path: 'usuario-list' , component: UsuarioListComponent, canActivate: [AuthGuard] },
  { path: 'duvida-new' , component: DuvidaNewComponent, canActivate: [AuthGuard] },
  { path: 'duvida-new/:id' , component: DuvidaNewComponent, canActivate: [AuthGuard] },
  { path: 'duvida-list' , component: DuvidaListComponent, canActivate: [AuthGuard] },
  { path: 'duvida-detail/:id' , component: DuvidaDetailComponent, canActivate: [AuthGuard] },
  { path: 'resumo' , component: ResumoComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);


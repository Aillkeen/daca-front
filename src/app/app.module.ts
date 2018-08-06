import { UsuarioNewComponent } from './components/usuario-new/usuario-new.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { Usuario } from './model/usuario';
import { DialogService } from './dialog.service';
import { SharedService } from './services/shared.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/security/login/login.component';
import { routes } from './app.routes'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/security/auth.guard';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';
import { DuvidaNewComponent } from './components/duvida-new/duvida-new.component';
import { DuvidaListComponent } from './components/duvida-list/duvida-list.component';
import { DuvidaService } from './services/duvida/duvida.service';
import { DuvidaDetailComponent } from './components/duvida-detail/duvida-detail.component';
import { ResumoComponent } from './components/resumo/resumo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    UsuarioNewComponent,
    UsuarioListComponent,
    DuvidaNewComponent,
    DuvidaListComponent,
    DuvidaDetailComponent,
    ResumoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    NgxPaginationModule
  ],
  providers: [
    UsuarioService, 
    AuthGuard, 
    SharedService,
    DialogService,
    DuvidaService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { ListFilterPipe } from './services/listerfilter.service';
import { ListFilterPipe1 } from './services/listerfilterusers.service';
import { ListFilterPipe2} from './services/listerfilterdane.service';
import { ListFilterPipe3 } from "./services/listerfilterdocumentos.service";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPersonaComponent } from './components/add-persona/add-persona.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { DaneComponent } from './components/dane/dane.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AddDocumentosComponent } from './components/add-documentos/add-documentos.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    ListBookComponent,
    ListFilterPipe,
    ListFilterPipe1,
    ListFilterPipe2,
    ListFilterPipe3,
    AddPersonaComponent,
    ListPersonasComponent,
    LoginComponent,
    LogoutComponent,
    InicioComponent,
    DocumentosComponent,
    DaneComponent,
    UsuarioComponent,
    AddDocumentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],


})
export class AppModule { }

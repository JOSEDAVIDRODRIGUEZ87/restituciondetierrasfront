import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddPersonaComponent } from './components/add-persona/add-persona.component';
import { ListBookComponent } from './components/list-book/list-book.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { LoginComponent } from './components/login/login.component'
import { InicioComponent } from './components/inicio/inicio.component'
import { UsuarioComponent } from "./components/usuario/usuario.component";
import { DaneComponent } from "./components/dane/dane.component";
import { DocumentosComponent } from "./components/documentos/documentos.component";
import { AddDocumentosComponent } from "./components/add-documentos/add-documentos.component";




const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'list', component: ListBookComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'addpersona', component: AddPersonaComponent },
  { path: 'listpersonas', component: ListPersonasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'departamentos', component: DaneComponent },
  { path: 'documentos', component: DocumentosComponent },
  { path: 'adddocumentos', component: AddDocumentosComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

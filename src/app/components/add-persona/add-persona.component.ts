import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { Usuario } from "src/app/model/usuario";
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})
export class AddPersonaComponent implements OnInit {

  persona = new Persona();
  usuario = new Usuario();
  submitted = false;
  msgError = '';
  isDisabled = true;


  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
  }
  existsPK(val: string): void {
    this.msgError = '';
    this.isDisabled = true;
    this.personaService.get(val)
      .subscribe(
        data => {
          if (data != null) {
            this.msgError = 'PK exists';
            this.isDisabled = true;
          } else {
            this.isDisabled = false;
          }
        },
        error => {
          this.msgError = '';
          console.log(error);
        });
  }

  savePersona(): void {
    const data = {
      idp: this.persona.idp,
      nombres: this.persona.nombres,
      apellidos: this.persona.apellidos,
      cedula: this.persona.cedula,
      celular: this.persona.celular,
      direccion: this.persona.direccion,
      correo: this.persona.correo,
      nivelderiesgo: this.persona.nivelderiesgo,
    };

    this.personaService.create(data)
      .subscribe(
        data => {
          this.submitted = true;
          console.log(data);
        },
        err => {
          this.msgError = err.error.message;
          console.log(err);
        });
  }
  newPersona() {
    this.submitted = false;
    this.persona.idp = null;
    this.persona.cedula = null,
      this.persona.nombres = null;
    this.persona.apellidos = null;
    this.persona.celular = null;
    this.persona.direccion = null;
    this.persona.nivelderiesgo = null,
      this.persona.usuario = null;
    this.isDisabled = true;
  }


}
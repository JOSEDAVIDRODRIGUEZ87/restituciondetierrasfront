import { Component, OnInit } from '@angular/core';
import { Documento } from "src/app/model/documento";
import { DocumentosService } from "src/app/services/documentos.service";

@Component({
  selector: 'app-add-documentos',
  templateUrl: './add-documentos.component.html',
  styleUrls: ['./add-documentos.component.css']
})
export class AddDocumentosComponent implements OnInit {

  documento = new Documento();
  submitted = false;
  msgError = '';
  isDisabled = true;

  constructor(private documentosService: DocumentosService) { }

  ngOnInit(): void {
  }
  saveDocumento(): void {
    const data = {
      //idp: this.documento.idp,
      nombre: this.documento.nombre,
      tipo: this.documento.tipo,
      cantidad: this.documento.cantidad,
      persona: this.documento.persona_id
    };

    this.documentosService.create(data)
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
  newDocumento() {
    this.submitted = false;

    this.documento.nombre = null;
    this.documento.tipo = null;
    this.documento.cantidad = null;
    this.documento.persona_id = null;
    this.isDisabled = true;
  }


}

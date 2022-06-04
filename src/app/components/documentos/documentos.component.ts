import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Documento } from "src/app/model/documento";
import { DocumentosService } from "src/app/services/documentos.service";

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  documentoSet: Documento[];
  documentoFil: Documento[];
  idDocumento: string;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';
  currentDocumento = null;
  currentIndex = -1;

  constructor(private documentosService: DocumentosService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  search(value: string): void {
    this.documentoFil = this.documentoSet.filter((val) => val.nombre.toLowerCase().includes(value));
    this.collectionSize = this.documentoFil.length;
  }

  retrieveDocumentos(): void {
    this.documentosService.getAll()
      .subscribe(
        data => {
          this.documentoSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  retrieveDocumento(val: string): void {
    this.documentosService.get(val)
      .subscribe(
        data => {
          this.currentDocumento = data;
          console.log(data);
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }
  updateDocumento(): void {
    this.documentosService.update(this.currentDocumento.iddoc, this.currentDocumento)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  deleteDocumento(val1: string): void {
    this.documentosService.delete(val1)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  setActiveDocumento(documento: Documento, index: number): void {
    this.currentDocumento = documento;
    this.currentIndex = index
  }
  refreshList(): void {
    this.retrieveDocumentos();
  }
  //Emergent Window Edit (exit: x or esc or click backdrop)
  triggerModal(content: any, val: Documento) {
    this.currentDocumento = val
    this.retrieveDocumento(this.currentDocumento.iddoc)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
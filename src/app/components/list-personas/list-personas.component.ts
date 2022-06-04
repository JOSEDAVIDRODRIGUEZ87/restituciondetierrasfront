import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { DaneService } from "src/app/services/dane.service";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dane } from "src/app/model/dane";

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})


export class ListPersonasComponent implements OnInit {

  personaSet: Persona[];
  personaFil: Persona[];
  departamentoSet: Dane[];
  idPersona: string;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';
  currentPersona = null;
  currentIndex = -1;

  constructor(private personaService: PersonaService, private daneService: DaneService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }

  triggerModal(content: any, val: Persona) {
    this.currentPersona = val
    this.retrievePersona(this.currentPersona.idp)
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

  search(value: string): void {
    this.personaFil = this.personaSet.filter((val) => val.nombres.toLowerCase().includes(value));
    this.collectionSize = this.personaFil.length;
  }

  retrievePersonas(): void {
    this.personaService.getAllData()
      .subscribe(
        data => {
          this.personaSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  retrievePersona(val: string): void {
    this.personaService.get(val)
      .subscribe(
        data => {
          this.currentPersona = data;
          console.log(' la persona' + data);
        },
        error => {
          this.msgError = error.message + ' \n ' + 'error al consultar la persona' + error.error.message;
          console.log(error);
        });
  }
  updatePersona(): void {
    this.personaService.update(this.currentPersona.idp, this.currentPersona)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  deletePersona(val1: string): void {
    this.personaService.delete(val1)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  setActivePersona(persona: Persona, index: number): void {
    this.currentPersona = persona;
    this.currentIndex = index
  }
  refreshList(): void {
    this.retrievePersonas();
  }
  
  getDepartamentos() {
    this.daneService.getAll()
      .subscribe(
        data => {
          this.departamentoSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}

import { Component, OnInit } from '@angular/core';
import { Dane } from "src/app/model/dane";
import { DaneService } from "src/app/services/dane.service";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dane',
  templateUrl: './dane.component.html',
  styleUrls: ['./dane.component.css']
})
export class DaneComponent implements OnInit {

  daneSet: Dane[];
  daneFil: Dane[];
  isDane: string;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';
  currentDane = null;
  currentIndex = -1;

  constructor(private daneService: DaneService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }
  search(value: string): void {
    this.daneFil = this.daneSet.filter((val) => val.departamento.toLowerCase().includes(value));
    this.collectionSize = this.daneFil.length;
  }

  retrieveDanes(): void {
    this.daneService.getAll()
      .subscribe(
        data => {
          this.daneSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveDane(val:string): void {
    this.daneService.get(val)
      .subscribe(
        data => {
          this.currentDane = data;
          console.log(data);
        },
        error => {
          this.msgError =  error.message +' \n '+ error.error.message;
          console.log(error);
        });
  }

  updateDane(): void {
   this.daneService.update(this.currentDane.idd, this.currentDane)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteDane(val1:string): void {
    this.daneService.delete(val1)
       .subscribe(
         data => {
           this.refreshList();
           console.log(data);
         },
         error => {
           console.log(error);
         });
   }

  setActiveDane(dane : Dane, index : number): void {
    this.currentDane = dane;
    this.currentIndex = index
  }

  refreshList(): void {
    this.retrieveDanes();
  }

  //Emergent Window Edit (exit: x or esc or click backdrop)
  triggerModal(content:any, val:Dane) {
    this.currentDane = val
    this.retrieveDane(this.currentDane.idd)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
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
      return  `with: ${reason}`;
    }
  }
}

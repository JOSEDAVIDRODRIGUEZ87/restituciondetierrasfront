import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarioSet: Usuario[];
  usuarioFil: Usuario[];
  idUsuario: string;
  collectionSize: number;
  searchTerm: string;
  closeModal: string;
  msgError = '';
  currentUsuario = null;
  currentIndex = -1;

  constructor(private usuarioService: UsuarioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshList();
  }



  search(value: string): void {
    this.usuarioFil = this.usuarioSet.filter((val) => val.userName.toLowerCase().includes(value));
    this.collectionSize = this.usuarioFil.length;
  }
  retrieveUsuarios(): void {
    this.usuarioService.getAll()
      .subscribe(
        data => {
          this.usuarioSet = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  retrieveUsuario(val: string): void {
    this.usuarioService.get(val)
      .subscribe(
        data => {
          this.currentUsuario = data;
          console.log(data);
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }

  updateUsuario(): void {
    this.usuarioService.update(this.currentUsuario.idu, this.currentUsuario)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  deleteUsuario(val1: string): void {
    this.usuarioService.delete(val1)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  setActiveUsuario(usuario: Usuario, index: number): void {
    this.currentUsuario = usuario;
    this.currentIndex = index
  }
  
  refreshList(): void {
    this.retrieveUsuarios();
  }
  triggerModal(content: any, val: Usuario) {
    this.currentUsuario = val
    this.retrieveUsuario(this.currentUsuario.idu)
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

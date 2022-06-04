import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';

const baseUrl = 'http://localhost:8080/api/v1/personas';
const baseUrl1 = 'http://localhost:8080/api/v1/datosprincipales';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(baseUrl);
  }
  get(id: String): Observable<Persona> {
    return this.http.get<Persona>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  getAllData(): Observable<Persona[]> {
    return this.http.get<Persona[]>(baseUrl);
  }

}

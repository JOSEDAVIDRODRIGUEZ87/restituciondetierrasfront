import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dane } from '../model/dane';


const baseUrl = 'http://localhost:8080/api/v1/registrosdane';
@Injectable({
  providedIn: 'root'
})
export class DaneService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Dane[]> {
    return this.http.get<Dane[]>(baseUrl);
  }
  get(id: String): Observable<Dane> {
    return this.http.get<Dane>(`${baseUrl}/${id}`);
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
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Persona } from './model/Persona';
import {PersonAdd} from './model/PersonAdd'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/person'

  getPersons(){
    return this.http.get<Persona[]>(this.url);
  }

  addPersona(persona: PersonAdd){
    return this.http.post<Persona>(this.url , persona);
  }

  updatePersona(persona: Persona){
    return this.http.put<Persona>(this.url , persona);
  }

  getPersonaById(id: number){
    return this.http.get<Persona>(this.url + "/" + id)
  }

  deleteById(id: number){
    this.http.delete(this.url + "/" + id)
    .subscribe(() => console.log('Delete successful'))
  }
  
}

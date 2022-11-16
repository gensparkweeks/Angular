import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../model/Persona';
import { ServiceService } from '../service.service';
import * as moment from 'moment'
import { FormControl, FormGroup } from '@angular/forms';
import { PersonPost } from '../model/PersonPost';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons: Persona[] = [];
  personAdd: PersonPost = new PersonPost();
  public isError:boolean = true;
  editing = false;

  addForm:FormGroup = new FormGroup({
    fcFirst: new FormControl(''),
    fcLast: new FormControl('')
  })

  constructor(private service: ServiceService, private router: Router){}
  
  getPersons(){
    this.service.getPersons()
      .subscribe(
        data => this.persons = data,
        error => this.isError = error.ok
      )
  }

  ngOnInit(): void {
    this.getPersons();
  }

  getFormat(created:any){
    return moment(created).format('ll')
 }

 goEdit(person: Persona): void{
  localStorage.setItem("id", person.id.toString());
  this.addForm.patchValue({
    fcFirst: person.first,
    fcLast: person.last
  })
  this.editing = true;
 }

 goAdd(){
  this.editing = false;
 }

 goDelete(id:number){
  console.log('goDelete: ' + id)
  this.service.deleteById(id);

  this.getPersons();
  window.location.reload()
 }

 onSubmitAdd(){
  this.personAdd.first = this.addForm.controls['fcFirst'].value;
  this.personAdd.last = this.addForm.controls['fcLast'].value;
  this.personAdd.created = new Date();
  this.personAdd.completed = true;
  
  this.service.addPersona(this.personAdd)
    .subscribe(data => console.log(data))

  this.getPersons();
  window.location.reload()
 }
}

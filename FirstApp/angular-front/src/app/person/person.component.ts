import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../model/Persona';
import { ServiceService } from '../service.service';
import * as moment from 'moment'
import { FormControl, FormGroup } from '@angular/forms';
import { PersonAdd } from '../model/PersonAdd';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons: Persona[] = [];
  personAdd: PersonAdd = new PersonAdd();
  personUpdate: Persona = new Persona();
  isError:boolean = false;
  editing = false;
  isCancel = false;

  addForm:FormGroup = new FormGroup({
    fcFirst: new FormControl(''),
    fcLast: new FormControl('')
  })

  constructor(private service: ServiceService, private router: Router){}
  
  getPersons(){
    this.service.getPersons()
      .subscribe(
        data => this.persons = data,
        error => this.isError = false
      )
  }

  ngOnInit(): void {
    this.getPersons();
  }

  getFormat(created:any){
    return moment(created).format('ll')
 }

 goEdit(person: Persona): void{

  this.isCancel = false;

  localStorage.setItem("id", person.id.toString());
  this.addForm.patchValue({
    fcFirst: person.first,
    fcLast: person.last
  })
  this.editing = true;
  console.log('goEdit isCancel:'+this.isCancel)
 }

 goCancel(){
  this.editing = false;
  this.isCancel = true;

  this.personAdd.first = '';
  this.personAdd.last = '';

  this.updateForm();
 }

 goDelete(id:number){
  this.service.deleteById(id);

  this.updateForm();
 }

 updateForm(){
  this.getPersons();
  window.location.reload()
 }

 onSubmitAdd(){
  
  if (!this.editing){
    this.personAdd.first = this.addForm.controls['fcFirst'].value;
    this.personAdd.last = this.addForm.controls['fcLast'].value;
    this.personAdd.created = new Date();
    this.personAdd.completed = true;

    this.service.addPersona(this.personAdd)
    .subscribe(data => console.log(data))

  }else  {
    this.personUpdate.id = Number(localStorage.getItem('id'));
    this.personUpdate.first = this.addForm.controls['fcFirst'].value;
    this.personUpdate.last = this.addForm.controls['fcLast'].value;
    this.personUpdate.created = new Date();
    this.personUpdate.completed = true;

    console.log(this.personUpdate)
    console.log('Edit: isediting' + this.editing)

    this.service.updatePersona(this.personUpdate)
    .subscribe(data => console.log(data))
  }
  this.updateForm();
 }
}

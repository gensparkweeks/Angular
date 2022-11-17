import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  constructor() { }

  reactiveForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.min(1), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.maxLength(12), Validators.required])
  })

  get fullname() { return this.reactiveForm.get('fullname'); }
  get age() { return this.reactiveForm.get('age'); }
  get email() { return this.reactiveForm.get('email'); }
  get phone() { return this.reactiveForm.get('phone'); }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.reactiveForm.value)
  }

}

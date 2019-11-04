import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  submitted: boolean;

  genders: SelectItem[];

  description: string;
  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      description: new FormControl(''),
      gender: new FormControl('', Validators.required)
    });

    this.genders = [];
    this.genders.push({ label: 'Select Gender', value: '' });
    this.genders.push({ label: 'Male', value: 'Male' });
    this.genders.push({ label: 'Female', value: 'Female' });
  }

  public onSubmit(value: string) {
    this.submitted = true;
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
  }

  get diagnostic() {
    return this.userForm.value;
  }
}

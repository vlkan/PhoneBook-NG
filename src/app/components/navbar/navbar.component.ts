import { Component, OnInit } from '@angular/core';
import { Customer } from './../../models/customer';
import { CustomerService } from './../../services/customer.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userAddForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createUserAddForm();
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerBirthDate: ['', Validators.required],
      customerPhoneNumber: ['', Validators.required],
      customerDescription: ['', Validators.required],
    });
  }

  addUser() {
    if (this.userAddForm.valid) {
      let userModel = Object.assign({}, this.userAddForm.value);
      this.customerService.addUser(userModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success(response.message, 'Success');
      });
    } else {
      this.toastrService.error('Form is missing', 'Warning');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerResponseModel } from 'src/app/models/customerResponseModel';
import { CustomerService } from './../../services/customer.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  userUpdateForm: FormGroup;
  customers: Customer[] = [];
  dataLoaded = false;

  deleteU:Customer[] = [];
  updateU:Customer[] = [];

  constructor(private customerService: CustomerService,
     private activatedRoute:ActivatedRoute,
     private toastrService: ToastrService,
     private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["searchText"]){
        this.getCustomersBySearch(params["searchText"])
      }
      else{
        this.getCustomers()
      }
      this.createUserUpdateForm()
    })
  }
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerBirthDate: ['', Validators.required],
      customerPhoneNumber: ['', Validators.required],
      customerDescription: ['', Validators.required],
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      this.dataLoaded = true;
    });
  }
  getCustomersBySearch(searchText:string) {
    this.customerService.getCustomersBySearch(searchText).subscribe((response) => {
      this.customers = response.data;
      this.dataLoaded = true;
    });
  }
  deleteUser(){
    this.customerService.deleteUser(this.deleteU[0]).subscribe((response) => {
      this.toastrService.success(response.message, 'Success');
    })
  }
  deleteUserData(customer:Customer){
    this.deleteU.push(customer)
    console.log(customer)
  }
  updateUserData(customer:Customer){
    this.updateU.push(customer)
  }
  updateUser(){
    if (this.userUpdateForm.valid) {
      this.customerService.deleteUser(this.updateU[0]).subscribe((response) => {

      })

      let userModel = Object.assign({}, this.userUpdateForm.value);
      this.customerService.addUser(userModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success("User Updated", 'Success');
      });
    } else {
      this.toastrService.error('Form is missing', 'Warning');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerResponseModel } from 'src/app/models/customerResponseModel';
import { CustomerService } from './../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  dataLoaded = false;

  deleteU:Customer[] = [];

  constructor(private customerService: CustomerService,
     private activatedRoute:ActivatedRoute,
     private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["searchText"]){
        this.getCustomersBySearch(params["searchText"])
      }
      else{
        this.getCustomers()
      }
    })
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
}

import { Component, OnInit } from '@angular/core';
import { Customer } from './../../models/customer';
import { CustomerService } from './../../services/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name:string = '';
  birthdate:string = '';
  phoneno:string = '';
  description:string = '';

  customers : Customer[] = [{
    id : 0,
    customerName : this.name,
    customerBirthDate : this.birthdate,
    customerPhoneNumber : this.phoneno,
    customerDescription : this.description
  }];

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
  }
  getCustomersAdd(){
    console.log(this.customers[0])
    this.customerService.getCustomersAdd(this.customers[0])
  }

}

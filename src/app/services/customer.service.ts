import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from '../models/customerResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from './../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:7166/api/';

  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
  getCustomersBySearch(searchText:string):Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + "customers/search?search=" + searchText
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

}

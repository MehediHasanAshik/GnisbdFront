import { DetailTable } from './../Model/DetailTable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductService } from '../Model/productService';
import { MasterTable } from '../Model/MasterTable';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  baseUrl: string = 'https://localhost:7095/api'

  constructor(private http: HttpClient) { }

  getCustomerData(customerType: string): Observable<any> {
    const url = `${this.baseUrl}/customer/${customerType}`;
    return this.http.get(url);
  }

  getProductDetails(): Observable<any> {
    const url = `${this.baseUrl}/ProductDetails`;
    return this.http.get(url);
  }

  addProductDetails(product: ProductService): Observable<any> {
    const url = `${this.baseUrl}/ProductDetails`;
    return this.http.post(url, product);
  }

  getSingleProduct(id: number): Observable<any> {
    const url = `${this.baseUrl}/ProductDetails/${id}`;
    return this.http.get(url);
  }

  updateProduct(id: number, updatedProduct: ProductService): Observable<any> {
    const url = `${this.baseUrl}/ProductDetails/${id}`;
    return this.http.put(url, updatedProduct);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.baseUrl}/ProductDetails/${id}`;
    return this.http.delete(url);
  }

  executeMasterTableSP(meeting: MasterTable): Observable<any> {
    const url = `${this.baseUrl}/insert/insertIntoMaster`;
    return this.http.post(url, meeting);
  }


  executeDetailTableSP(meeting: DetailTable): Observable<any> {
    const url = `${this.baseUrl}/insert/insertIntoDetail`;
    return this.http.post(url, meeting);
  }
}

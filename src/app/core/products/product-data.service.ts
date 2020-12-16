import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http:HttpClient) { }
  private base_url:string ='../../../assets/products.json';

  getProducts():Observable<any>{
    return this.http.get<any>(this.base_url) as Observable<Product>;
  }


}

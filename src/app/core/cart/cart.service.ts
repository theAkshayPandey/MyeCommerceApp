import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public url = '/api/cart';
  constructor(private http: HttpClient) {}

  getCartState(): Observable<any> {
    return this.http.get<any>(this.url);
  }
  postCartState(state): Observable<any> {
    console.log(state);
    return this.http.post<any>(this.url, state);
  }
}

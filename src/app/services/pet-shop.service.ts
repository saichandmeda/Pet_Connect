import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PetShopService {

  constructor(private http : HttpClient, private router: Router) { }

getProduct(){
  return this.http.get<any>("https://localhost:7196/Product/productList/").pipe(map((res:any)=>{
  // return this.http.get<any>("https://fakestoreapi.com/products/").pipe(map((res:any)=>{
    return res;
  }));
}

}

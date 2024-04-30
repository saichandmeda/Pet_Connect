import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptService {

  constructor(private http : HttpClient, private router: Router) { }

getCenter(){
  return this.http.get<any>("https://localhost:7196/Center/centerList/").pipe(map((res:any)=>{
  // return this.http.get<any>("https://fakestoreapi.com/products/").pipe(map((res:any)=>{
    return res;
  }));
}

getPetsFromCenter (centerName: string) {
  let url = `https://localhost:7196/Center/petList/${centerName}`;
  return this.http.get(url);
}
}

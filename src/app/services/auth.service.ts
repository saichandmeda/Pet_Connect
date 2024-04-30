import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7196/api/User/"
  private baseUrl2:string = "https://localhost:7196/"
  private baseUrl3:string = "https://localhost:7196/api/"
  constructor(private http : HttpClient, private router: Router) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  signOut(){
    localStorage.clear();
    // localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }

  storeUserId(idValue: string){
    localStorage.setItem('id',idValue)
  }

  storeUserName(nameValue: string){
    localStorage.setItem('userName',nameValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUser(){
    return localStorage.getItem('userName')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  bookAppointment(appointmentObj:any){
    let token = localStorage.getItem("token");
    return this.http.post<any>(`${this.baseUrl2}Appointment/addAppointment`,appointmentObj,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}}
                )
             }

  getHospitals():Observable<any[]>{
    let token = localStorage.getItem("token");
    return this.http.get<any[]>(`${this.baseUrl3}Hospital/hospitalList`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}}
             )
  }

  getAppointments(){
    let token = localStorage.getItem("token");
    return this.http.get<any[]>(`${this.baseUrl2}Appointment/getAppointmentList`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}}
               )
  }


  }


 // https://localhost:7196/addAppointmen


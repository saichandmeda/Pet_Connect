import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetComponent } from './components/forget/forget.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


// import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AppComponent }  from './app.component';

// imports: [
//     BrowserModule,
//     ReactiveFormsModule,
// ]
// NgModule({
//     imports: [
//         BrowserModule,
//         FormsModule,
//         ReactiveFormsModule
//     ],
//     declarations: [
//         AppComponent
//     ],
//     bootstrap: [AppComponent]
// })

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path:'home', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'forget', component: ForgetComponent},

];

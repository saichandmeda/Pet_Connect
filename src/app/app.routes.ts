import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetComponent } from './components/forget/forget.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Home2Component } from './components/home2/home2.component';
import { CardComponent } from './components/card/card.component';
import { authGuard } from './guards/auth.guard';
// import { CommentsComponent } from './components/comments/comments.component';
import { Home3Component } from './components2/home3/home3.component';
import { AppointmentListComponent } from './components2/appointment-list/appointment-list.component';
import { GridDialogComponent } from './components2/grid-dialog/grid-dialog.component';
import { Home4Component } from './components2/home4/home4.component';


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
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    // {path: '', redirectTo: 'home3', pathMatch: 'full'},
    {path:'home2', component: Home2Component,canActivate:[authGuard]},
    {path:'home', component: HomeComponent},
    {path:'card', component: CardComponent},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'forget', component: ForgetComponent},
    // {path:'comments', component: CommentsComponent},
    {path:'dashboard', component: GridDialogComponent},
    {path:'home3', component: Home3Component,canActivate:[authGuard]},
    {path:'home4', component: Home4Component,canActivate:[authGuard]},
    {path:'appointment-list', component: AppointmentListComponent},
    


];

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup'
import { NgToastService } from 'ng-angular-popup'
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from "./components2/header/header.component";
import { CartService } from './services/cart.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers:[CartService],
    imports: [CommonModule, RouterOutlet, HttpClientModule, NgToastModule, HeaderComponent]
})
export class AppComponent {
  title = 'AngularAuthUI';

}

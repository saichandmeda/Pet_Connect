import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PetShopService } from '../../services/pet-shop.service';
import { CartService } from '../../services/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';




import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  providers:[AuthService,PetShopService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public totalItem : number = 0;
  public searchTerm !: string;
  public productList : any 

  constructor(private router:Router,private auth : AuthService, private auth2: PetShopService ,private auth3: CartService, private toast: NgToastService) {}




  ngOnInit(): void {

    this.auth3.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    });


    // this.cartService.search.subscribe((val:any)=>{
    //   this.searchKey = val;
    // })
  }

  addtocart(item: any){
    this.auth3.addtoCart(item);
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.auth3.search.next(this.searchTerm);
  }






  home(){
    const localData = localStorage.getItem('token');
    if (localData != null) {
      this.router.navigateByUrl('/home2')
      return true;
    } else {
      this.router.navigateByUrl('/home')
      // alert("Please Login First")
      return false;
    }
  }


  logOut(){
    
    this.auth.signOut();
    
  }

  

  cart(){
    
    this.router.navigateByUrl('/cart');
    
  }



}






//   ngOnInit(): void {

//     this.auth3.getProducts()
//     .subscribe(res=>{
//       this.totalItem = res.length;
//     });
//   }

//   home(){
//     const localData = localStorage.getItem('token');
//     if (localData != null) {
//       this.router.navigateByUrl('/home2')
//       return true;
//     } else {
//       this.router.navigateByUrl('/home')
      
//       return false;
//     }
//   }
  
//   addtocart(item: any){
//     this.auth3.addtoCart(item);
//   }

//   logOut(){
    
//     this.auth.signOut();

//   }

//   cart(){
    
//     this.router.navigateByUrl('/cart');
    
//   }

// }

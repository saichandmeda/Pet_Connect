import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';
import { PetShopService } from '../../services/pet-shop.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  providers:[AuthService,PetShopService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  public products : any = [];
  public grandTotal !: number;

  constructor(private router:Router,private auth : AuthService, private auth2: PetShopService ,private auth3: CartService, private toast: NgToastService) {}
  
  ngOnInit(): void {
    this.auth3.getProducts()
    .subscribe(res=>{

      // this.products.forEach((a:any) => {
      //   res.forEach((b:any) => {
      //   if(a.title != b.title){
      //     this.products = res;
      //   } 
      //   else if(a.title == b.title){
      //     a.quantity == a.quantity+1;
      //   }
      // })
      // });    


      // filter(category:string){
      //   this.filterCategory = this.productList
      //   .filter((a:any)=>{
      //     if(a.category == category || category==''){
      //       return a;
      //     }
      //   })
      // }


      this.products = res;
      this.grandTotal = this.auth3.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.auth3.removeCartItem(item);
  }
  emptycart(){
    this.auth3.removeAllCart();
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

  shop(){
    
    this.router.navigateByUrl('/home4')
    
  }

}

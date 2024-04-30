import { Component ,OnInit} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';
import { PetShopService } from '../../services/pet-shop.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { FilterPipe } from "../../shared/filter.pipe";

@Component({
    selector: 'app-home4',
    standalone: true,
    providers: [AuthService, PetShopService],
    templateUrl: './home4.component.html',
    styleUrl: './home4.component.scss',
    imports: [CommonModule, FilterPipe]
})
export class Home4Component {

  public productList : any 
  public filterCategory : any
  searchKey:string ="";

  constructor(private router:Router,private auth : AuthService, private auth2: PetShopService ,private auth3: CartService, private toast: NgToastService) {}
  

  ngOnInit(): void {

    // this.auth3.getProducts()
    // .subscribe(res=>{
    //   this.totalItem = res.length;
    // });

    this.auth2.getProduct()
    .subscribe(res=>{
      this.productList = res;


      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category =="Pet Food" || a.category =="Pet Fashion"){
          a.category =="Pet Accessories"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)

    });

    this.auth3.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addtocart(item: any){
    this.auth3.addtoCart(item);
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

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

  logOut(){
    
    this.auth.signOut();
    
  }

  cart(){
    
    this.router.navigateByUrl('/cart');
    
  }

  



}

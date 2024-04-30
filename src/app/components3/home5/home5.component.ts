import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FilterPipe } from "../../shared/filter.pipe";
import { PetShopService } from '../../services/pet-shop.service';
import { CartService } from '../../services/cart.service';
import { AdoptService } from '../../services/adopt.service';

@Component({
    selector: 'app-home5',
    standalone: true,
    providers: [AuthService,PetShopService,AdoptService],
    templateUrl: './home5.component.html',
    styleUrl: './home5.component.scss',
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FilterPipe]
})
export class Home5Component {

  public productList : any 
  public filterCategory : any
  searchKey:string ="";

  public searchTerm !: string;
  public centerList : any


  constructor(private router: Router,private auth: AuthService, private route: ActivatedRoute,private auth2: PetShopService ,private auth3: CartService,private auth4: AdoptService)
  {}


 


  // ngOnInit(): void {

  //   // this.auth3.getProducts()
  //   // .subscribe(res=>{
  //   //   this.totalItem = res.length;
  //   // });

  //   this.auth2.getProduct()
  //   .subscribe(res=>{
  //     this.productList = res;


  //     this.filterCategory = res;
  //     this.productList.forEach((a:any) => {
  //       if(a.category =="Pet Food" || a.category =="Pet Fashion"){
  //         a.category =="Pet Accessories"
  //       }
  //       Object.assign(a,{quantity:1,total:a.price});
  //     });
  //     console.log(this.productList)

  //   });

  //   this.auth3.search.subscribe((val:any)=>{
  //     this.searchKey = val;
  //   })
  // }




  ngOnInit(): void {

    // this.auth3.getProducts()
    // .subscribe(res=>{
    //   this.totalItem = res.length;
    // });

    this.auth4.getCenter()
    .subscribe(res=>{
      this.centerList = res;


      this.filterCategory = res;
      this.centerList.forEach((a:any) => {
        // if(a.category =="Pet Food" || a.category =="Pet Fashion"){
        //   a.category =="Pet Accessories"
        // }
        Object.assign(a);
      });
      console.log(this.centerList)

    });

    this.auth3.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }




  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.auth3.search.next(this.searchTerm);
  }

  logOut(){
     
    this.auth.signOut();
    
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
}

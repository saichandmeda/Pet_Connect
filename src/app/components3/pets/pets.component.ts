import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FilterPipe } from '../../shared/filter.pipe';
import { AdoptService } from '../../services/adopt.service';
import { PetShopService } from '../../services/pet-shop.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FilterPipe],
  providers: [AuthService,PetShopService,AdoptService],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent implements OnInit {
  
  public filterCategory : any
  searchKey:string ="";

  public searchTerm !: string;
  public centerList : any

  constructor(private router: Router,private auth: AuthService, private route: ActivatedRoute,private auth2: PetShopService ,private auth3: CartService,private auth4: AdoptService)
  {}
  ngOnInit(): void {
    this.route.params.subscribe((id: any) => {
      console.log(id);
      this.auth4.getPetsFromCenter(id.centerName).subscribe(res=>{
        console.log(res);
        this.filterCategory = res;
      })
    });
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
}

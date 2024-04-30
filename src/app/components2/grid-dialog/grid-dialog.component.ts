import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; 
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldDefaultOptions, MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';









// export interface PeriodicElement {
//   name: string;
//   id: number;
//   address: string;
//   city: string;
//   province: string;
// }

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

// const ELEMENT_DATA: PeriodicElement[] = [
//   {id: 1, name: 'Pet Clinic', address: '1120 N Placentia Ave, 92831', city: 'Fullerton', province: 'CA'},
//   {id: 2, name: 'Pet Health', address: '1220 Deerpark Dr, 92831', city: 'Fullerton', province: 'CA'},
//   {id: 3, name: 'Pet Hospital', address: '600 Langsdorfs Dr, 92652', city: 'Arlington', province: 'TX'},
//   // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-grid-dialog',
  standalone: true,
  imports: [MatTableModule,MatSortModule,FormsModule,ReactiveFormsModule, MatFormFieldModule,HttpClientModule],
  providers: [ AuthService,HttpClient],
  templateUrl: './grid-dialog.component.html',
  styleUrl: './grid-dialog.component.scss'
})



export class GridDialogComponent implements OnInit {


   displayedColumns: string[] = ['id', 'hospital_Name', 'address', 'city', 'province'];
  // displayedColumns: string[] = ['city'];
  // dataSource!: MatTableDataSource<PeriodicElement>;
  dataSource!: MatTableDataSource<any>;

  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatSort) sort!: MatSort;
  posts: any;
  
  selectedRow(row: any) {
    console.log('selectedRow', row)
  }

  constructor( 
    public dialogRef: MatDialogRef<GridDialogComponent>, private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      
  } 

  


    // ngAfterViewInit() {
    //   this.dataSource.sort = this.sort;
    // }


  ngOnInit(): void {
    this.auth.getHospitals().subscribe((data) => {
      console.log(data);
      this.posts = data;
      this.dataSource = new MatTableDataSource(data);
    
    this.dataSource.sort = this.sort;
    });
    // this.dataSource.sort = this.sort;
    // throw new Error('Method not implemented.');
  }
  
  onCancel(): void { 
    this.dialogRef.close(); 
  } 


  onSelect(row: any) {
    // this.http.get(`api/users/${row.id}`).subscribe((data) => {
    //   this.dataSource.data = data;
    // });
    var name2 = row ? row.hospital_Name : "";
    this.data.onSelection(name2);   
    this.dialogRef.close();

  }

  // applyFilter(filterValue: string) {
  //   // Assuming you're filtering by 'yourColumn'
  //   this.dataSource.filterPredicate = (data, filter) => data.yourColumn.toLowerCase().includes(filter.toLowerCase());
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }


  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }



}

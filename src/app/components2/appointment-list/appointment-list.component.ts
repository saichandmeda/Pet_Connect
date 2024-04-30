import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; 
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldDefaultOptions, MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [MatTableModule,MatSortModule,FormsModule,ReactiveFormsModule, MatFormFieldModule,HttpClientModule],
  providers: [ AuthService,HttpClient],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent {

  displayedColumns: string[] = ['petClinic', 'appointmentDate', 'appointmentTime'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  posts: any;

  constructor( 
    public dialogRef: MatDialogRef<AppointmentListComponent>,private auth: AuthService,@Inject(MAT_DIALOG_DATA) public data: any,) { } 

  ngOnInit(): void {
    this.auth.getAppointments().subscribe((data) => {
      console.log(data);
      this.posts = data;
      this.dataSource = new MatTableDataSource(data);
    
    this.dataSource.sort = this.sort;
    });
  }
  

}

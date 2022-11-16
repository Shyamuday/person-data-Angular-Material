import { Component, OnInit,ViewChild } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { personData } from 'src/models/data.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email','action'];
  dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public person:personData[]=[];
  public errorMessage:string | null = null
  constructor( private personService:UserService, private dialog:MatDialog) { 
    this.personService.personb.subscribe(uname =>{
      this.dataSource =uname
    })
  }

  ngOnInit(): void {
    this.getAllData();
    
  }

  getAllData(){
    this.personService.getAllPerson().subscribe((res)=>{
     this.dataSource = new MatTableDataSource(res);
     console.log(this.dataSource);
     
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
      
    },(error)=>{
      this.errorMessage = error;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Edit person data
editPersonData(row:any){
this.dialog.open(AddComponent,{
  width: '30%',
  data: row,
}).afterClosed().subscribe(val=>{
  if(val==='Updated'){
    this.getAllData();
  }
})
}

deletePersonData(id:string) {
  if (id) {
    this.personService.deletePerson(id).subscribe((data: {}) => {
      this.getAllData();
    }, (error) => {
      this.errorMessage = error;
    })
  }


}
}
  


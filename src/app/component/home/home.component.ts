import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { personData } from 'src/models/data.model';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(AddComponent,
      {
        width: '30%',
       
      });
   
  }



}

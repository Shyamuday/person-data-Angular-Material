import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { personData } from 'src/models/data.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { createInjectableType } from '@angular/compiler';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  actionBtn: string = "save";
  addForm!: FormGroup
  public personId: string | null = null
  public errorMessage: string | null = null

  public personObj: personData = {} as personData
  constructor(private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public editData: any, private router: Router, private fb: FormBuilder,
    private personService: UserService, private dialogRef: MatDialogRef<AddComponent>) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
    if (this.editData) {
      this.actionBtn = "Update"
      this.addForm.controls['name'].setValue(this.editData.name);
      this.addForm.controls['email'].setValue(this.editData.email)
    }

    this.getPersonData();
    // const routeid= this.route.snapshot.paramMap.get('id');
    // console.log(routeid);
    this.activatedRoute.paramMap.subscribe((param) => {
      this.personId = param.get('personId')
    });
  }
  get name() { return this.addForm.get('name') }
  get email() {
    return this.addForm.get('email')

  }
  // get person data
  getPersonData() {

    this.personService.getAllPerson().subscribe((res) => {

      return this.personService.personb.next(res);

    }, (error) => {
      this.errorMessage = error;
    })
  }
  // get single person data
  getSinglePersonData(personId: string) {
    // this.personService.getSinglePerson()
  }
  // post person data
  postPersonData() {
    if (!this.editData) {
      if (this.addForm.valid) {
        this.personService.savePerson(this.addForm.value).subscribe((data: personData[]) => {
          alert('Person added succesfully')
          this.addForm.reset();
          this.getPersonData();
          this.dialogRef.close('Saved');

        }, (error) => {
          this.errorMessage = error;
        })
      }
    } else {
      this.updatePersonData()
    }


  }

  //Update Person Data 
  updatePersonData() {
    this.personService.updatePerson(this.addForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Person updated succesfully');
      
        this.addForm.reset();
        this.dialogRef.close('Updated');
      }
    })
  }

}

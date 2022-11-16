import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { personData } from 'src/models/data.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {


baseUrl = "http://localhost:3000/"
  constructor(private httpclient:HttpClient) { }

  personb = new Subject<any>()
// get person data
getAllPerson(): Observable<personData[]>{
let dataUrl:string = `${this.baseUrl}\person`
return this.httpclient.get<personData[]>(dataUrl).pipe(catchError(this.handleError)) 
}
// get single person data
getSinglePerson(personId:string): Observable<personData>{
  let dataUrl:string = `${this.baseUrl}\person/${personId}`
  return this.httpclient.get<personData>(dataUrl).pipe(catchError(this.handleError))
}
// save form data
savePerson(person: personData): Observable<personData[]> {
let dataUrl: string = `${this.baseUrl}\person`
return this.httpclient.post<personData[]>(dataUrl, person).pipe(catchError(this.handleError))
}
updatePerson(person:personData, personId: string): Observable<personData>{
  let dataUrl:string = `${this.baseUrl}\person/${personId}`
  return this.httpclient.patch<personData>(dataUrl,person).pipe(catchError(this.handleError))
}
deletePerson(personId: string):Observable<personData[]> {
let dataUrl:string = `${this.baseUrl}\person/${personId}`
return this.httpclient.delete<personData[]>(dataUrl).pipe(catchError(this.handleError))  
}
 // Error solved
  public handleError(error: HttpErrorResponse){
    let errorMessage: string = ''
    if (error.error instanceof ErrorEvent){
      // client Error
      errorMessage = `Error :${error.error.message}`
    } else {
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage)
  }
}

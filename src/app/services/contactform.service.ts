import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactformService {

  constructor(private http: HttpClient) {    
  }

  sendContact(contact : any){
    return this.http.post('http://localhost:3000/contacts', contact);

  }
}

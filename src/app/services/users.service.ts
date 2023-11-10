import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  getUserById(userId: string | null) {
    return this.http.get<any>(`http://localhost:3000/users/${userId}`);
  }
}

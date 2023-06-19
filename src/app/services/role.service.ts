import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor
  (
    private http: HttpClient,
  ) { }

   public getRole(): Observable<any> {
    return this.http.get("http://localhost:8080/liste-role")


  }
}

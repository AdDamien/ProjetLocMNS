import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor
    (
      private http: HttpClient,
    ) { }

  public getRole(): Observable<any> {
    return this.http.get(environment.serverUrl + "/liste-role")


  }
}

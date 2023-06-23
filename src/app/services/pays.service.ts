import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(
    private http: HttpClient,


  ) { }
  public getPays(): Observable<any> {
    return this.http.get(environment.serverurl "+ /liste-pays")


  }
}

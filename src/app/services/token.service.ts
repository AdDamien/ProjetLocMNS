import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  saveToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.router.navigate(["admin"]);
  }

  isConnected(): boolean {
    const jwt = localStorage.getItem("jwt");
    
    return !!jwt // ici (!!) permet de faire un boolean
  }
}

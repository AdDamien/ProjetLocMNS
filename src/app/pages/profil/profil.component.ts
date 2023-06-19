import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { ConnexionService } from 'src/app/services/connexion.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  utilisateurConnecte: Utilisateur | null = null;
  utilisateur: any | Utilisateur ;

  constructor(

    private http : HttpClient,
    private serviceUtilisateur: UtilisateurService,
    private connexionService: ConnexionService,
    private tokenService : TokenService
  ) { }

  

  ngOnInit(): void {
    let test = this.tokenService.isConnected()
    console.log(test);
    

    this.getProfil();
  }

  getProfil(): void {
    const token = localStorage.getItem('token'); // Récupérer le token stocké localement
    console.log(token);
    
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log(headers);
    

    this.http.get<any>('http://localhost:8080/profil', { headers }).subscribe(
      (response) => {
        this.utilisateur = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération du profil :', error);
      }
    );
  }
}


// {{ utilisateurConnecte | fullname }} a rajouter dans le html
import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { ConnexionService } from 'src/app/services/connexion.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {

  utilisateurConnecte: Utilisateur | null = null;
  utilisateur : any | Utilisateur;
  dateMaintenant: Date = new Date();

  constructor(

    private http: HttpClient,
    private serviceUtilisateur: UtilisateurService,
    private connexionService: ConnexionService,
    private tokenService: TokenService
  ) { }



  ngOnInit(): void {
    this.getProfil();
  }

  getProfil(): void {
    const jwt = localStorage.getItem('jwt'); // Récupérer le jwt stocké localement
    const headers = { 'Authorization': `Bearer ${jwt}` };

    this.http.get<any>(environment.serverUrl + '/profil', { headers }).subscribe(
      (response) => {
      this.utilisateur = response ?? {};
      
    },
      (error) => {
        console.error('Erreur lors de la récupération du profil :', error);
      }
    );
  }
}
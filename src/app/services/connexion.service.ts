import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  public _utilisateurConnecte: BehaviorSubject<Utilisateur | null> =
    new BehaviorSubject<Utilisateur | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.updateUserConnected();
  }





  connexion(utilisateur: Utilisateur): Observable<string> {
    return this.http
      .post("http://localhost:8080/connexion", utilisateur, {
        responseType: 'text',
      });
  }


  // là on en fait une fonction parce qu'on va l'appler plusieurs fois sinon on peut le mettre dnas le constructeur 
  updateUserConnected() {
    // dans le constructeur(mtn plutot dans une méthode) on va changer la valeur de lobersvale, si il est pas null dans le localstorage donc si ya quelqu'un de connecté on recuepre le jwt
    // on le decoupe en 3 morceaux;
    // on va recueperer la partie du milieu en rose;
    // on va le decrypter en somme et on onvient du texte et on le parse en JSON hihihi lololol

    const jwt = localStorage.getItem("jwt");
    if (jwt != null) {
      // donc ça split dès que ya le caractère "." et on recuepre nous ld'index 1 ici, c'est la partie du milieu d'un jwt 
      // un jwt c'est :: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYkBhLmNvbSIsInJvbGUiOiJST0xFX0FETUlOSVNUUkFURVVSIiwicHJlbm9tIjoiRnJhbmNrIiwibm9tIjoiQkFOU0VQVCJ9.Y7idaWBXjYf6MmxocMCSXQ0jBWtgZti-B5Q9ukKLnM8
      // et bien moi je recuepre la partie : eyJzdWIiOiJmYkBhLmNvbSIsInJvbGUiOiJST0xFX0FETUlOSVNUUkFURVVSIiwicHJlbm9tIjoiRnJhbmNrIiwibm9tIjoiQkFOU0VQVCJ9
      // c'est celle qui est au milieu; 
      // donc quand tu tes connectes ici ça va nous permettre de connaitre celui qui est connecté; 

      const data = jwt.split('.')[1]; // donc on recupère l'index 1
      const json = window.atob(data); // on en fait du texte 
      const donneesUtilisateur = JSON.parse(json); // ensuite on en fait du JSON hein, (damien si tu lis ce message -> enfoiré)
      const utilisateur: Utilisateur = { // on créer un utilisateur en objet avec les données 
        email: donneesUtilisateur.sub,
        nom: donneesUtilisateur.nom,
        prenom: donneesUtilisateur.prenom,
        role: { nom: donneesUtilisateur.role }
      }
      this._utilisateurConnecte.next(utilisateur); // et donc ici on vient vérifier par le biais d'un observale sil est connecté comme ceci

    } else {
      this._utilisateurConnecte.next(null);
    }
  }

  deconnexion() {
    localStorage.removeItem("jwt");
    this._utilisateurConnecte.next(null);
    this.router.navigateByUrl('/connexion');

  }
}
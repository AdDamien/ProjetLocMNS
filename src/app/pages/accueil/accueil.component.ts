import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { ConnexionService } from 'src/app/services/connexion.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  listeUtilisateur: Utilisateur[] = []
  isAdmin: boolean = false;
  dateMaintenant: Date = new Date();
  public dateValue: Date = new Date();
  public minDate: Date = new Date();
  public maxDate: Date = new Date("06/06/2023 18:30");
  public minDate2: Date = new Date();

  updateDateSelecteurDeux() {
    this.minDate2 = this.dateValue;

  }

  constructor(

    private serviceUtilisateur: UtilisateurService,
    private connexionService: ConnexionService

  ) { }

  ngOnInit() {

    this.serviceUtilisateur._utilisateur.subscribe(
      utilisateur => this.listeUtilisateur = utilisateur
    );
    this.connexionService._utilisateurConnecte.subscribe(utilisateur => {
  this.isAdmin = utilisateur?.role.nom == "ROLE_ADMINISTRATEUR" || utilisateur?.role.nom == "ROLE_GESTIONNAIRE";
});
    this.refresh();
  }

  refresh(): void {
    this.serviceUtilisateur.getUtilisateurs();
  }

  onDeleteUser(idUtilisateurASupprimer: number | undefined) {
    if (idUtilisateurASupprimer != undefined) {
      this.serviceUtilisateur.deleteUtilisateur(idUtilisateurASupprimer)
        .subscribe(utilisateur => this.refresh())
    }
  }
}

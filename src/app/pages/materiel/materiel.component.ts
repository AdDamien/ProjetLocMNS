import { Component } from '@angular/core';
import { Materiel } from 'src/app/models/materiel';
import { ConnexionService } from 'src/app/services/connexion.service';
import { MaterielService } from 'src/app/services/materiel.service';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.scss']
})
export class MaterielComponent {

  public imageMaterielDefaut: string = 'assets/images/logomateriel.png';
  public materielAffiche: { [type: string]: any } = {};
  listeMateriel: Materiel[] = []
  dateMaintenant: Date = new Date();
  isAdmin: boolean = false;
  public dateValue: Date = new Date();
  public minDate: Date = new Date();
  public maxDate: Date = new Date("06/06/2023 18:30");
  public minDate2: Date = new Date();
  public listeTypesMateriel: string[] = [];
  public listeMaterielBonEtat: string[] = [];

  updateDateSelecteurDeux() {
    this.minDate2 = this.dateValue;

  }


  constructor(
    
    private connexionService: ConnexionService,
    private serviceMateriel : MaterielService,
    

  ) { }
  ngOnInit() {

    
    this.connexionService._utilisateurConnecte.subscribe(utilisateur => {
  this.isAdmin = utilisateur?.role.nom == "ROLE_ADMINISTRATEUR" || utilisateur?.role.nom == "ROLE_GESTIONNAIRE";
});
    this.serviceMateriel._materiel.subscribe(
      materiel => this.listeMateriel = materiel
    );
    
    this.refresh();
    this.getTypesMateriel();
    }
 

  refresh(): void {
    
    this.serviceMateriel.getMateriels();
}


  afficherMateriel(type: string, materiel: any): void {
    this.materielAffiche[type] = materiel;
  }
  
  onDeleteUser(idMaterielASupprimer: number | undefined) {
    if (idMaterielASupprimer != undefined) {
      this.serviceMateriel.deleteMateriel(idMaterielASupprimer)
        .subscribe(Materiel => this.refresh())
    }
  }

  getTypesMateriel(): void {
    this.serviceMateriel.getTypesMateriel().subscribe(
      (types: string[]) => {
        this.listeTypesMateriel = types;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}





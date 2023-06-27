import { Component } from '@angular/core';
import { ConnexionService } from './services/connexion.service';
import { Utilisateur } from './models/utilisateur';
import { loadCldr, L10n } from "@syncfusion/ej2-base";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';


declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

title = 'ProjetLocMNS';

  public dateValue: Date = new Date();
  public minDate: Date = new Date();
  public maxDate: Date = new Date("16/06/2023 18:30");
  public minDate2: Date = new Date();

  updateDateSelecteurDeux() {
    this.minDate2 = this.dateValue;

  }

  utilisateurConnecte: Utilisateur | null = null;
  constructor(
    
    private connexionService: ConnexionService

  ) { }



  ngOnInit() {

    registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

    loadCldr(

      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/main/de/ca-gregorian.json'),
      require('cldr-data/main/de/numbers.json'),
      require('cldr-data/main/de/timeZoneNames.json'),
      require('cldr-data/supplemental/weekData.json')

    );
    L10n.load({ 
  fr: { 
    datepicker: { 
     today: "Aujourd'hui", 
      placeholder: "Choisissez une date" 
    } 
  } 
});
    
    this.connexionService._utilisateurConnecte.subscribe(
      utilisateur => this.utilisateurConnecte = utilisateur

    );
  }
  onDeconnexion() {
    this.connexionService.deconnexion();
  }
}


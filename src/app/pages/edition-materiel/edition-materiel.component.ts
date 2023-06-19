import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterielService } from 'src/app/services/materiel.service';
import { Materiel } from 'src/app/models/materiel'

@Component({
  selector: 'app-edition-materiel',
  templateUrl: './edition-materiel.component.html',
  styleUrls: ['./edition-materiel.component.scss']
})
export class EditionMaterielComponent {

  minDate: Date;

  formulaireMateriel: FormGroup = this.formBuilder.group({
    // les validators sont un tableau de validation donc il faut mettre des crochet 
    type: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    modele: ["", [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
    marque: ["", [Validators.required,Validators.minLength(3), Validators.maxLength(50)]],
    reference: ["", [Validators.required,Validators.minLength(3), Validators.maxLength(50)]]
    

  })
  constructor(
    
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private serviceMateriel: MaterielService,

  ) {
    this.minDate = new Date(); // Obtient la date actuelle
   }

  idMateriel: number | undefined;
  codeRetour: number = 0;
  messageErreur: string = "";
  fichier: File | null = null;

  ngOnInit() {

    this.route.params.subscribe(
      (parametres) => {
        this.idMateriel = parametres['id'];
        if (this.idMateriel != null) {
          this.serviceMateriel.getMateriel(this.idMateriel)
            .subscribe({
              next: (materiel: Materiel) => {

                this.formulaireMateriel.get("marque")?.setValue(materiel.marque);
                this.formulaireMateriel.get("modele")?.setValue(materiel.modele);
                this.formulaireMateriel.get("reference")?.setValue(materiel.reference);
                this.formulaireMateriel.get("prixAchat")?.setValue(materiel.prixAchat);
                this.formulaireMateriel.get("date_acquisition")?.setValue(materiel.date_acquisition);
                this.formulaireMateriel.get("date_finGarantie")?.setValue(materiel.date_finGarantie);
                this.formulaireMateriel.get("nomImageMateriel")?.setValue(materiel.nomImageMateriel);

              },
              error: erreurRequete => {

                if (erreurRequete.status === 404) { // verifie le status de la requete au serveur
                  this.codeRetour = 404;

                } else {
                  this.codeRetour = 500;
                  this.messageErreur =
                    "Si l'erreur persiste contactez l'administrateur"
                }
              }
            })
        };
      })
  }

  onSubmit() {
    if (this.formulaireMateriel.valid) {

      const formData = new FormData();
      const materiel: Materiel = this.formulaireMateriel.value;
      materiel.id = this.idMateriel;


      if (this.fichier) {
        formData.append('fichier', this.fichier);
      }

      formData.append(
        'materiel',
        new Blob([JSON.stringify(materiel)], {
          type: 'application/json',
        })
      );
      
      this.serviceMateriel
        .editionMateriel(formData)
        .subscribe((resultat) => this.router.navigateByUrl("materiel"))
    }
  }

  onImageSelectionnee(event: any) {
    this.fichier = event.target.files[0];
  }
}




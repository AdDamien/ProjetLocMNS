import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Utilisateur } from 'src/app/models/utilisateur';
import { PaysService } from 'src/app/services/pays.service';
import { Pays } from 'src/app/models/pays';

@Component({
  selector: 'app-edition-utilisateur',
  templateUrl: './edition-utilisateur.component.html',
  styleUrls: ['./edition-utilisateur.component.scss']
})
export class EditionUtilisateurComponent {
  formulaire: FormGroup = this.formBuilder.group({
    // les validators sont un tableau de validation donc il faut mettre des crochet 
    prenom: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],      // prenom correspond au nom de la propriété coté spring
    nom: ["", [Validators.required,Validators.minLength(5), Validators.maxLength(20)]],
    email: ["", [Validators.email, Validators.required]],
    telephone: ["", [Validators.required, Validators.maxLength(20)]]
  
  })
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private serviceUtilisateur: UtilisateurService,
    private servicePays: PaysService

  ) { }

  idUtilisateur: number | undefined;
  codeRetour: number = 0;
  messageErreur: string = "";
  telephone: string = "";
  listePays: Pays[] = [];
  fichier: File | null = null;
  //listeRole: Role[] = [];


  ngOnInit() {

    /*this.servicePays.getPays().subscribe({
      next: listePays => this.listePays = listePays,
      error: erreur => console.log(erreur)
    })*/

    this.route.params.subscribe(
      (parametres) => {
        this.idUtilisateur = parametres['id'];
        if (this.idUtilisateur != null) {
          this.serviceUtilisateur.getUtilisateur(this.idUtilisateur)
            .subscribe({
              next: (utilisateur: Utilisateur) => {

                this.formulaire.get("email")?.setValue(utilisateur.email);
                this.formulaire.get("nom")?.setValue(utilisateur.nom);
                this.formulaire.get("prenom")?.setValue(utilisateur.prenom);
                //this.formulaire.get("pays")?.setValue(utilisateur.pays);
                this.formulaire.get("telephone")?.setValue(utilisateur.telephone);
                this.formulaire.get("nomImageProfil")?.setValue(utilisateur.nomImageProfil);

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

  comparePays(paysOption: any, paysUtilisateur: any) {

    return paysUtilisateur != null && paysUtilisateur.id == paysOption.id;
  }
  onSubmit() {
    if (this.formulaire.valid) {

      const formData = new FormData();
      const utilisateur: Utilisateur = this.formulaire.value;
      utilisateur.id = this.idUtilisateur;


      if (this.fichier) {
        formData.append('fichier', this.fichier);
      }

      formData.append(
        'utilisateur',
        new Blob([JSON.stringify(utilisateur)], {
          type: 'application/json',
        })
      );
      
      this.serviceUtilisateur
        .editionUtilisateur(formData)
        .subscribe((resultat) => this.router.navigateByUrl("accueil"))
    }
  }
  onImageSelectionnee(event: any) {
    this.fichier = event.target.files[0];
  }
}
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-import-utilisateur',
  templateUrl: './import-utilisateur.component.html',
  styleUrls: ['./import-utilisateur.component.scss']
})

export class ImportUtilisateurComponent {

  statusMessage: string | undefined;
  documents: File | null = null;
  compteurUtilisateurImporter : number = 0;

  constructor(private http: HttpClient) { }

  importDocument() {
    if (this.documents) {
      const formData: FormData = new FormData();
      formData.append('fichier', this.documents);

      // Requête pour importer les utilisateurs
      this.http.post<any[]>(environment.serverUrl + "/import-utilisateurs", formData).subscribe(
        (response: any[]) => {
          this.statusMessage = 'Fichier importé avec succès.';
          console.log(response);

          // Requête pour récupérer le compteur d'utilisateurs
          this.http.get<number>(environment.serverUrl + "/compteur-import-utilisateur").subscribe(
            (compteur: number) => {
              this.compteurUtilisateurImporter = compteur;
            },
            (error: any) => {
              console.error("Erreur lors de la récupération du compteur d'utilisateurs : " + error);
            }
          );
        },
        (error: any) => {
          this.statusMessage = 'Une erreur s\'est produite lors de l\'importation du fichier.';
          console.error(error);
        }
      );
    } else {
      this.statusMessage = 'Veuillez sélectionner un fichier à importer.';
    }
  }


  onImportDocument(event: any) {
    this.documents = event.target.files[0];
  }

}

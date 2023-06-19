import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-import-utilisateur',
  templateUrl: './import-utilisateur.component.html',
  styleUrls: ['./import-utilisateur.component.scss']
})

export class ImportUtilisateurComponent {

  statusMessage: string | undefined;
  documents: File | null = null;

  constructor(private http: HttpClient) { }

  importDocument() {
    if (this.documents) {
      const formData: FormData = new FormData();
      formData.append('fichier', this.documents);

      this.http.post<any[]>('http://localhost:8080/import-utilisateurs', formData).subscribe(
        (response: any[]) => {
          this.statusMessage = 'Fichier importé avec succès.';
          console.log(response);
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

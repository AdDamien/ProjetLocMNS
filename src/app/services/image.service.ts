import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Utilisateur } from '../models/utilisateur';
import { Materiel } from '../models/materiel';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  chargementImageProfil(utilisateur: Utilisateur) {
    if (utilisateur.nomImageProfil != null) {
      this.http
        .get('http://localhost:8080/image-profil/' + utilisateur.id, { responseType: 'blob' })
        .subscribe((donneeImage: any) => {
          utilisateur.imageProfil = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(donneeImage)
          );
        });
    }
  }

  chargementPictureMateriel(materiel:Materiel) {
    if (materiel.nomImageMateriel != null) {
      this.http
        .get('http://localhost:8080/image-materiel/' + materiel.id, { responseType: 'blob' })
        .subscribe((donneeImage: any) => {
          materiel.imageMateriel = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(donneeImage)
          );
        });
    }
  }
}


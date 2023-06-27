import { Injectable } from '@angular/core';
import { ImageService } from './image.service';
import { HttpClient } from '@angular/common/http';
import { Materiel } from '../models/materiel';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConnexionService } from './connexion.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  public _materiel: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
    private imageService: ImageService,
    private connexionService: ConnexionService
  ) {
    this.connexionService._utilisateurConnecte.subscribe(utilisateur => {
      this.isAdmin = utilisateur?.role.nom == "ROLE_ADMINISTRATEUR" || utilisateur?.role.nom == "ROLE_GESTIONNAIRE";
    });
  }

  fichier: File | null = null;
  isAdmin: boolean = false;

  public getMateriels() {
    if (this.isAdmin) {
      this.http
        .get<Materiel[]>(environment.serverUrl + "/liste-materiel")
          .subscribe((materiel: Materiel[]) => {
            for (let materiels of materiel) {
              this.imageService.chargementPictureMateriel(materiels);
            }
            this._materiel.next(materiel);
          });
    } else {
      this.http
        .get<Materiel[]>(environment.serverUrl + "/liste-bonmateriel")
          .subscribe((materiel: Materiel[]) => {
            for (let materiels of materiel) {
              this.imageService.chargementPictureMateriel(materiels);
            }
            this._materiel.next(materiel);
          });
    }
  }



  public getTypesMateriel(): Observable<string[]> {
    return this.http.
      get<string[]>(environment.serverUrl+"/liste-materiel-typer");
  }

  public deleteMateriel(id: number): Observable<any> {
    return this.http
      .delete(environment.serverUrl+"/admin/materiel / " + id)
  }

  public editionMateriel(formData: FormData): Observable<any> {
    return this.http
      .post(environment.serverUrl + '/admin/materiel', formData)
  }

  public getMateriel(id: number): Observable<any> {
    return this.http
      .get(environment.serverUrl + '/materiel/' + id)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public _utilisateur: BehaviorSubject<any> = new BehaviorSubject<any>([]); // le underscore devant c'est pour un observable

  constructor(
    private http: HttpClient,
    private imageService: ImageService
  ) { }

  fichier: File | null = null;

  public getUtilisateurs() {

    this.http
      .get<Utilisateur[]>("http://localhost:8080/utilisateur")
      .subscribe((utilisateur: Utilisateur[]) => {
        for (let utilisateurs of utilisateur) {
          this.imageService.chargementImageProfil(utilisateurs);

        }
        this._utilisateur.next(utilisateur);
      });
  }


  public deleteUtilisateur(id: number): Observable<any> {
    return this.http
      .delete("http://localhost:8080/admin/utilisateur/" + id)
  }

  public editionUtilisateur(formData: FormData): Observable<any> {
    return this.http
      .post('http://localhost:8080/admin/utilisateur', formData)
  }

  public getUtilisateur(id: number): Observable<any> {
    return this.http
      .get('http://localhost:8080/utilisateur/' + id)

  }

}


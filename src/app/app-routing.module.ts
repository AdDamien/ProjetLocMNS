import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { Page404Component } from './pages/page404/page404.component';
import { EditionUtilisateurComponent } from './pages/edition-utilisateur/edition-utilisateur.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { Page403Component } from './pages/page403/page403.component';
import { MaterielComponent } from './pages/materiel/materiel.component';
import { EditionMaterielComponent } from './pages/edition-materiel/edition-materiel.component';
import { PretComponent } from './pages/pret/pret.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { ImportUtilisateurComponent } from './pages/import-utilisateur/import-utilisateur.component';

const routes: Routes = [
  { path: "accueil", component: AccueilComponent, canActivate: [UserGuard] },
  { path: "connexion", component: ConnexionComponent },
  { path: "materiel", component: MaterielComponent },
  { path: "pret", component: PretComponent },
  { path: "profil", component: ProfilComponent },
  { path: "import-utilisateurs", component: ImportUtilisateurComponent },
  { path: "ajout-materiel", component: EditionMaterielComponent, canActivate: [AdminGuard] },
  { path: "edit-materiel/:id", component: EditionMaterielComponent, canActivate: [AdminGuard] },
  { path: "ajout-utilisateur", component: EditionUtilisateurComponent, canActivate: [AdminGuard] },
  { path: "edit-utilisateur/:id", component: EditionUtilisateurComponent, canActivate: [AdminGuard] },
  { path: "", redirectTo: "accueil", pathMatch: "full" },
  { path: 'droits-insuffisants', component: Page403Component },
  { path: "**", component: Page404Component }


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

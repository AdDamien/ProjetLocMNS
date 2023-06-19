import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { Page404Component } from './pages/page404/page404.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditionUtilisateurComponent } from './pages/edition-utilisateur/edition-utilisateur.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';
import { Page403Component } from './pages/page403/page403.component';
import { MatSelectModule } from '@angular/material/select';
import { FullNamePipe } from './pipes/fullname.pipe';
import { MaterielComponent } from './pages/materiel/materiel.component';
import { IsAdminPipe } from './pipes/is-admin.pipe';
import { EditionMaterielComponent } from './pages/edition-materiel/edition-materiel.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PretComponent } from './pages/pret/pret.component';
import { TypesPipe } from './pipes/filtres/types.pipe';
import { StatutPipe } from './pipes/filtres/statut.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { ProfilComponent } from './pages/profil/profil.component';
import { ImportUtilisateurComponent } from './pages/import-utilisateur/import-utilisateur.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ConnexionComponent,
    Page404Component,
    EditionUtilisateurComponent,
    Page403Component,
    FullNamePipe,
    MaterielComponent,
    IsAdminPipe,
    EditionMaterielComponent,
    PretComponent,
    TypesPipe,
    StatutPipe,
    ProfilComponent,
    ImportUtilisateurComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    DateTimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  // providers pour rajouter un service
  providers: [{ 
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
  },
  { provide: LOCALE_ID, useValue: 'fr-FR' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

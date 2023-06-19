import { Pays } from "./pays";
import { Pret } from "./pret";
import { Role } from "./role";

export interface Utilisateur {
    id?: number;
    prenom: string;
    nom: string;
    email: string;
    telephone?: string;
    role: Role;
    pays?: Pays; // le ? permet de rentre un paramètre optionelle
    pret?: Pret;
    dateCreation?: Date;
    dateMiseAJour?: Date;
    nomImageProfil?: string;
    imageProfil?: any;
}
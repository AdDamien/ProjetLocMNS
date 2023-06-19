import { Etat } from "./etat";
import { Type } from "./type";

export interface Materiel {

    id?: number;
    type: Type;
    etat: Etat;
    marque: string;
    modele: string;
    reference: string;
    nomImageMateriel: string;
    imageMateriel: any;
    prixAchat?: number;
    date_acquisition?: Date;
    date_finGarantie?: Date;
    date_debutEmprunt: Date;
    date_finEmprunt: Date;
   

}
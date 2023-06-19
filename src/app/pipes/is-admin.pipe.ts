import { Pipe, PipeTransform } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';


@Pipe({
  name: 'isAdmin'
})
export class IsAdminPipe implements PipeTransform {
  transform(utilisateur: Utilisateur): boolean {
    return (utilisateur.role.nom === 'administrateur' || utilisateur.role.nom === 'gestionnaire');
  }
}



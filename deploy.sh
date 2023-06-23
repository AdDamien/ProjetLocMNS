#!/bin/bash

# Mettre à jour le code source
git pull
# Construire l'image Docker image-application exemple nom Front MNS pour angular
docker build --no-cache -t image-application .
# Arreter le conteneur existant on peut changer le nom du conteneur exemple front mns
docker stop conteneur-application
# Supprimer le conteneur existant
docker rm conteneur-application
# Lancer un nouveau conteneur
docker run -d --name=conteneur-application -p 4200:80 image-application
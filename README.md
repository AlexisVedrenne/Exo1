
# Fiche d’installation et d’explication de l’exerce 1

Le but de cet exercice était de créer un formulaire web permettant de renseigner ses données, à l’issue de la validation de ce formulaire, un SMS est envoyé au numéro de téléphone indiqué. Le SMS contient uniquement un lien URL.  
Ce lien URL redirige vers une page Web rappelant les informations saisies par l’utilisateur lors de là  
première étape : le formulaire web.

# Fichier mis à disposition

Un fichier zip qui se nomme exo1.zip contient le dossier source du site web ainsi que le script d’installation des dépendances et d’exécution/lancement du site. Le setup de node JS est également fournis

-   ExécutionExo1.ps1
-   EXO1
-   node-v14.17.3-x64.msi

## Installation

Avant d’ouvrir le dossier, il faut installer node JS qui est fourni dans l’archive. Lancer l’installation et laisser tous les paramètres par défauts.

Une fois cela terminé, mettre le dossier EXO1 sur le bureau ainsi que le fichier PowerShell. Pour que le site fonctionne et puisse se lancer il faut obligatoirement exécuter le fichier .ps1. Il va permettre de mettre à jour ou d’installer les paquets manquants. Il va aussi ouvrir une fenêtre cmd.exe qui va exécuter le serveur node JS et sur la fenêtre PowerShell il va démarrer le tunnel qui lui, permettra d’accéder au serveur node JS dans tout le réseau local.

**Attention si le script PowerShell ne s’exécuté pas il faut taper cette commande**  `Set-ExecutionPolicy Unrestricted`  **puis appuyer sur O pour valider. Cette commande va permettre d’autoriser l’exécution du script PowerShell. Il faut aussi faire clique droit pour executer avec powerhsell pour ouvrir le script.**

## Source

 - https://youtu.be/HxGt_3F0ULg
 - https://devdocs.io/node/
 - https://www.w3schools.com/html/html_responsive.asp
 - https://getbootstrap.com/
 - https://www.youtube.com/channel/UCj_iGliGCkLcHSZ8eqVNPDQ
 - https://docs.ovh.com/fr/sms/


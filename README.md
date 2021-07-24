# Api Platform & React

Bienvenue sur le projet. Nous allons vous expliquez comment démarrer le projet et profiter pleinement de l'api ainsi que du front fournis avec.

## Prérequis

- Tout d'abord, il faudra vous munir de **composer**. Sans ça, vous ne pourrez pas lancer symfony et donc Api platform.
- Posséder le CLI de symfony. C'est un bon plus pour vous facilitez la tâche afin de lancer le serveur avec une simple commande. (facultatif)
- Posséder **YARN** obligatoirement. Le projet a été instancier et créer tout le long avec yarn.

## Installation

Tout d'abord, installez les dépendances php pour symfony
```
composer install
```

Ensuite, veuillez installer les dépendances javascript pour react

```
yarn install
```

Il faudra mettre en place la base de donnée et la configuration du JWT:

###Base de donnée
- Copier le fichier .env et renommer le .env.local
- Modifier la ligne 32 par vos données :
  ```
  DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7
  ```
- Charger votre base de donnée avec les entités créer :
```
symfony console d:s:u --force
```
Ou sans CLI
```
php bin/console d:s:u --force
```

Maintenant, faut bien que votre application possède de la DATA. Pour les charger, faudra utiliser les fixtures 
```
symfony console d:f:l
```

Ou sans CLI

```
php bin/console d:f:l
```

###Configuration JWT

Créer un dossier JWT dans config
  ```
  mkdir config/jwt
  ```
  
Ensuite, il faudra générer la clé privé pour JWT avec openssl. Il demandera une phrase. Veuillez la garder précieusement.
  ```
  openssl genrsa -out config/jwt/private.pem -aes256 4096
  ```
  
Faire pareil pour la clé privé. Il demandera aussi une clé. Mettez la clé que vous avez crée précédemment.
  ```
  openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
  ```
Reprenez le fichier **.env.local** puis supprimez dans la partie **lexik/jwt-authentication-bundle** a la ligne 35 :
  ```
  JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
  JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
  ```
Dans JWT_PHRASE, vous allez mettre la phrase que vous avez configuré précédemment pour créer vos clés.

## Lancer le serveur

Pour lancer le serveur, il y'a deux manières :

**CLI SYMFONY**
```
symfony serve -d --no-tls
```

**PHP**
```
php -S 127.0.0.1:8000 -t public/
```

Vous devez aussi lancer le serveur webpack pour compiler les fichiers.
```
yarn run dev-server
```

## But du projet

Vous pouvez désormais vous connectez à la plateforme et gestionner vos articles.

Pour accèder à l'admin, le compte est : 
```
username : Djaizansi | mdp: azerty
```

Vous pouvez modifier ces données dans le dossier datafixture dans la partie UserFixture qui permet comme par exemple de créer votre administrateur dés le départ.

Ensuite vous pouvez accèder à tous les utilisateurs en regardant votre base de donnée. Récupèrer l'username et le mot de passe est toujours **azerty**

<br/>
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmoEKpp2xduxbrUK1vGPGzdJ91CLf3scrtwg&s" width="350"></a></p>
<br/>
<p align="center"> 
    <img src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white"/>
    <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white"/>
    <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
</p>

<hr/>

<br/>

> ❗ **Attention**<br/>
> **Ce README pourra changer à l'avenir.** Vous en serez informé sur Discord.

<br/>

## ⚙ Mise en place du projet

### 🔨 Installation des outils

Tout d'abord, il vous est demander d'installer **NodeJS**, un logiciel qui permet le développement des scripts javascript en local sans avoir besoin d'installer autre chose.

De plus, il vous ai recommandé d'installer **pnpm**, un gestionnaire de paquets qui permet de gérer les dépendances de votre projet.  
Pour cela, ouvrez une console et exécutez la commande suivante :

```bash
npm install -g @pnpm/exec
```

Vous devez également installer **git** pour pouvoir travailler avec le repository.

https://git-scm.com/download/win

<br/>

### 🔐 Installation des dépendances


Si vous ne l'avez pas encore fait, rendez-vous dans n'importe quelle console, naviguez vers votre répertoire et exécutez la commande suivante :

```bash
git clone https://github.com/ETFaLeak3/ETFaLeak.git
```

Une fois le repository cloné, dirigez-vous vers le répertoire du projet, et exécutez la commande suivante :

```bash
pnpm i
```

(Si vous n'avez pas installé **pnpm**, vous pouvez remplacer `pnpm` par `npm`)

```bash	
npm i
```

Cela aura pour effet d'installer les dépendances **NodeJS** du projet.

<br/>

### 💻 Lancer le projet en mode développement

Maintenant, vous allez devoir lancer le serveur de développement du **front-end**. Rendez-vous dans votre seconde console et faites la commande suivante :

```bash
pnpm dev
```

(Si vous n'avez pas installé **pnpm**, vous pouvez remplacer `pnpm` par `npm`)

```bash
npm run dev
```

Vous verrez alors la ligne "VITE v3.2.5 ready in ... ms". Cela signifie que le serveur **front-end** est s'est lancé avec succès.

Vous pouvez désormais vous rendre à l'adresse http://localhost:5173/ et voir le site !

> 📝 **À noter**<br/>
> Tout le front-end se situe dans `/src/`. Grâce au *🔥 hot reload 🔥*, toute modification appliquée se verra en direct sur votre page, il n'y a pas besoin de relancer le serveur front-end.

<br/>

## 🎯 Code de conduite

Pour garder un maximum d'organisation, vous êtes priés de respecter une certaine nomenclature sur toute modification que vous apporterez au projet.

- 🚨 Commits compréhensibles, vrais noms de commit
- ❗❗ **Aucun push** sur la branche principale. Pour une nouvelle fonctionnalité, créez une nouvelle branche et nommez la de la façon suivante : `features/authentication` ou `features/dessin_quiz`, par exemple. Si la fonctionnalité existe déjà, libre à vous de push sur cette branche-ci. Une fois les features finies, un **chef** s'occupera de merge sur la branche principale.
- 🛠️ Vrais noms de migrations compréhensibles
- ✨ Utiliser https://gitmoji.dev/ pour les emojis des commits

<br/>

> ***Optionnel*** : si vous pouvez préciser les modifications/ajouts que vous faites ailleurs (Figma, Notion), faites-le, cela permet de tenir l'équipe entière au courant et de ne pas faire de travail en double ! 😀
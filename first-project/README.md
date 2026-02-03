# 🚀 Premier Projet DevOps

[![CI/CD Pipeline](https://github.com/Matfen2/premier-projet-devops/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Matfen2/premier-projet-devops/actions/workflows/pipeline.yml)

Pipeline CI/CD complet avec GitHub Actions, tests automatisés, containerisation Docker multi-stage et déploiement sur AWS Amplify.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?logo=githubactions&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-Amplify-FF9900?logo=amazonaws&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📋 Sommaire

- [Présentation](#-présentation)
- [Architecture](#-architecture)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Docker Multi-Stage](#-docker-multi-stage)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Scripts disponibles](#-scripts-disponibles)
- [Déploiement](#-déploiement)
- [Structure du projet](#-structure-du-projet)
- [Auteur](#-auteur)

---

## 🎯 Présentation

Ce projet est une démonstration complète de pratiques DevOps modernes appliquées à une application React. Il couvre l'ensemble du cycle de vie du développement logiciel, de l'écriture du code au déploiement en production.

**Objectifs du projet :**

- Mettre en place un pipeline CI/CD automatisé avec GitHub Actions
- Containeriser l'application avec Docker en utilisant un build multi-stage
- Automatiser les contrôles qualité (lint, sécurité, tests)
- Déployer automatiquement sur le cloud (AWS Amplify)

---

## 🏗 Architecture

```
Developer → Git Push → GitHub Actions CI/CD → AWS Amplify
                              │
                    ┌─────────┼─────────┐
                    │         │         │
                  Lint    Security   Tests
                    │         │         │
                    └─────────┼─────────┘
                              │
                        Docker Build
                              │
                         Deploy ☁️
```

Le pipeline s'exécute automatiquement à chaque push sur `main` ou lors d'une pull request. Les étapes de lint et de sécurité s'exécutent en parallèle, suivies des tests, puis du build Docker.

---

## 🔄 Pipeline CI/CD

Le pipeline GitHub Actions est composé de **4 jobs** orchestrés avec des dépendances :

| Job | Description | Dépendances |
|-----|-------------|-------------|
| 🔎 **Lint** | Vérifie la qualité du code avec ESLint | - |
| 🛡️ **Security** | Audit des dépendances npm | - |
| 🧪 **Tests** | Exécute les tests unitaires avec Vitest | Lint + Security |
| 🐳 **Build Docker** | Construit l'image Docker multi-stage | Tests |

```yaml
# Exécution parallèle puis séquentielle
Lint ──────┐
           ├──→ Tests ──→ Build Docker
Security ──┘
```

**Fichier :** `.github/workflows/pipeline.yml`

### Détails des jobs

**Lint** — Vérifie le respect des conventions de code avec ESLint. La configuration gère séparément les fichiers React (browser) et les fichiers Node.js (server).

**Security** — Exécute `npm audit --audit-level=high` pour détecter les vulnérabilités connues dans les dépendances. Configuré avec `continue-on-error: true` pour ne pas bloquer le pipeline sur les vulnérabilités non critiques.

**Tests** — Lance les tests unitaires via Vitest. Ne s'exécute que si le lint et l'audit de sécurité sont passés.

**Build Docker** — Construit l'image Docker multi-stage et vérifie sa création. Ne s'exécute que si les tests sont passés.

---

## 🐳 Docker Multi-Stage

Le Dockerfile utilise **4 stages** pour optimiser la taille de l'image finale et séparer les responsabilités :

```dockerfile
# Stage 1: Dependencies — Installe et sépare les dépendances prod/dev
FROM node:20-alpine AS deps

# Stage 2: Build — Compile l'application React avec Vite
FROM node:20-alpine AS build

# Stage 3: Test — Exécute lint et tests unitaires
FROM node:20-alpine AS test

# Stage 4: Production — Sert les fichiers statiques avec Nginx
FROM nginx:alpine AS production
```

### Bonnes pratiques appliquées

- **`npm ci`** au lieu de `npm install` pour des builds reproductibles
- **Séparation des dépendances** prod et dev pour réduire la taille de l'image
- **Images Alpine** pour minimiser la surface d'attaque
- **Layer caching** optimisé (package.json copié avant le code source)
- **Utilisateur non-root** pour Nginx (sécurité)
- **HEALTHCHECK** intégré pour le monitoring des containers
- **Configuration Nginx personnalisée** avec headers de sécurité, gzip et routing SPA

### Configuration Nginx

Le fichier `nginx.conf` inclut :

- Headers de sécurité : `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`
- Compression gzip pour les assets
- Cache longue durée (1 an) pour les fichiers statiques
- Routing SPA avec `try_files`
- Blocage des fichiers cachés

### Commandes Docker

```bash
# Build l'image
docker build -t first-devops .

# Lancer le container
docker run -p 80:80 first-devops

# Vérifier le healthcheck
docker inspect --format='{{.State.Health.Status}}' <container_id>
```

---

## 🛠 Tech Stack

| Catégorie | Technologie | Usage |
|-----------|-------------|-------|
| **Frontend** | React 19 | Framework UI |
| **Build** | Vite 7 | Bundler et dev server |
| **Styling** | Tailwind CSS 4 | Framework CSS utility-first |
| **Animations** | Framer Motion | Animations déclaratives |
| **Icônes** | Lucide React | Icônes SVG modernes |
| **Linting** | ESLint 9 | Analyse statique du code |
| **Tests** | Vitest | Tests unitaires |
| **Container** | Docker | Containerisation multi-stage |
| **CI/CD** | GitHub Actions | Pipeline d'intégration continue |
| **Cloud** | AWS Amplify | Hébergement et déploiement |

---

## ⚡ Installation

### Prérequis

- Node.js 20+
- npm 9+
- Docker (optionnel, pour la containerisation)

### Lancer le projet en local

```bash
# Cloner le repo
git clone https://github.com/Matfen2/premier-projet-devops.git
cd premier-projet-devops/first-project

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Lancer avec Docker

```bash
cd first-project

# Build l'image
docker build -t first-devops .

# Lancer le container
docker run -p 8080:80 first-devops
```

L'application sera accessible sur `http://localhost:8080`.

---

## 📦 Scripts disponibles

| Script | Commande | Description |
|--------|----------|-------------|
| `dev` | `npm run dev` | Serveur de développement Vite |
| `build` | `npm run build` | Build de production |
| `preview` | `npm run preview` | Prévisualisation du build |
| `lint` | `npm run lint` | Vérification ESLint |
| `test` | `npm test` | Tests unitaires Vitest |

---

## ☁️ Déploiement

### AWS Amplify

L'application est déployée automatiquement sur AWS Amplify à chaque push sur `main`.

**Configuration Amplify (`amplify.yml`) :**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd first-project
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: first-project/dist
    files:
      - '**/*'
  cache:
    paths:
      - first-project/node_modules/**/*
```

---

## 📁 Structure du projet

```
premier-projet-devops/
├── .github/
│   └── workflows/
│       └── pipeline.yml          # Pipeline CI/CD GitHub Actions
├── first-project/
│   ├── public/                   # Assets statiques
│   ├── src/
│   │   ├── components/
│   │   │   ├── Background.jsx    # Effets de fond (gradient orbs)
│   │   │   ├── StatusBadge.jsx   # Badge "Pipeline opérationnel"
│   │   │   ├── Hero.jsx          # Section titre principal
│   │   │   ├── Pipeline.jsx      # Visualisation pipeline CI/CD
│   │   │   ├── TechTags.jsx      # Tags des technologies
│   │   │   ├── CTAButtons.jsx    # Boutons d'action
│   │   │   ├── DockerSection.jsx # Section Docker dépliable
│   │   │   ├── Footer.jsx        # Pied de page
│   │   │   └── index.js          # Exports centralisés
│   │   ├── App.jsx               # Composant principal
│   │   ├── index.css             # Styles globaux + Tailwind
│   │   └── main.jsx              # Point d'entrée React
│   ├── Dockerfile                # Build Docker multi-stage (4 stages)
│   ├── nginx.conf                # Configuration Nginx production
│   ├── .dockerignore             # Fichiers exclus du build Docker
│   ├── eslint.config.js          # Configuration ESLint
│   ├── vite.config.js            # Configuration Vite + Tailwind
│   ├── package.json              # Dépendances et scripts
│   └── README.md
└── README.md
```

---

## 👤 Auteur

**Mathieu FENOUIL** — Apprenti DevOps

- GitHub : [@Matfen2](https://github.com/Matfen2)

---

## 📄 Licence

Ce projet est un projet de portfolio à but éducatif.
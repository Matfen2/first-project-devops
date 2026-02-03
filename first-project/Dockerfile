FROM node:25-alpine3.23

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port Vite
EXPOSE 5173

# Lancer l'app en mode dev
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
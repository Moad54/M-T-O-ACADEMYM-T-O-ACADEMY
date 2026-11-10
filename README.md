# MÉTÉO ACADEMY — Next.js + PayPal
Site en français avec trois formules : NORMAL, PRO et PRO MAX.

## Installation
Node.js 18.17+ requis.
```bash
npm install
cp .env.example .env.local
npm run dev
```
Ouvrir http://localhost:3000.

## PayPal Sandbox
1. Aller sur https://developer.paypal.com/dashboard/
2. Créer une application REST Sandbox.
3. Copier Client ID et Secret dans `.env.local` :
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=CLIENT_ID_SANDBOX
PAYPAL_CLIENT_ID=CLIENT_ID_SANDBOX
PAYPAL_CLIENT_SECRET=SECRET_SANDBOX
PAYPAL_ENV=sandbox
```
4. Redémarrer le serveur et tester avec un compte acheteur Sandbox.

Ne jamais exposer le Secret dans le navigateur, dans NEXT_PUBLIC_ ou dans GitHub.

## Déploiement Vercel
Importer le dépôt GitHub dans Vercel, ajouter les mêmes variables dans Settings > Environment Variables, puis déployer.

Pour passer en Live, utiliser les identifiants Live et PAYPAL_ENV=live uniquement après avoir vérifié l'éligibilité de votre compte PayPal à recevoir des paiements au Maroc.

## À compléter avant la vente
Prix de démonstration : 19 €, 39 € et 69 € par mois. Ils sont définis dans app/page.tsx et dans les deux routes API.
Le paiement est créé et capturé côté serveur, puis le montant, la devise et la formule sont vérifiés. Cette version ne comprend pas encore les comptes apprenants, la base de données, l'activation automatique des accès premium, les abonnements récurrents, les remboursements ou les webhooks PayPal. Ces fonctions sont nécessaires avant la commercialisation réelle.
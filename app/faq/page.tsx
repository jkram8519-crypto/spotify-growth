import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ Spotlift — Questions fréquentes',
  description: 'Toutes les réponses à vos questions sur Spotlift. Comment fonctionne le Pitch Generator ? Quel est le prix ? Comment annuler ?',
};

export default function FAQ() {
  return (
    <main style={{background:'#000',color:'#fff',padding:'60px 40px',maxWidth:'800px',margin:'0 auto',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'10px',color:'#9B59B6'}}>FAQ</h1>
      <p style={{color:'#aaa',marginBottom:'40px'}}>Questions fréquemment posées</p>
      {[
        {q:"C'est quoi Spotlift ?",a:"Spotlift est un outil IA complet pour artistes indépendants sur Spotify. Il génère des pitches professionnels, planifie tes sorties sur 44 jours, analyse tes performances et bien plus."},
        {q:"C'est gratuit ?",a:"Oui. Le plan Free est gratuit et le reste : générateur de pitch, plan de sortie personnalisé et rappels par email. Le plan Pro (9,99 €/mois, ou 7,99 €/mois en annuel) débloque tous les autres outils. Il n'y a qu'une seule offre payante."},
        {q:"Comment fonctionne le Pitch Generator IA ?",a:"Tu entres le nom de ton track et ton genre musical, et l'IA génère en 10 secondes un pitch professionnel prêt à envoyer aux curateurs de playlist."},
        {q:"Qu'est-ce que le plan de sortie ?",a:"Tu réponds à six questions (titre, date, genre, distributeur, réseaux, SACEM) et tu reçois un plan daté de J-44 à J+14. Il est sauvegardé, tu coches les étapes au fur et à mesure et tu reçois un rappel par email les jours où une étape est prévue. Il est gratuit."},
        {q:"L'app est-elle disponible sur mobile ?",a:"Oui ! Spotlift est disponible sur Android via Google Play. La version iOS arrive prochainement."},
        {q:"Comment annuler mon abonnement ?",a:"Tu peux annuler à tout moment depuis ton dashboard. Aucun engagement, aucune pénalité."},
        {q:"Mes données sont-elles sécurisées ?",a:"Oui ! Tes données sont stockées sur Supabase (Union Européenne) et nous respectons le RGPD. Tes données ne sont jamais vendues."},
        {q:"Comment contacter le support ?",a:"Par email à contact.spotlift@gmail.com. Nous répondons dans les 24 heures."},
      ].map((item, i) => (
        <section key={i} style={{marginBottom:'25px',background:'#0d0020',padding:'20px',borderRadius:'12px',border:'1px solid #2d1040'}}>
          <h2 style={{fontSize:'16px',fontWeight:'bold',marginBottom:'10px',color:'#9B59B6'}}>❓ {item.q}</h2>
          <p style={{color:'#ccc',lineHeight:'1.7',margin:0,fontSize:'14px'}}>{item.a}</p>
        </section>
      ))}
    </main>
  );
}

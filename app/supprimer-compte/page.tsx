export default function SupprimerCompte() {
  return (
    <main style={{background:'#000',color:'#fff',padding:'60px 40px',maxWidth:'800px',margin:'0 auto',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'10px'}}>Suppression de compte</h1>
      <p style={{color:'#aaa',marginBottom:'40px'}}>Spotlift</p>
      <section style={{marginBottom:'35px',background:'#0d0020',padding:'30px',borderRadius:'20px',border:'1px solid #2d1040'}}>
        <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'15px',color:'#9B59B6'}}>Comment supprimer votre compte</h2>
        <p style={{color:'#ccc',lineHeight:'1.8'}}>Pour demander la suppression de votre compte et de toutes vos donnees, envoyez un email a :</p>
        <p style={{color:'#9B59B6',fontSize:'20px',fontWeight:'bold',margin:'20px 0'}}>contact.spotlift@gmail.com</p>
        <p style={{color:'#ccc',lineHeight:'1.8'}}>Objet : Suppression de compte Spotlift</p>
      </section>
      <section style={{marginBottom:'35px'}}>
        <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'15px',color:'#9B59B6'}}>Donnees supprimees</h2>
        <ul style={{color:'#ccc',lineHeight:'2',paddingLeft:'20px'}}>
          <li>Adresse email</li>
          <li>Historique des pitches generes</li>
          <li>Donnees de profil</li>
          <li>Abonnement actif</li>
        </ul>
      </section>
      <section style={{marginBottom:'35px'}}>
        <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'15px',color:'#9B59B6'}}>Delai de traitement</h2>
        <p style={{color:'#ccc',lineHeight:'1.8'}}>Votre demande sera traitee dans un delai de 30 jours. Vous recevrez une confirmation par email.</p>
      </section>
    </main>
  );
}

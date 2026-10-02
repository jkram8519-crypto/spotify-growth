export default function MentionsLegales() {
  return (
    <main style={{background:'#000',color:'#fff',padding:'60px 40px',maxWidth:'800px',margin:'0 auto',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'10px'}}>Mentions Légales</h1>
      <p style={{color:'#aaa',marginBottom:'40px'}}>Conformément à la loi n°2004-575 du 21 juin 2004</p>

      {[
        {title:'Éditeur du site',text:"Spotlift est édité par Jonathan Ramsamy, entrepreneur individuel (EI)\nNom commercial : Spotlift\nSIRET : 893 726 497 00025\nAdresse : Résidence La Cerisaie, 1 allée Marjolaine, 13013 Marseille, France\nEmail : contact.spotlift@gmail.com"},
        {title:'Directeur de la publication',text:"Jonathan Ramsamy"},
        {title:'Hébergement',text:"Vercel Inc.\n340 Pine Street, Suite 701\nSan Francisco, CA 94104, USA\nSite : https://vercel.com"},
        {title:'Propriété intellectuelle',text:"L'ensemble du contenu de ce site est protégé par le droit d'auteur. Toute reproduction sans autorisation préalable est interdite."},
        {title:'Données personnelles',text:"Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contact : contact.spotlift@gmail.com"},
        {title:'Cookies',text:"Ce site utilise des cookies techniques nécessaires à son fonctionnement, ainsi que des traceurs Google Ads permettant de mesurer l'efficacité de nos campagnes publicitaires."},
      ].map((s, i) => (
        <section key={i} style={{marginBottom:'35px'}}>
          <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'12px',color:'#9B59B6'}}>{s.title}</h2>
          <p style={{color:'#ccc',lineHeight:'1.8',whiteSpace:'pre-line'}}>{s.text}</p>
        </section>
      ))}

      <div style={{borderTop:'1px solid #222',paddingTop:'30px',textAlign:'center'}}>
        <p style={{color:'#aaa'}}>Contact : <a href="mailto:contact.spotlift@gmail.com" style={{color:'#9B59B6'}}>contact.spotlift@gmail.com</a></p>
      </div>
    </main>
  );
}

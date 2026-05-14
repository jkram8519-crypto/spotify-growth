export default function CGV() {
  return (
    <main style={{background:'#000',color:'#fff',padding:'60px 40px',maxWidth:'800px',margin:'0 auto',fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'36px',fontWeight:'bold',marginBottom:'10px'}}>Conditions Générales de Vente</h1>
      <p style={{color:'#aaa',marginBottom:'40px'}}>Dernière mise à jour : Mai 2026</p>

      {[
        {title:'1. Objet',text:"Les présentes CGV régissent l'utilisation de Spotify Growth Optimizer, une plateforme SaaS permettant aux artistes indépendants de développer leur présence sur Spotify grâce à des outils d'intelligence artificielle."},
        {title:'2. Éditeur',text:"Spotify Growth Optimizer est édité par J.K. Ram. Email : j.k.ram8519@gmail.com"},
        {title:'3. Services proposés',text:"Free (0€/mois) : Pitch generator basique, bio generator, release checklist. Pro (9.99€/mois) : Tous les outils IA avancés, playlist finder, release planner. Pro+ (19.99€/mois) : Analytics Spotify, growth AI, marketing automation."},
        {title:'4. Prix et paiement',text:"Les prix sont en euros TTC. Le paiement s'effectue par carte bancaire via Stripe. L'abonnement est renouvelé automatiquement chaque mois jusqu'à résiliation."},
        {title:'5. Résiliation',text:"L'utilisateur peut résilier son abonnement à tout moment. La résiliation prend effet à la fin de la période en cours. Aucun remboursement ne sera effectué pour la période déjà payée."},
        {title:'6. Droit de rétractation',text:"Conformément à la législation européenne, l'utilisateur dispose de 14 jours pour exercer son droit de rétractation. Contact : j.k.ram8519@gmail.com"},
        {title:'7. Données personnelles',text:"Les données personnelles collectées sont utilisées uniquement pour la fourniture du service. Elles ne sont jamais vendues à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, rectification et suppression."},
        {title:'8. Limitation de responsabilité',text:"Spotify Growth Optimizer ne garantit pas de résultats spécifiques en termes de streams ou placements en playlist. Les outils fournis sont des aides à la promotion musicale."},
        {title:'9. Propriété intellectuelle',text:"L'ensemble du contenu de la plateforme est protégé par le droit d'auteur. Toute reproduction sans autorisation est interdite."},
        {title:'10. Droit applicable',text:"Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français seront compétents."},
      ].map((s, i) => (
        <section key={i} style={{marginBottom:'35px'}}>
          <h2 style={{fontSize:'22px',fontWeight:'bold',marginBottom:'12px',color:'#9B59B6'}}>{s.title}</h2>
          <p style={{color:'#ccc',lineHeight:'1.8'}}>{s.text}</p>
        </section>
      ))}

      <div style={{borderTop:'1px solid #222',paddingTop:'30px',textAlign:'center'}}>
        <p style={{color:'#aaa'}}>Contact : <a href="mailto:j.k.ram8519@gmail.com" style={{color:'#9B59B6'}}>j.k.ram8519@gmail.com</a></p>
      </div>
    </main>
  );
}
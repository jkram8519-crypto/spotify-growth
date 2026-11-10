"use client";
import { useState } from "react";
import { supabase } from "../../supabase";

export default function InscriptionPage() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  const handleInscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setErreur("Cette adresse email ne semble pas valide."); return; }
    if (motDePasse.length < 6) { setErreur("Ton mot de passe doit faire au moins 6 caractères."); return; }
    setChargement(true);
    const { error } = await supabase.auth.signUp({ email: email.trim(), password: motDePasse });
    if (error) {
      setErreur(
        /already registered/i.test(error.message)
          ? "Un compte existe déjà avec cette adresse. Connecte-toi."
          : "L'inscription n'a pas abouti. Vérifie ton adresse et réessaie."
      );
      setChargement(false);
      return;
    }
    setMessage("Compte créé ! Redirection…");
    await fetch("/api/welcome-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), name: "" })
    }).catch(() => {});
    await fetch("/api/trial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), source: (() => { try { return localStorage.getItem('spotlift_source') || 'direct'; } catch { return 'direct'; } })() })
    }).catch(() => {});
    setTimeout(async () => {
      const pendingPlan = localStorage.getItem('pendingPlan');
      const pendingBilling = localStorage.getItem('pendingBilling') || 'monthly';
      if (pendingPlan) {
        localStorage.removeItem('pendingPlan');
        localStorage.removeItem('pendingBilling');
        const res = await fetch('/api/checkout', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:pendingPlan,billing:pendingBilling,currentPlan:'Free'})});
        const data = await res.json();
        if(data.url) { window.location.href = data.url; return; }
      }
      // ?conversion=1 déclenche la conversion Google Ads "Inscription" sur le dashboard
      window.location.href = "/dashboard?conversion=1";
    }, 1500);
  };

  const avecGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard?conversion=1` }
    });
  };

  const champ: React.CSSProperties = {width:"100%",background:"#1a0030",border:"1px solid #2d1040",borderRadius:"10px",padding:"12px",color:"#fff",marginBottom:"15px",boxSizing:"border-box",fontSize:"16px"};
  const libelle: React.CSSProperties = {display:"block",color:"#ccc",fontSize:"13px",marginBottom:"6px"};

  return (
    <main style={{minHeight:"100vh",background:"#000",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#0d0020",padding:"40px",borderRadius:"20px",width:"100%",maxWidth:"400px",border:"1px solid #2d1040",margin:"20px"}}>
        <h1 style={{fontSize:"26px",fontWeight:"bold",marginBottom:"8px",textAlign:"center"}}>Crée ton compte gratuit</h1>
        <p style={{color:"#aaa",fontSize:"14px",textAlign:"center",margin:"0 0 26px 0",lineHeight:1.5}}>
          Ton plan de sortie personnalisé t&apos;attend juste après.
        </p>

        <button type="button" onClick={avecGoogle}
          style={{width:'100%',background:'#fff',color:'#333',padding:'14px',borderRadius:'10px',fontWeight:'bold',fontSize:'16px',cursor:'pointer',border:'1px solid #ddd',marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
          <img src="https://www.google.com/favicon.ico" width="20" height="20" alt=""/>
          Continuer avec Google
        </button>
        <div style={{textAlign:'center',marginBottom:'15px',color:'#777',fontSize:'14px'}}>— ou —</div>

        <form onSubmit={handleInscription} noValidate>
          <label htmlFor="email" style={libelle}>Email</label>
          <input id="email" type="email" autoComplete="email" style={champ}
            placeholder="ton@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="mdp" style={libelle}>Mot de passe (6 caractères minimum)</label>
          <input id="mdp" type="password" autoComplete="new-password" style={{...champ,marginBottom:"20px"}}
            value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)}/>
          {erreur && <p role="alert" style={{color:"#e67e80",fontSize:"14px",margin:"0 0 15px 0"}}>{erreur}</p>}
          <button type="submit" disabled={chargement}
            style={{width:"100%",background:"#9B59B6",color:"#fff",padding:"14px",borderRadius:"10px",fontWeight:"bold",fontSize:"16px",cursor:"pointer",border:"none",opacity:chargement?0.7:1}}>
            {chargement ? "Création du compte…" : "Créer mon compte"}
          </button>
        </form>

        <p style={{color:'#888',fontSize:'12px',textAlign:'center',marginTop:'15px',lineHeight:1.6}}>
          🔒 Gratuit · Sans carte bancaire · Essai Pro de 3 jours inclus
        </p>
        {message && <p role="status" style={{textAlign:"center",marginTop:"15px",color:"#1DB954"}}>{message}</p>}
        <p style={{textAlign:"center",marginTop:"20px",color:"#aaa"}}>
          Déjà un compte ?{" "}
          <a href="/login" style={{color:"#c38be0",fontWeight:"bold"}}>Se connecter</a>
        </p>
      </div>
    </main>
  );
}

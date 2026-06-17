"use client";
import { useState } from "react";
import { supabase } from "../../supabase";

export default function InscriptionPage() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [chargement, setChargement] = useState(false);
  const [message, setMessage] = useState("");

  const handleInscription = async () => {
    setChargement(true);
    const { error } = await supabase.auth.signUp({ email, password: motDePasse });
    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Compte cree ! Redirection...");
      fetch("/api/welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: email.split("@")[0] })
      });
      fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
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
        window.location.href = "/dashboard";
      }, 1500);
    }
    setChargement(false);
  };

  return (
    <main style={{minHeight:"100vh",background:"#000",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#0d0020",padding:"40px",borderRadius:"20px",width:"100%",maxWidth:"400px",border:"1px solid #2d1040",margin:"20px"}}>
        <h1 style={{fontSize:"28px",fontWeight:"bold",marginBottom:"30px",textAlign:"center"}}>Inscription</h1>
        <input style={{width:"100%",background:"#1a0030",border:"1px solid #2d1040",borderRadius:"10px",padding:"12px",color:"#fff",marginBottom:"15px",boxSizing:"border-box"}}
          placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input style={{width:"100%",background:"#1a0030",border:"1px solid #2d1040",borderRadius:"10px",padding:"12px",color:"#fff",marginBottom:"20px",boxSizing:"border-box"}}
          placeholder="Mot de passe (min. 6 caracteres)" type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)}/>
        <button style={{width:"100%",background:"#9B59B6",color:"#fff",padding:"14px",borderRadius:"10px",fontWeight:"bold",fontSize:"16px",cursor:"pointer",border:"none"}}
          onClick={handleInscription} disabled={chargement}>
          {chargement ? "Chargement..." : "S'inscrire"}
        </button>
        {message && <p style={{textAlign:"center",marginTop:"15px",color:"#9B59B6"}}>{message}</p>}
        <p style={{textAlign:"center",marginTop:"20px",color:"#aaa"}}>
          Deja un compte ?{" "}
          <a href="/login" style={{color:"#9B59B6",fontWeight:"bold"}}>Se connecter</a>
        </p>
      </div>
    </main>
  );
}

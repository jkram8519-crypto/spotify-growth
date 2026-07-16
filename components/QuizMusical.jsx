'use client';

import { useState, useMemo, useRef } from 'react';

/* -------------------------------------------------------------------------
   QuizMusical — quiz de personnalité musicale pour fans d'artistes indé
   Usage:
     import QuizMusical from '@/components/QuizMusical';
     export default function QuizPage() { return <QuizMusical />; }
   Aucune dépendance externe (pas de Tailwind requis, styles encapsulés).
------------------------------------------------------------------------- */

const PROFILES = {
  D: { emoji: '🔥', name: 'Le Découvreur', desc: "Tu chasses la pépite avant tout le monde. Ton flair musical n'a pas son pareil — les autres découvrent ce que tu écoutais déjà la semaine dernière." },
  F: { emoji: '🎧', name: 'Le Fidèle', desc: "Quand tu aimes un artiste, c'est pour la vie. Tu connais chaque son, chaque parole, chaque interlude caché." },
  E: { emoji: '🌍', name: "L'Éclectique", desc: "Aucune case ne te définit. Ta playlist est un buffet à volonté où tout se mélange, et c'est exactement comme ça que tu l'aimes." },
  S: { emoji: '🎤', name: 'Le Supporter', desc: "T'es la hype à toi tout seul. Sans les gens comme toi, certains artistes indé n'existeraient pas autant." },
  N: { emoji: '🌙', name: "L'Explorateur nocturne", desc: "Ta meilleure musique, tu l'écoutes après minuit. Ambiance planante et sons profonds garantis." },
};

const ORDER = ['D', 'F', 'E', 'S', 'N'];

const QUESTIONS = [
  {
    q: 'Quand tu tombes sur un artiste indé inconnu...',
    opts: [
      ["Tu enquêtes sur tout son catalogue en 10 minutes", 'D'],
      ['Tu l\'ajoutes à tes "artistes qui comptent" et tu reviens souvent', 'F'],
      ['Tu l\'ajoutes à une playlist qui mélange 50 styles différents', 'E'],
      ['Tu lui laisses un commentaire et tu le partages en story', 'S'],
      ['Tu le gardes pour ta session d\'écoute nocturne', 'N'],
    ],
  },
  {
    q: 'Ta playlist dont tu es le plus fier s\'appelle...',
    opts: [
      ['"Pépites avant tout le monde"', 'D'],
      ['"Les titres que j\'écoute depuis 3 ans"', 'F'],
      ['"Aucune logique, juste du bon son"', 'E'],
      ['"Coups de cœur à partager"', 'S'],
      ['"Ambiance minuit"', 'N'],
    ],
  },
  {
    q: 'Un concert d\'artiste indé est annoncé près de chez toi...',
    opts: [
      ['Tu prends la place sans même connaître ses morceaux, à l\'instinct', 'D'],
      ['Tu y vas parce que c\'est TON artiste depuis toujours', 'F'],
      ['Tu y vas surtout pour découvrir un genre que tu ne connais pas', 'E'],
      ['Tu montes un groupe pour y aller et en parler après', 'S'],
      ['Tu vérifies d\'abord si l\'ambiance est plutôt club, tard le soir', 'N'],
    ],
  },
  {
    q: 'Ton rapport à l\'algorithme de recommandation...',
    opts: [
      ['Tu creuses chaque suggestion pour trouver la perle rare', 'D'],
      ['Il te reprogramme toujours les mêmes artistes — tant mieux', 'F'],
      ['Il élargit sans cesse tes goûts, et tu adores ça', 'E'],
      ['Tu préfères les recos de ta communauté à celles d\'un algo', 'S'],
      ['Tu as ta propre playlist nocturne, l\'algo n\'y touche pas', 'N'],
    ],
  },
  {
    q: 'Il est minuit passé, tu écoutes quoi ?',
    opts: [
      ['Un artiste que tu viens tout juste de dénicher', 'D'],
      ['Ton album préféré, celui que tu connais par cœur', 'F'],
      ['Un mix totalement imprévisible', 'E'],
      ['Un son qu\'un ami vient de t\'envoyer', 'S'],
      ['De la deep house / électro planante', 'N'],
    ],
  },
  {
    q: 'Un artiste indé sort un nouveau titre...',
    opts: [
      ['Tu compares direct avec 5 autres sorties similaires', 'D'],
      ['Tu sais déjà que tu l\'écouteras 50 fois cette semaine', 'F'],
      ['Tu l\'ajoutes à ta collection déjà bien fournie et variée', 'E'],
      ['Tu commentes, partages, likes — tu deviens son porte-voix', 'S'],
      ['Tu sens déjà que ce sera pour tes sessions de nuit', 'N'],
    ],
  },
  {
    q: 'Ton pire cauchemar musical...',
    opts: [
      ['Rater LA pépite indé avant tout le monde', 'D'],
      ['Que ton artiste préféré arrête la musique', 'F'],
      ['Écouter la même chose toute une semaine', 'E'],
      ['Que personne ne soutienne les artistes que tu aimes', 'S'],
      ['Devoir écouter de la musique... en plein jour, sans ambiance', 'N'],
    ],
  },
  {
    q: 'En un mot, ta vie de fan de musique indé c\'est...',
    opts: [
      ['Exploration', 'D'],
      ['Fidélité', 'F'],
      ['Éclectisme', 'E'],
      ['Communauté', 'S'],
      ['Nocturne', 'N'],
    ],
  },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildShuffledQuizSet() {
  // Mélange l'ordre des questions ET l'ordre des options de chacune
  return shuffle(QUESTIONS).map((item) => ({ ...item, opts: shuffle(item.opts) }));
}

export default function QuizMusical({ spotliftUrl = 'https://getspotlift.com' }) {
  const [screen, setScreen] = useState('start'); // 'start' | 'question' | 'result'
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ D: 0, F: 0, E: 0, S: 0, N: 0 });
  const [toastVisible, setToastVisible] = useState(false);
  // Jeu de questions mélangé, régénéré à chaque lancement/relance du quiz
  const [quizQuestions, setQuizQuestions] = useState(buildShuffledQuizSet);
  const toastTimer = useRef(null);

  const startQuiz = () => {
    setQuizQuestions(buildShuffledQuizSet());
    setScores({ D: 0, F: 0, E: 0, S: 0, N: 0 });
    setCurrent(0);
    setScreen('question');
  };

  const answer = (profileKey) => {
    setScores((prev) => ({ ...prev, [profileKey]: prev[profileKey] + 1 }));
    if (current + 1 < quizQuestions.length) {
      setCurrent((c) => c + 1);
    } else {
      setScreen('result');
    }
  };

  const topProfileKey = useMemo(() => {
    let top = ORDER[0];
    ORDER.forEach((k) => {
      if (scores[k] > scores[top]) top = k;
    });
    return top;
  }, [scores]);

  const copyProfile = async () => {
    const profile = PROFILES[topProfileKey];
    const text = `${profile.emoji} Je suis ${profile.name} — et toi, quel type d'auditeur indé es-tu ?`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2400);
  };

  const question = quizQuestions[current];

  return (
    <div className="qm-stage">
      <div className="qm-eq-bg" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            style={{
              '--h': `${15 + ((i * 37) % 55)}vh`,
              animationDelay: `${(i % 7) * 0.3}s`,
              animationDuration: `${1.8 + (i % 5) * 0.32}s`,
            }}
          />
        ))}
      </div>

      <div className="qm-card">
        {screen === 'start' && (
          <>
            <div className="qm-eyebrow"><span className="qm-dot" /> Quiz musical</div>
            <h1 className="qm-h1">
              Quel type <span className="qm-accent">d'auditeur indé</span> es-tu ?
            </h1>
            <p className="qm-lede">
              8 questions, 5 profils possibles. Réponds à l'instinct — c'est fait pour être fun, pas pour être juste.
            </p>
            <button className="qm-btn" onClick={startQuiz}>Lancer le quiz →</button>
          </>
        )}

        {screen === 'question' && question && (
          <>
            <div className="qm-track-row">
              <div className="qm-track-label">
                Track {String(current + 1).padStart(2, '0')} / {String(quizQuestions.length).padStart(2, '0')}
              </div>
              <div className="qm-eq-mini">
                {quizQuestions.map((_, i) => (
                  <span key={i} className={i < current ? 'qm-done' : ''} style={{ height: 6 + ((i * 13) % 14) }} />
                ))}
              </div>
            </div>
            <div className="qm-q-text">{question.q}</div>
            <div className="qm-options">
              {question.opts.map(([label, key]) => (
                <button key={label} className="qm-opt" onClick={() => answer(key)}>
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        {screen === 'result' && (() => {
          const profile = PROFILES[topProfileKey];
          return (
            <div className="qm-ticket">
              <div className="qm-perf">
                <div className="qm-perf-circle qm-perf-left" />
                <div className="qm-perf-line" />
                <div className="qm-perf-circle qm-perf-right" />
              </div>
              <div className="qm-result-eyebrow">Ton profil d'auditeur indé</div>
              <div className="qm-result-emoji">{profile.emoji}</div>
              <div className="qm-result-title">{profile.name}</div>
              <p className="qm-result-desc">{profile.desc}</p>
              <div className="qm-breakdown">
                {ORDER.map((k) => (
                  <span key={k} className={`qm-chip ${k === topProfileKey ? 'qm-top' : ''}`}>
                    {PROFILES[k].emoji} {scores[k]}/{quizQuestions.length}
                  </span>
                ))}
              </div>
              <div className="qm-actions">
                <button className="qm-btn" onClick={copyProfile}>Copier mon profil</button>
                <button className="qm-btn qm-btn-ghost" onClick={startQuiz}>Rejouer</button>
              </div>
              <div className="qm-cta-note">
                Toi aussi t'es artiste indé ?{' '}
                <a href={spotliftUrl} target="_blank" rel="noopener noreferrer">Découvre Spotlift</a>
              </div>
            </div>
          );
        })()}
      </div>

      <div className={`qm-toast ${toastVisible ? 'qm-show' : ''}`}>Profil copié — colle-le en story ✨</div>

      <style jsx>{`
        .qm-stage {
          --bg: #12081f;
          --surface: #1e1030;
          --surface-2: #241539;
          --ember: #ff6b35;
          --ember-2: #ffb238;
          --cyan: #3ee6e0;
          --text: #f5efff;
          --muted: #9a8cbf;
          --line: rgba(245, 239, 255, 0.08);

          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
          overflow: hidden;
          background: radial-gradient(ellipse 900px 500px at 15% -10%, rgba(255, 107, 53, 0.16), transparent 60%),
            radial-gradient(ellipse 900px 600px at 90% 110%, rgba(62, 230, 224, 0.1), transparent 60%), var(--bg);
          color: var(--text);
          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
        }
        .qm-stage * { box-sizing: border-box; }

        .qm-eq-bg {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 2vw;
          gap: 1.2vw;
          z-index: 0;
          pointer-events: none;
          opacity: 0.16;
        }
        .qm-eq-bg span {
          flex: 1;
          background: linear-gradient(180deg, var(--ember), var(--cyan));
          border-radius: 3px 3px 0 0;
          animation: qm-pulse 2.4s ease-in-out infinite;
          transform-origin: bottom;
        }
        @keyframes qm-pulse {
          0%, 100% { height: 6vh; }
          50% { height: var(--h, 30vh); }
        }

        .qm-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 560px;
          background: linear-gradient(180deg, var(--surface), var(--surface-2));
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 44px 36px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.02);
          font-family: 'Space Grotesk', 'Manrope', sans-serif;
        }

        .qm-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 12px;
          color: var(--ember-2);
          margin-bottom: 18px;
        }
        .qm-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ember); box-shadow: 0 0 12px var(--ember); }

        .qm-h1 {
          font-weight: 700;
          font-size: clamp(28px, 5vw, 38px);
          line-height: 1.12;
          margin: 0 0 14px;
          letter-spacing: -0.01em;
        }
        .qm-accent {
          background: linear-gradient(90deg, var(--ember), var(--ember-2));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .qm-lede {
          font-family: 'Manrope', sans-serif;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 30px;
          max-width: 42ch;
        }

        .qm-btn {
          appearance: none;
          border: none;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: 15px;
          padding: 16px 22px;
          border-radius: 12px;
          color: #17081a;
          background: linear-gradient(90deg, var(--ember-2), var(--ember));
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.28);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          width: 100%;
        }
        .qm-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(255, 107, 53, 0.38); }
        .qm-btn:active { transform: translateY(0); }
        .qm-btn:focus-visible { outline: 2px solid var(--cyan); outline-offset: 3px; }

        .qm-btn-ghost {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--line);
          box-shadow: none;
          font-weight: 600;
        }
        .qm-btn-ghost:hover { border-color: var(--cyan); box-shadow: 0 0 0 1px var(--cyan) inset; }

        .qm-track-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .qm-track-label { font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cyan); }
        .qm-eq-mini { display: flex; align-items: flex-end; gap: 3px; height: 20px; }
        .qm-eq-mini span { width: 4px; background: var(--line); border-radius: 2px; transition: background 0.3s ease, height 0.3s ease; }
        .qm-eq-mini span.qm-done { background: linear-gradient(180deg, var(--ember-2), var(--ember)); }

        .qm-q-text { font-weight: 700; font-size: clamp(20px, 3.4vw, 24px); line-height: 1.3; margin: 0 0 26px; }

        .qm-options { display: flex; flex-direction: column; gap: 10px; }
        .qm-opt {
          text-align: left;
          appearance: none;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          color: var(--text);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 15px 18px;
          transition: border-color 0.15s ease, background 0.15s ease, transform 0.1s ease;
        }
        .qm-opt:hover { border-color: var(--ember); background: rgba(255, 107, 53, 0.08); transform: translateX(2px); }
        .qm-opt:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }

        .qm-ticket { position: relative; }
        .qm-perf { display: flex; justify-content: space-between; margin: -44px -36px 28px; padding: 0 8px; align-items: flex-start; }
        .qm-perf-line { flex: 1; border-top: 2px dashed rgba(245, 239, 255, 0.15); margin-top: 13px; }
        .qm-perf-circle { width: 26px; height: 26px; background: var(--bg); border-radius: 50%; }
        .qm-perf-left { margin-left: -13px; }
        .qm-perf-right { margin-right: -13px; }

        .qm-result-eyebrow { text-align: center; font-weight: 700; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
        .qm-result-emoji { text-align: center; font-size: 56px; margin: 6px 0 4px; filter: drop-shadow(0 10px 24px rgba(255, 107, 53, 0.35)); }
        .qm-result-title {
          text-align: center;
          font-weight: 700;
          font-size: clamp(24px, 5vw, 30px);
          margin: 0 0 14px;
          background: linear-gradient(90deg, var(--ember-2), var(--cyan));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .qm-result-desc { font-family: 'Manrope', sans-serif; text-align: center; color: var(--muted); font-size: 15px; line-height: 1.6; max-width: 40ch; margin: 0 auto 28px; }

        .qm-breakdown { display: flex; gap: 6px; justify-content: center; margin-bottom: 28px; flex-wrap: wrap; }
        .qm-chip { font-size: 11px; font-weight: 700; padding: 6px 10px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); letter-spacing: 0.02em; }
        .qm-chip.qm-top { color: #17081a; background: linear-gradient(90deg, var(--ember-2), var(--ember)); border-color: transparent; }

        .qm-actions { display: flex; gap: 10px; }

        .qm-cta-note { font-family: 'Manrope', sans-serif; text-align: center; margin-top: 22px; font-size: 12.5px; color: var(--muted); }
        .qm-cta-note :global(a) { color: var(--cyan); text-decoration: none; border-bottom: 1px solid rgba(62, 230, 224, 0.4); }

        .qm-toast {
          position: fixed;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%) translateY(20px);
          background: var(--surface-2);
          border: 1px solid var(--cyan);
          color: var(--text);
          padding: 12px 20px;
          border-radius: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 14px;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.25s ease, transform 0.25s ease;
          z-index: 5;
          pointer-events: none;
        }
        .qm-toast.qm-show { opacity: 1; transform: translateX(-50%) translateY(0); }

        @media (max-width: 480px) {
          .qm-card { padding: 36px 22px; }
          .qm-perf { margin: -36px -22px 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .qm-eq-bg span { animation: none; height: 14vh; }
        }
      `}</style>
    </div>
  );
}

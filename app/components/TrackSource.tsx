'use client';
import { useEffect } from 'react';

// Mémorise d'où vient le visiteur (Google Ads, utm, site référent) pour l'enregistrer à l'inscription.
// On ne remplace la valeur que par une source connue : une visite "directe" n'efface pas une source pub.
export default function TrackSource() {
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      let source = '';
      if (p.get('gclid') || p.get('gbraid') || p.get('wbraid')) {
        source = 'google_ads' + (p.get('utm_campaign') ? '/' + p.get('utm_campaign') : '');
      } else if (p.get('utm_source')) {
        source = [p.get('utm_source'), p.get('utm_medium'), p.get('utm_campaign')].filter(Boolean).join('/');
      } else if (document.referrer) {
        const ref = new URL(document.referrer).hostname.replace(/^www\./, '');
        const self = window.location.hostname.replace(/^www\./, '');
        if (ref && ref !== self) source = 'ref:' + ref;
      }
      if (source) localStorage.setItem('spotlift_source', source.slice(0, 120));
    } catch {
      // localStorage indisponible (navigation privée...) : on garde 'direct'
    }
  }, []);
  return null;
}

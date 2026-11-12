import { redirect } from 'next/navigation';

// Une seule offre payante depuis novembre 2026 : tout ce qui était Pro+ est inclus dans Pro.
export default function ProPlusPage() {
  redirect('/pro');
}

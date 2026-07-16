import type { Metadata } from 'next';
import QuizMusical from '@/components/QuizMusical';

export const metadata: Metadata = {
  title: 'Quel type d\'auditeur indé es-tu ? — Spotlift',
  description: 'Un quiz musical fun pour découvrir ton profil d\'auditeur indé. Découvre, partage, et fais découvrir Spotlift à ta communauté.',
};

export default function QuizPage() {
  return <QuizMusical />;
}

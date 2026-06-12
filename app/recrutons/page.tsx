import type { Metadata } from 'next';
import RecrutonsPage from './RecrutonsPage';

export const metadata: Metadata = {
  title: 'On recrute',
  description: 'Rejoins l\'équipe Mood2Fit.',
  alternates: { canonical: 'https://www.mood2fit.com/recrutons' },
};

export default function Page() {
  return <RecrutonsPage />;
}
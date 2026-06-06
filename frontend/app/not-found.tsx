import type { Metadata } from 'next';
import { NotFoundScreen } from '@/components/errors/NotFoundScreen';

export const metadata: Metadata = {
  title: 'Page not found | Earnio',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return <NotFoundScreen />;
}

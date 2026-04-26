import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export function useTenant() {
  const { schoolSlug: paramSlug } = useParams<{ schoolSlug: string }>();
  const { schoolSlug: storeSlug } = useAuthStore();
  const schoolSlug = paramSlug ?? storeSlug ?? '';

  return { schoolSlug };
}

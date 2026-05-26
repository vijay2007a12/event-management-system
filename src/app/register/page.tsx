'use client';

import Layout from '@/components/Layout';
import RegistrationForm from '@/components/registration/RegistrationForm';
import { useSearchParams } from 'next/navigation';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams?.get('eventId') || undefined;
  const city = searchParams?.get('city') || undefined;
  const hallId = searchParams?.get('hallId') || undefined;

  return (
    <Layout>
      <RegistrationForm eventId={eventId} city={city} hallId={hallId} />
    </Layout>
  );
}

'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      router.replace('/Data');      
    }
  });

  return (
    <div>
      Sign in to view data.
    </div>
  );
};

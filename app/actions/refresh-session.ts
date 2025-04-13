'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { authOptions } from '@/lib/authOptions';

export async function refreshSession() {
  'use server'; // Pastikan ini adalah server action

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('No active session found');
  }

  // 🔥 Paksa refresh cache untuk memastikan data terbaru
  revalidatePath('/');

  return session;
}

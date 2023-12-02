'use client';

import { CategoriesList } from '~/components';

export default function Home() {
  console.log(new Date())
  return (
    <main className="grid">
      <CategoriesList />
    </main>
  )
}

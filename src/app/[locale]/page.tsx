import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  const t = await  getTranslations({locale})
  return {
    title: t('home.title'),
  };
}

export default function Page() {
  return <div></div>
}

import { RegisterTitle } from '@/widgets';
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("pagesTitle.registrationTitle"),
  };
}

export default function Page() {
   return (
    <div className="flex w-full h-screen items-center justify-center p-5">
      <Suspense fallback={null}>
        <RegisterTitle />
      </Suspense>
    </div>
  );
}

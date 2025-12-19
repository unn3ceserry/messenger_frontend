import { TermsOfUse } from '@/widgets'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("pagesTitle.termsOfUse"),
  };
}


export default function Page() {
  return (
    <div className="min-h-screen w-full bg-white flex items-start justify-center select-none">
      <TermsOfUse/>
    </div>
  )
}

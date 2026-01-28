import { Suspense } from "react";
import { HeroTitle } from "@/widgets";
import { Spinner } from "@/shared";

export default function Page() {
  return (
    <div className="flex w-full h-screen items-center justify-center p-5">
      <Suspense fallback={<Spinner />}>
        <HeroTitle />
      </Suspense>
    </div>
  );
}

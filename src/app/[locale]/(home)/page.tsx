import { Suspense } from "react";
import HeroTitle from "./HeroTitle";

export default function Page() {
  return (
    <div className="flex w-full h-screen items-center justify-center p-5">
      {/* сделать тут лоадер в будущем */}
      <Suspense fallback={null} >
        <HeroTitle />
      </Suspense>
    </div>
  );
}

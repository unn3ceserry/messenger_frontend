"use client";

import TermOfUseNavbar from "./elements/TermOfUseNavbar";
import TermOfUseText from "./elements/TermOfUseText";

const TermsOfUse = () => {
  return (
    <div className="flex w-full max-w-400 items-start justify-center gap-5">
      <TermOfUseNavbar/>
      <div className="hidden lg:block w-0.5 bg-black/10 self-stretch" />
      <TermOfUseText />
    </div>
  );
};

export default TermsOfUse;

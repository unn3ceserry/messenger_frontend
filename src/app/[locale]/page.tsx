import { GlassReactangle } from "@/shared";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      {/* <GlassReactangle
        displacementScale={70}
        blurAmount={0.01}
        cornerRadius={110}
        className="ring ring-accent/15"
      >
        <input
          type="text"
          className="p-3 text-text/50 text-[.8rem]"
          placeholder="Enther your phone"
        ></input>
      </GlassReactangle> */}
    </div>
  );
}

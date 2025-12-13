"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared";
import { configApp } from "@/app/config";
import { useParams, useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const HeroTitle = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div data-aos="zoom-out" className="flex flex-col items-start justify-center gap-5 w-full max-w-100">
      <div className="flex flex-col items-start justify-center gap-1">
        <h1 className="text-2xl text-white">{configApp.NAME()}  —</h1>
        <p className="text-white text-[.8rem]">{t("home.heroDesc")}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <Button
          onClick={() => router.push(`/${params.locale}/auth`)}
          label={t("buttons.buttonSignIn")}
          className="w-full p-2.5"
        />
        <button
          onClick={() => router.push(`/${params.locale}/register`)}
          className="bg-rect-bg ring ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 backdrop-blur-xl rounded-xl flex p-2.5 items-center justify-center w-full"
        >
          {t("buttons.buttonIHaveAccount")}
        </button>
      </div>
    </div>
  );
};

export default HeroTitle;

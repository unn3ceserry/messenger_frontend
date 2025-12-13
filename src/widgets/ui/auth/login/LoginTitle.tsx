"use client";

import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import LoginFormNumber from "./elements/LoginFormNumber";

const LoginTitle = () => {
  const t = useTranslations();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div
      data-aos="zoom-out"
      className="flex flex-col items-start justify-center gap-5 w-full max-w-100"
    >
      <div className="flex flex-col items-start justify-center gap-1">
        <h1 className="text-2xl text-white">{t("auth.title")}</h1>
        <p className="text-white text-[.8rem]">{t("auth.desc")}</p>
      </div>

      {/* form auth */}
      <LoginFormNumber/>
    </div>
  );
};

export default LoginTitle;

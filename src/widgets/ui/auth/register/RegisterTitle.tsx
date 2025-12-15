"use client";

import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { RegisterFormNumber } from "@/features";
import CompleteProfile from "../../complete/CompleteProfile";

const RegisterTitle = () => {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      {isVisible ? (
        <CompleteProfile />
      ) : (
        <div
          data-aos="zoom-out"
          className="flex flex-col items-start justify-center gap-5 w-full max-w-100"
        >
          <div className="flex flex-col items-start justify-center gap-1">
            <h1 className="text-2xl text-white">{t("register.title")}</h1>
            <p className="text-white text-[.8rem]">{t("register.desc")}</p>
          </div>

          {/* form auth */}
          <RegisterFormNumber setIsVisible={setIsVisible} />
        </div>
      )}
    </>
  );
};

export default RegisterTitle;

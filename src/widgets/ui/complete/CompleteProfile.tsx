"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { CompletePane, handleSetCompleteData } from "@/features";
import { COMPLETE_CONFIG } from "@/widgets";
import { CompleteModal } from "@/features";
import { Button } from "@/shared";
import { useAppSelector } from "@/app";

const CompleteProfile = () => {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();

  const [whoVisible, setWhoVisible] = useState<
    "email" | "birthday" | "password" | null
  >(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const getData = useAppSelector((state) => state.userCompleteData.data);

  const handleSave = async () => {
    await handleSetCompleteData({
      birthday: getData.birthday,
      cloudPassword: getData.password,
      email: getData.email,
    });
  };

  return (
    <div
      data-aos="zoom-out"
      className="flex flex-col items-center justify-center bg-black/10 rounded-4xl w-full max-w-110 p-10 gap-10 backdrop-blur-xl"
    >
      <header className="flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-white text-[1.55rem]">
          {t("profileComplete.title")}
        </h1>
        <p className="text-[0.75rem] text-text/50 max-w-90">
          {t("profileComplete.desc")}
        </p>
      </header>

      {!whoVisible ? (
        <>
          {/* main */}
          <main className="flex flex-col items-center justify-center w-full gap-6">
            {COMPLETE_CONFIG.map((el, i) => (
              <CompletePane
                key={i}
                setWhoVisible={setWhoVisible}
                title={el.title}
                desc={el.desc}
                icon={el.icon}
                tag={el.tag}
              />
            ))}
          </main>

          <div className="flex flex-col gap-4 w-full">
            <Button
              onClick={async () => {
                await handleSave();
                router.replace(`/${params.locale}/c`);
              }}
              label={t("buttons.buttonContinue")}
              type="submit"
              className="p-2.5"
            />
            <button
              onClick={() => router.replace(`/${params.locale}/c`)}
              className="bg-rect-bg ring-2 ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 backdrop-blur-xl rounded-xl flex p-2.5 items-center justify-center w-full"
            >
              {t("buttons.buttonSkip")}
            </button>
          </div>
        </>
      ) : (
        <CompleteModal setWhoVisible={setWhoVisible} whoVisible={whoVisible} />
      )}
    </div>
  );
};

export default CompleteProfile;

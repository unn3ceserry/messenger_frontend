"use client";

import { SignUpType } from "@/entities";
import { handleRegisterUser, schemaSignUp } from "@/features";
import {
  Button,
  DefaultInput,
  isErrorWithMessageAndType,
  OTPInput,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterFormNumber = () => {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations();

  const [whoVisible, setWhoVisible] = useState<"code" | "info" | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<SignUpType>({
    resolver: zodResolver(schemaSignUp),
  });

  const onSubmit = async (data: SignUpType) => {
    try {
      await handleRegisterUser({
        number: data.number,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        code: data.code,
      });
      router.replace(`/${params.locale}/c`);
    } catch (error) {
      if (isErrorWithMessageAndType(error)) {
        if (error.data.type === "NON_CODE") {
          setWhoVisible("code");
        } else if (error.data.type === 'NON_INFO') {
          setWhoVisible("info");
        }
      }
    }
  };
  const code = watch("code");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-5"
    >
      {!whoVisible ? (
        <DefaultInput
          {...register("number", { required: true })}
          placeholder={t("auth.phoneInput")}
          type="number"
          icon={
            <Image alt="mobile" src={"/mobile.svg"} width={23} height={23} />
          }
        />
      ) : whoVisible === "code" ? (
        <OTPInput
          value={code}
          onChange={(v) => setValue("code", v.toUpperCase())}
          numInputs={6}
          placeholder="1A2B3C"
        />
      ) : (
        <>
          <DefaultInput
            {...register("username")}
            placeholder={t("register.information.usernameInput")}
            type="text"
            icon={
              <Image alt="mobile" src={"/tag-user.svg"} width={23} height={23} />
            }
          />
          <DefaultInput
            {...register("firstName")}
            placeholder={t("register.information.firstNameInput")}
            type="text"
            icon={
              <Image alt="mobile" src={"/tag-user.svg"} width={23} height={23} />
            }
          />
          <DefaultInput
            {...register("lastName")}
            placeholder={t("register.information.lastNameInput")}
            type="text"
            icon={
              <Image alt="mobile" src={"/tag-user.svg"} width={23} height={23} />
            }
          />
        </>
      )}

      {/* buttons */}
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <Button
          type="submit"
          label={
            !whoVisible
              ? t("buttons.buttonSendCode")
              : t("buttons.buttonContinue")
          }
          className="w-full p-2.5"
        />
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-rect-bg ring ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 backdrop-blur-xl rounded-xl flex p-2.5 items-center justify-center w-full"
        >
          {t("buttons.buttonBack")}
        </button>
      </div>
    </form>
  );
};

export default RegisterFormNumber;

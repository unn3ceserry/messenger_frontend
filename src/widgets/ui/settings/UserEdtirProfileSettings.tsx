"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { userApi } from "@/entities";

import UserEdtirProfileSettingsHeader from "./elements/editprofile/UserEdtirProfileSettingsHeader";
import UserEdtirProfileSettingsChooseAvatar from "./elements/editprofile/UserEdtirProfileSettingsChooseAvatar";
import UserEdtirProfileSettingsChangeNames from "./elements/editprofile/UserEdtirProfileSettingsChangeNames";
import UserEdtirProfileSettingsChangeUsername from "./elements/editprofile/UserEdtirProfileSettingsChangeUsername";
import {
  isErrorWithMessage,
  isErrorWithMessageAndType,
  Notification,
} from "@/shared";
import UserEdtirProfileSettingsEditBio from "./elements/editprofile/UserEdtirProfileSettingsEditBio";
import { useProfileForm } from "./elements/editprofile/useProfileForm";
import UserEdtirProfileSettingsSetBirthday from "./elements/editprofile/UserEdtirProfileSettingsSetBirthday";

const UserEdtirProfileSettings = () => {
  const { data, isLoading } = userApi.useGetMeQuery();

  const [setName] = userApi.useSetNameMutation();
  const [setUsername] = userApi.useChangeUsernameMutation();
  const [setBio] = userApi.useSetBioMutation();
  const [setBirthday] = userApi.useSetBirthdayMutation();

  const { form, dirty, onChange, setDirty, isDirty } = useProfileForm({
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    username: data?.username ?? "",
    bio: data?.bio ?? "",
    birthday: data?.birthday?.toString() ?? ''
  });

  if (isLoading || !data) return null;

  const handleSave = async () => {
    try {
      if (dirty.firstName || dirty.lastName) {
        await setName({
          firstname: form.firstName,
          lastname: form.lastName,
        }).unwrap();
      }
      if (dirty.username) {
        await setUsername(form.username).unwrap();
      }
      if (dirty.bio) {
        await setBio(form.bio ?? "").unwrap();
      }
      if (dirty.birthday) {
        await setBirthday(form.birthday ?? "").unwrap();
      }
    } catch (error: unknown) {
      if (isErrorWithMessageAndType(error)) {
        Notification(error.data.message);
      } else if (isErrorWithMessage(error)) {
        const msg = Array.isArray((error as any).data?.message ?? error.message)
          ? ((error as any).data?.message ?? error.message)[0]
          : (error as any).data?.message ?? error.message;
        Notification(msg);
      }
    }

    setDirty({
      firstName: false,
      lastName: false,
      username: false,
      bio: false,
      birthday: false,
    });
  };

  return (
    <div className="z-1233 flex flex-col items-center justify-start gap-5 h-screen overflow-y-auto text-white scrollbar-thin w-full relative">
      <motion.div
        initial={{ opacity: 0, x: -300, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center"
      >
        <UserEdtirProfileSettingsHeader />

        <div className="w-full flex flex-col items-center gap-5 pt-3 px-2">
          <UserEdtirProfileSettingsChooseAvatar
            size={130}
            avatar={data.avatars[data.avatars.length - 1]}
          />

          <UserEdtirProfileSettingsChangeNames
            firstName={form.firstName}
            lastName={form.lastName}
            onChange={(v) => {
              if (v.firstName !== undefined) onChange("firstName", v.firstName);
              if (v.lastName !== undefined) onChange("lastName", v.lastName);
            }}
          />

          <hr className="w-full border-3 border-black/15" />

          <UserEdtirProfileSettingsChangeUsername
            username={form.username}
            onChange={(v) => {
              if (v !== undefined) onChange("username", v);
            }}
          />

          <hr className="w-full border-3 border-black/15" />

          <UserEdtirProfileSettingsEditBio
            bio={form.bio}
            onChange={(v) => {
              if (v !== undefined) onChange("bio", v);
            }}
          />

          <hr className="w-full border-3 border-black/15" />

          <UserEdtirProfileSettingsSetBirthday 
            birthday={form.birthday}
            onChange={(v) => {
              if (v !== undefined) onChange("birthday", v);
            }}
            />
        </div>
      </motion.div>
      <AnimatePresence>
        {isDirty && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={handleSave}
            className="absolute bottom-5 right-5 p-3 bg-accent rounded-full cursor-pointer"
          >
            <Check size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserEdtirProfileSettings;

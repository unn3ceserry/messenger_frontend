"use client";

import { motion } from "framer-motion";
import { handleSaveDataEditProfile, UserType } from "@/entities";

import { ChooseAvatar } from "./ChooseAvatar";
import { ChangeNames } from "./ChangeNames";
import { ChangeUsername } from "./ChangeUsername";
import { EditBio } from "./EditBio";
import { useProfileForm } from "../../../model";
import { SetBirthday } from "./SetBirthday";
import { CirclePopup, UserSettingsHeaderConstructor } from "@/shared";
import { FC } from "react";

interface Props {
  data: UserType;
}

const UserEditorProfileSettings: FC<Props> = ({ data }) => {
  const { form, dirty, onChange, setDirty, isDirty } = useProfileForm({
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    username: data?.username ?? "",
    bio: data?.bio ?? "",
    birthday: data?.birthday?.toString() ?? "",
  });

  const handleSave = async () => {
    await handleSaveDataEditProfile(dirty, form, setDirty);
  };

  return (
    <div className="flex flex-col items-center justify-start gap-5 h-screen overflow-y-auto text-eazye@gmail.com scrollbar-thin w-full">
      <motion.div
        initial={{ opacity: 0, x: -300, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center"
      >
        <UserSettingsHeaderConstructor
          backUI={"userSettings"}
          title="settings.editProfileSettings.title"
          typeHeader="default"
        />
        <div className="w-full flex flex-col items-center gap-5 pt-3 px-2 relative">
          <ChooseAvatar
            size={130}
            avatar={data.avatars[data.avatars.length - 1]}
          />

          <ChangeNames
            firstName={form.firstName}
            lastName={form.lastName}
            onChange={(v) => {
              if (v.firstName !== undefined) onChange("firstName", v.firstName);
              if (v.lastName !== undefined) onChange("lastName", v.lastName);
            }}
          />

          <hr className="w-full border-3 border-black/5" />

          <ChangeUsername
            username={form.username}
            onChange={(v) => {
              if (v !== undefined) onChange("username", v);
            }}
          />

          <hr className="w-full border-3 border-black/5" />

          <EditBio
            bio={form.bio}
            onChange={(v) => {
              if (v !== undefined) onChange("bio", v);
            }}
          />

          <hr className="w-full border-3 border-black/5" />

          <SetBirthday
            birthday={form.birthday}
            onChange={(v) => {
              if (v !== undefined) onChange("birthday", v);
            }}
          />
        </div>
      </motion.div>

      <div className="sticky bottom-5 w-full px-5">
        <CirclePopup isDirty={isDirty} onClick={handleSave} />
      </div>
    </div>
  );
};

export default UserEditorProfileSettings;

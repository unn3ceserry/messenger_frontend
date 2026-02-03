"use client";

import { RenderAvatarElement, Spinner, useDebounce } from "@/shared";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { userApi } from "../../api";
import { useTranslations } from "next-intl";

interface Props {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const SearchUsers: FC<Props> = ({ searchText }) => {
  const debouncedSearchText = useDebounce(searchText, 500);
  const [trigger, { isLoading, data }] = userApi.useLazySearchUserQuery();
  const t = useTranslations();

  useEffect(() => {
    if (!debouncedSearchText) return;

    trigger(debouncedSearchText);
  }, [debouncedSearchText, trigger]);

  if (isLoading) return <Spinner />;

  return (
    <div className="z-1233 flex flex-col items-center justify-start gap-5 h-screen overflow-y-auto text-default-text-color scrollbar-thin w-full">
      {data?.length ? (
        <div className="flex flex-col items-start justify-center w-full gap-3 px-3 text-icons-color">
          <p className="font-medium">{t('searchUsers.globalSearch')}:</p>
          <div className="flex flex-col w-full items-center justify-center">
            {data.map((data) => (
              <div
                key={data.id}
                className="flex items-center justify-center w-full hover:bg-checkbox-hover rounded-2xl p-3 cursor-pointer gap-5 text-default-text-color"
              >
                <RenderAvatarElement
                  hasAvatar={!!data.avatars?.length}
                  size={55}
                  avatar={
                    data.avatars ? data.avatars[data.avatars.length - 1] : ""
                  }
                />
                <div className="flex flex-col items-start justify-center w-full">
                  <p className="text-[1.1rem]">
                    {data.firstName} {data.lastName}
                  </p>
                  <p className="text-icons-color text-[.9rem]">
                    @{data.username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : <p className="text-icons-color px-3">{t('searchUsers.noResult')}</p>}
    </div>
  );
};

export default SearchUsers;

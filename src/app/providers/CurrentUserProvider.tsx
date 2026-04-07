"use client";

import { setMyData, userApi } from "@/entities";
import { useAppDispatch } from "../store";
import { FC, ReactNode, useEffect, useState } from "react";
import { Spinner } from "@/shared";

interface Props {
  children: ReactNode;
}

const CurrentUserProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = userApi.useGetMeQuery();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (data?.id) {
      dispatch(setMyData({ id: data.id, blockedUsers: data.blockedUsers }));
      setReady(true);
    }
  }, [data, dispatch]);

  if (isLoading || !ready) return <Spinner />;

  return <>{children}</>;
};

export default CurrentUserProvider;

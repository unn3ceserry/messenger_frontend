import { describe, it, expect } from "vitest";
import {
  initialState,
  closeOtherProfile,
  getOtherProfileStatus,
  setOpenComponentOtherUsersProfile,
  usersProfileStastusReducer,
} from "../usersProfileStastusSlice";
import { makeStore, RootState } from "@/app";

describe("usersProfileStastusSlice", () => {
  it("should return the initial state", () => {
    expect(usersProfileStastusReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
    expect(
      usersProfileStastusReducer(undefined, { type: "unknown" }),
    ).not.toBeNull();
    expect(
      usersProfileStastusReducer(undefined, { type: "unknown" }),
    ).toBeDefined();
  });
  it("should return openComponent:userProfile and username: nestxx", () => {
    const action = setOpenComponentOtherUsersProfile({
      openComponent: "userProfile",
      username: "nestxx",
    });
    const nextState = usersProfileStastusReducer(undefined, action);

    expect(nextState).toEqual({
      username: "nestxx",
      openComponent: "userProfile",
    });

    expect(nextState).not.toBeNull();
    expect(nextState).toBeDefined();
  });
  it("should return openComponent:editContact and username: nestxx", () => {
    const action = setOpenComponentOtherUsersProfile({
      openComponent: "editContact",
      username: "nestxx",
    });
    const nextState = usersProfileStastusReducer(undefined, action);

    expect(nextState).toEqual({
      username: "nestxx",
      openComponent: "editContact",
    });

    expect(nextState).not.toBeNull();
    expect(nextState).toBeDefined();
  });
  it("should return openComponent:editContact and username is empty", () => {
    const action = setOpenComponentOtherUsersProfile({
      openComponent: "editContact",
      username: "",
    });
    const nextState = usersProfileStastusReducer(undefined, action);

    expect(nextState).toEqual({
      username: "",
      openComponent: "editContact",
    });

    expect(nextState).not.toBeNull();
    expect(nextState).toBeDefined();
  });
  it("should return getOtherProfileStatus", () => {
    const profile = getOtherProfileStatus({
      usersProfileStastus: {
        openComponent: "editContact",
        username: "nestxx",
      },
    } as unknown as RootState);

    expect(profile).toEqual({
      username: "nestxx",
      openComponent: "editContact",
    });

    expect(profile).not.toBeNull();
    expect(profile.openComponent).not.toBeNull();
    expect(profile).toBeDefined();
  });
});

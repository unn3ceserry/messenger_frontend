import { describe, it, expect } from "vitest";
import {
  initialState,
  closeAll,
  userUiReducer,
  openComponent,
} from "../userUiSlice";

describe("userUiSlice", () => {
  it("should return the initial state", () => {
    expect(userUiReducer(undefined, { type: "unknown" })).toEqual(initialState);
    expect(userUiReducer(undefined, { type: "unknown" })).not.toBeNull();
    expect(userUiReducer(undefined, { type: "unknown" })).toBeDefined();
  });
  it("should return myProfile", () => {
    const action = openComponent("myProfile");
    const nextState = userUiReducer(undefined, action);

    expect(nextState).toEqual({
      openComponent: "myProfile",
    });

    expect(nextState.openComponent).not.toBeNull();
    expect(nextState).toBeDefined();
  });

  it("should return userSettingsLanguage", () => {
    const action = openComponent("userSettingsLanguage");
    const nextState = userUiReducer(undefined, action);

    expect(nextState).toEqual({
      openComponent: "userSettingsLanguage",
    });

    expect(nextState.openComponent).not.toBeNull();
    expect(nextState).toBeDefined();
  });

  it("should return userEmail", () => {
    const action = openComponent("userEmail");
    const nextState = userUiReducer(undefined, action);

    expect(nextState).toEqual({
      openComponent: "userEmail",
    });

    expect(nextState.openComponent).not.toBeNull();
    expect(nextState).toBeDefined();
  });

  it("should return null", () => {
    const action = closeAll();
    const nextState = userUiReducer(undefined, action);

    expect(nextState).toEqual({
      openComponent: null,
    });

    expect(nextState.openComponent).toBeNull();
    expect(nextState).toBeDefined();
  });
});

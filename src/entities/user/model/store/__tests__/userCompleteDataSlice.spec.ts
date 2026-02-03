import { describe, it, expect } from "vitest";
import {
  initialState,
  setCompleteData,
  userCompleteDataReducer,
} from "../userCompleteDataSlice";

describe("userCompleteDataSlice", () => {
  it("should return the initial state", () => {
    expect(userCompleteDataReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
    expect(userCompleteDataReducer(undefined, { type: "unknown" })).not.toBeNull();
    expect(userCompleteDataReducer(undefined, { type: "unknown" })).toBeDefined();
  });
  it("should return the email", () => {
    const previousState = initialState;
    const action = setCompleteData({ data: "email@gmail.com", field: "email" });
    const nextState = userCompleteDataReducer(previousState, action);

    expect(nextState).toEqual({
      data: {
        email: "email@gmail.com",
        birthday: undefined,
        password: undefined,
      },
    });

    expect(nextState).not.toBeNull();
    expect(nextState).toBeDefined();
  });

  it("should return the password", () => {
    const previousState = initialState;
    const action = setCompleteData({ data: "123123123", field: "password" });
    const nextState = userCompleteDataReducer(previousState, action);

    expect(nextState).toEqual({
      data: {
        email: undefined,
        birthday: undefined,
        password: "123123123",
      },
    });
    expect(nextState).not.toBeNull();
    expect(nextState).toBeDefined();
  });

  it("should return the birthday", () => {
    const previousState = initialState;
    const action = setCompleteData({ data: "11.11.2007", field: "birthday" });
    const nextState = userCompleteDataReducer(previousState, action);

    expect(nextState).toEqual({
      data: {
        email: undefined,
        password: undefined,
        birthday: "11.11.2007",
      },
    });
  });

  it("should return full data", () => {
    const previousState = initialState;
    const actionOne = setCompleteData({
      data: "11.11.2007",
      field: "birthday",
    });
    const actionTwo = setCompleteData({ data: "123123123", field: "password" });
    const actionThree = setCompleteData({
      data: "email@gmail.com",
      field: "email",
    });
    const firstState = userCompleteDataReducer(previousState, actionOne);
    const secondState = userCompleteDataReducer(firstState, actionTwo);
    const thirdState = userCompleteDataReducer(secondState, actionThree);

    expect(thirdState).toEqual({
      data: {
        email: "email@gmail.com",
        password: "123123123",
        birthday: "11.11.2007",
      },
    });
    expect(thirdState).not.toBeNull();
    expect(thirdState).toBeDefined();
  });
});

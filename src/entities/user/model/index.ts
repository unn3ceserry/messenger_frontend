export type {
  FindUserType,
  UserCompleteData,
  UserType,
} from "./types/userTypes";

export {
  WhoCanSeen,
  VisibilityField,
  WhoCanSeeLabels,
} from "./types/userTypes";

export {
  userCompleteDataReducer,
  setCompleteData,
  userCompleteDataSlice,
  type IUserCompleteData,
} from "./store/userCompleteDataSlice";

export {
  userUiSlice,
  userUiReducer,
  openComponent,
  selectOpenComponent,
  closeAll,
  type IIsOpenUIComponent,
} from "./store/userUiSlice";

export {
  setOpenComponentOtherUsersProfile,
  getOtherProfileStatus,
  usersProfileStastusReducer,
  usersProfileStastusSlice,
  closeOtherProfile,
} from "./store/usersProfileStastusSlice";

export {
  getListIgnoredUsers,
  ignoredUsersReducer,
  ignoreUser,
  unignoreUser,
  ignoredUsersSlice,
} from "./store/ignoredUsersSlice";

export {
  getMyData,
  myDataReducer,
  myDataSlice,
  setMyData,
} from "./store/myDataSlice";

export { handleSaveDataEditProfile } from "./handlers/handleSaveDataEditProfile";
export { handleSetPassword } from "./handlers/handleSetPassword";
export { handleSetEmail } from "./handlers/handleSetEmail";
export { handleChangeEmail } from "./handlers/handleChangeEmail";

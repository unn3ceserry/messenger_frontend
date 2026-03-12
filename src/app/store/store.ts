import { chatsReducer, ignoredUsersReducer, myDataReducer, userCompleteDataReducer, usersProfileStastusReducer, userThemeReducer, userUiReducer  } from "@/entities";
import { useResizingReducer } from "@/features";
import { mainApi } from "@/shared";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  myData: myDataReducer,
  ignoredUsers: ignoredUsersReducer,
  chats: chatsReducer,
  userUiOpenComponent: userUiReducer,
  userCompleteData: userCompleteDataReducer,
  usersProfileStastus: usersProfileStastusReducer,
  userTheme: userThemeReducer,
  resizing: useResizingReducer,
  [mainApi.reducerPath]: mainApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["resizing", 'userTheme', 'ignoredUsers'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["chats.dropFiles"],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,  "chats/setDropFiles", "chats/setDropFile", "chats/removeDropFile"],
      },
    }).concat(mainApi.middleware),
});

export const persistor = persistStore(makeStore)

export type AppStore = typeof makeStore;
export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<AppStore>();

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  classesReducer,
  sessionsTeacherReducer,
  studentsReducer,
  subjectsReducer,
  teachersReducer,
  userReducer,
} from "./CreateSlices";

import { combineReducers } from "redux";

// All reducers
const reducers = combineReducers({
  user: userReducer,
  students: studentsReducer,
  teachers: teachersReducer,
  subjects: subjectsReducer,
  classes: classesReducer,
  sessionsTeacher: sessionsTeacherReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist 'user' state, exclude others
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const StoreApp = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(StoreApp);

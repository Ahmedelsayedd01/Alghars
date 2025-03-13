import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SessionsSec,
  ScheduleSessions,
  Students,
  Subscriptions,
  Teachers,
} from "../types";

const initialUserState: { data: { role: string } | null } = {
  data: null,
};
const initialStudentsState: { data: Students[] } = {
  data: [],
};
const initialTeachersState: { data: Teachers[] } = {
  data: [],
};
const initialSubscriptionsState: { data: Subscriptions[] } = {
  data: [],
};
const initialSessionsSecState: { data: SessionsSec[] } = {
  data: [],
};

const initialSessionsTeacerState: { data: ScheduleSessions[] } = {
  data: [],
};

/* User */
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    logOut: (state) => {
      state.data = null;
    },
  },
});
/* Students */
const studentsSlice = createSlice({
  name: "students",
  initialState: initialStudentsState,
  reducers: {
    setStudentsStore: (state, action) => {
      state.data = action.payload;
    },
    removeStudent: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (student: { id: number }) => student.id !== action.payload
      );
    },
  },
});
/* Teachers */
const teachersSlice = createSlice({
  name: "teachers",
  initialState: initialTeachersState,
  reducers: {
    setTeachersStore: (state, action) => {
      state.data = action.payload;
    },
    removeTeacher: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (teacher: { id: number }) => teacher.id !== action.payload
      );
    },
  },
});
/* SessionsSec */
const sessionsSecSlice = createSlice({
  name: "sessionsSec",
  initialState: initialSessionsSecState,
  reducers: {
    setSessionsSec: (state, action) => {
      state.data = action.payload;
    },

    removeSessions: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (session: { id: number }) => session.id !== action.payload
      );
    },
  },
});
/* Subscriptions */
const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: initialSubscriptionsState,
  reducers: {
    setSubscriptionsStore: (state, action) => {
      state.data = action.payload;
    },
    removePackage: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (pac: { id: number }) => pac.id !== action.payload
      );
    },
  },
});
/* Sessions Teacher */
const sessionTeacherSlice = createSlice({
  name: "sessionsTeacher",
  initialState: initialSessionsTeacerState,
  reducers: {
    setSessionsTeacher: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { login, logOut } = userSlice.actions;
export const { setStudentsStore, removeStudent } = studentsSlice.actions;
export const { setTeachersStore, removeTeacher } = teachersSlice.actions;
export const { setSubscriptionsStore, removePackage } =
  subscriptionsSlice.actions;
export const { setSessionsSec, removeSessions } = sessionsSecSlice.actions;
export const { setSessionsTeacher } = sessionTeacherSlice.actions;

export const userReducer = userSlice.reducer;
export const studentsReducer = studentsSlice.reducer;
export const teachersReducer = teachersSlice.reducer;
export const subscriptionsReducer = subscriptionsSlice.reducer;
export const sessionsSecReducer = sessionsSecSlice.reducer;
export const sessionsTeacherReducer = sessionTeacherSlice.reducer;

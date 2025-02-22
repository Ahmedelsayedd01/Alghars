import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialUserState = { data: null };
const initialStudentsState: { data: { id: number }[] } = { data: [] };
const initialTeachersState = { data: [] };
const initialClassesState = { data: [] };
const initialSubjectsState = { data: [] };
const initialClassesTeacerState = { data: [] };

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
    setStudents: (state, action) => {
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
    setTeachers: (state, action) => {
      state.data = action.payload;
    },
    removeTeacher: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (teacher: { id: number }) => teacher.id !== action.payload
      );
    },
  },
});
/* Classes */
const classesSlice = createSlice({
  name: "classes",
  initialState: initialClassesState,
  reducers: {
    setClasses: (state, action) => {
      state.data = action.payload;
    },
    removeClass: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (clas: { id: number }) => clas.id !== action.payload
      );
    },
  },
});
/* Subjects */
const subjectsSlice = createSlice({
  name: "subjects",
  initialState: initialSubjectsState,
  reducers: {
    setSubjects: (state, action) => {
      state.data = action.payload;
    },
    removeSubject: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (subject: { id: number }) => subject.id !== action.payload
      );
    },
  },
});
/* Classes Teacher */
const classesTeacherSlice = createSlice({
  name: "classesTeacher",
  initialState: initialClassesTeacerState,
  reducers: {
    setClassesTeacher: (state, action) => {
      state.data = action.payload;
    },
    //     removeSubject: (state, action: PayloadAction<number>) => {
    //       state.data = state.data.filter(
    //         (subject: { id: number }) => subject.id !== action.payload
    //       );
    //     },
  },
});

export const { login, logOut } = userSlice.actions;
export const { setStudents, removeStudent } = studentsSlice.actions;
export const { setTeachers, removeTeacher } = teachersSlice.actions;
export const { setSubjects, removeSubject } = subjectsSlice.actions;
export const { setClasses, removeClass } = classesSlice.actions;
export const { setClassesTeacher } = classesTeacherSlice.actions;

export const userReducer = userSlice.reducer;
export const studentsReducer = studentsSlice.reducer;
export const teachersReducer = teachersSlice.reducer;
export const subjectsReducer = subjectsSlice.reducer;
export const classesReducer = classesSlice.reducer;
export const classesTeacherReducer = classesTeacherSlice.reducer;

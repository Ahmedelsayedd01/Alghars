import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Classes,
  ScheduleSessions,
  Students,
  Subjects,
  Teachers,
} from "../types";

const initialUserState: { data: { role: string } | null } = {
  data: {
    role: "admin",
  },
};
const initialStudentsState: { data: Students[] } = {
  data: [
    {
      id: 1,
      name: "Student 1",
      category: "المرحلة الابتدائية",
      parentPhone: "123456789",
      address: "Address 1",
      countClass: 5,
      subscription: 5,
      image_link: "https://via.placeholder.com/150",
      payment: "تم الدفع",
      status: "active",
    },
    {
      id: 2,
      name: "Student 2",
      category: "المرحلة الإعدادية",
      parentPhone: "987654321",
      address: "Address 2",
      countClass: 4,
      subscription: 4,
      image_link: "https://via.placeholder.com/150",
      payment: "لم يتم الدفع",
      status: "active",
    },
    {
      id: 3,
      name: "Student 3",
      category: "المرحلة الثانوية",
      parentPhone: "456789123",
      address: "Address 3",
      countClass: 6,
      subscription: 6,
      image_link: "https://via.placeholder.com/150",
      payment: "تقسيط",
      status: "active",
    },
    {
      id: 4,
      name: "Student 4",
      category: "المرحلة الابتدائية",
      parentPhone: "654321987",
      address: "Address 4",
      countClass: 3,
      subscription: 3,
      image_link: "https://via.placeholder.com/150",
      payment: "تم الدفع",
      status: "active",
    },
    {
      id: 5,
      name: "Student 5",
      category: "المرحلة الإعدادية",
      parentPhone: "321987654",
      address: "Address 5",
      countClass: 7,
      subscription: 7,
      image_link: "https://via.placeholder.com/150",
      payment: "لم يتم الدفع",
      status: "active",
    },
    {
      id: 6,
      name: "Student 6",
      category: "المرحلة الثانوية",
      parentPhone: "789123456",
      address: "Address 6",
      countClass: 5,
      subscription: 5,
      image_link: "https://via.placeholder.com/150",
      payment: "تقسيط",
      status: "active",
    },
    {
      id: 7,
      name: "Student 7",
      category: "المرحلة الابتدائية",
      parentPhone: "456123789",
      address: "Address 7",
      countClass: 4,
      subscription: 4,
      image_link: "https://via.placeholder.com/150",
      payment: "تم الدفع",
      status: "active",
    },
    {
      id: 8,
      name: "Student 8",
      category: "المرحلة الإعدادية",
      parentPhone: "987321654",
      address: "Address 8",
      countClass: 6,
      subscription: 6,
      image_link: "https://via.placeholder.com/150",
      payment: "لم يتم الدفع",
      status: "active",
    },
    {
      id: 9,
      name: "Student 9",
      category: "المرحلة الثانوية",
      parentPhone: "123654789",
      address: "Address 9",
      countClass: 3,
      subscription: 3,
      image_link: "https://via.placeholder.com/150",
      payment: "تقسيط",
      status: "active",
    },
    {
      id: 10,
      name: "Student 10",
      category: "المرحلة الابتدائية",
      parentPhone: "654789321",
      address: "Address 10",
      countClass: 5,
      subscription: 5,
      image_link: "https://via.placeholder.com/150",
      payment: "تم الدفع",
      status: "active",
    },
    {
      id: 11,
      name: "Student 11",
      category: "المرحلة الإعدادية",
      parentPhone: "789456123",
      address: "Address 11",
      countClass: 4,
      subscription: 4,
      image_link: "https://via.placeholder.com/150",
      payment: "لم يتم الدفع",
      status: "active",
    },
    {
      id: 12,
      name: "Student 12",
      category: "المرحلة الثانوية",
      parentPhone: "321654987",
      address: "Address 12",
      countClass: 7,
      subscription: 7,
      image_link: "https://via.placeholder.com/150",
      payment: "تقسيط",
      status: "active",
    },
    {
      id: 13,
      name: "Student 13",
      category: "المرحلة الابتدائية",
      parentPhone: "789654123",
      address: "Address 13",
      countClass: 6,
      subscription: 6,
      image_link: "https://via.placeholder.com/150",
      payment: "تم الدفع",
      status: "active",
    },
    {
      id: 14,
      name: "Student 14",
      category: "المرحلة الإعدادية",
      parentPhone: "456789321",
      address: "Address 14",
      countClass: 5,
      subscription: 5,
      image_link: "https://via.placeholder.com/150",
      payment: "لم يتم الدفع",
      status: "active",
    },
    {
      id: 15,
      name: "Student 15",
      category: "المرحلة الثانوية",
      parentPhone: "987654321",
      address: "Address 15",
      countClass: 4,
      subscription: 4,
      image_link: "https://via.placeholder.com/150",
      payment: "تقسيط",
      status: "active",
    },
    {
      id: 16,
      name: "Student 16",
      category: "المرحلة الابتدائية",
      parentPhone: "321987654",
      address: "Address 16",
      countClass: 3,
      subscription: 3,
      image_link: "https://via.placeholder.com/150",
      payment: "تم الدفع",
      status: "active",
    },
    {
      id: 17,
      name: "Student 17",
      category: "المرحلة الإعدادية",
      parentPhone: "789321654",
      address: "Address 17",
      countClass: 5,
      subscription: 5,
      image_link: "https://via.placeholder.com/150",
      payment: "لم يتم الدفع",
      status: "active",
    },
    {
      id: 18,
      name: "Student 18",
      category: "المرحلة الثانوية",
      parentPhone: "123456789",
      address: "Address 18",
      countClass: 6,
      subscription: 6,
      image_link: "https://via.placeholder.com/150",
      payment: "تقسيط",
      status: "active",
    },
    {
      id: 19,
      name: "Student 19",
      category: "المرحلة الابتدائية",
      parentPhone: "654123789",
      address: "Address 19",
      countClass: 4,
      subscription: 4,
      image_link: "https://via.placeholder.com/150",
      payment: "تم الدفع",
      status: "active",
    },
    {
      id: 20,
      name: "Student 20",
      category: "المرحلة الإعدادية",
      parentPhone: "987654321",
      address: "Address 20",
      countClass: 3,
      subscription: 3,
      image_link: "https://via.placeholder.com/150",
      payment: "لم يتم الدفع",
      status: "active",
    },
  ],
};
const initialTeachersState: { data: Teachers[] } = {
  data: [
    {
      id: 1,
      name: "Teacher 1",
      email: "teacher1@example.com",
      phone: "123456789",
      address: "Address 1",
      countClass: 5,
      image_link: "https://via.placeholder.com/150",
      subject: "Arabic",
      status: "active",
    },
    {
      id: 2,
      name: "Teacher 2",
      email: "teacher2@example.com",
      phone: "987654321",
      address: "Address 2",
      countClass: 4,
      image_link: "https://via.placeholder.com/150",
      subject: "Math",
      status: "active",
    },
    {
      id: 3,
      name: "Teacher 3",
      email: "teacher3@example.com",
      phone: "111222333",
      address: "Address 3",
      countClass: 6,
      image_link: "https://via.placeholder.com/150",
      subject: "Science",
      status: "unactive",
    },
    {
      id: 4,
      name: "Teacher 4",
      email: "teacher4@example.com",
      phone: "444555666",
      address: "Address 4",
      countClass: 3,
      image_link: "https://via.placeholder.com/150",
      subject: "English",
      status: "active",
    },
    {
      id: 5,
      name: "Teacher 5",
      email: "teacher5@example.com",
      phone: "777888999",
      address: "Address 5",
      countClass: 2,
      image_link: "https://via.placeholder.com/150",
      subject: "History",
      status: "active",
    },
    {
      id: 6,
      name: "Teacher 6",
      email: "teacher6@example.com",
      phone: "123123123",
      address: "Address 6",
      countClass: 7,
      image_link: "https://via.placeholder.com/150",
      subject: "Geography",
      status: "unactive",
    },
    {
      id: 7,
      name: "Teacher 7",
      email: "teacher7@example.com",
      phone: "456456456",
      address: "Address 7",
      countClass: 4,
      image_link: "https://via.placeholder.com/150",
      subject: "Physics",
      status: "active",
    },
    {
      id: 8,
      name: "Teacher 8",
      email: "teacher8@example.com",
      phone: "789789789",
      address: "Address 8",
      countClass: 5,
      image_link: "https://via.placeholder.com/150",
      subject: "Chemistry",
      status: "active",
    },
    {
      id: 9,
      name: "Teacher 9",
      email: "teacher9@example.com",
      phone: "321321321",
      address: "Address 9",
      countClass: 6,
      image_link: "https://via.placeholder.com/150",
      subject: "Biology",
      status: "unactive",
    },
    {
      id: 10,
      name: "Teacher 10",
      email: "teacher10@example.com",
      phone: "654654654",
      address: "Address 10",
      countClass: 3,
      image_link: "https://via.placeholder.com/150",
      subject: "Computer Science",
      status: "active",
    },
    {
      id: 11,
      name: "Teacher 11",
      email: "teacher11@example.com",
      phone: "987987987",
      address: "Address 11",
      countClass: 4,
      image_link: "https://via.placeholder.com/150",
      subject: "Economics",
      status: "unactive",
    },
    {
      id: 12,
      name: "Teacher 12",
      email: "teacher12@example.com",
      phone: "147258369",
      address: "Address 12",
      countClass: 5,
      image_link: "https://via.placeholder.com/150",
      subject: "Philosophy",
      status: "active",
    },
    {
      id: 13,
      name: "Teacher 13",
      email: "teacher13@example.com",
      phone: "258369147",
      address: "Address 13",
      countClass: 3,
      image_link: "https://via.placeholder.com/150",
      subject: "Music",
      status: "active",
    },
    {
      id: 14,
      name: "Teacher 14",
      email: "teacher14@example.com",
      phone: "369147258",
      address: "Address 14",
      countClass: 6,
      image_link: "https://via.placeholder.com/150",
      subject: "Art",
      status: "unactive",
    },
    {
      id: 15,
      name: "Teacher 15",
      email: "teacher15@example.com",
      phone: "123654789",
      address: "Address 15",
      countClass: 7,
      image_link: "https://via.placeholder.com/150",
      subject: "Physical Education",
      status: "active",
    },
    {
      id: 16,
      name: "Teacher 16",
      email: "teacher16@example.com",
      phone: "987321654",
      address: "Address 16",
      countClass: 4,
      image_link: "https://via.placeholder.com/150",
      subject: "Literature",
      status: "active",
    },
    {
      id: 17,
      name: "Teacher 17",
      email: "teacher17@example.com",
      phone: "456789123",
      address: "Address 17",
      countClass: 5,
      image_link: "https://via.placeholder.com/150",
      subject: "Drama",
      status: "unactive",
    },
    {
      id: 18,
      name: "Teacher 18",
      email: "teacher18@example.com",
      phone: "789123456",
      address: "Address 18",
      countClass: 6,
      image_link: "https://via.placeholder.com/150",
      subject: "Social Studies",
      status: "active",
    },
    {
      id: 19,
      name: "Teacher 19",
      email: "teacher19@example.com",
      phone: "321654987",
      address: "Address 19",
      countClass: 3,
      image_link: "https://via.placeholder.com/150",
      subject: "French",
      status: "active",
    },
    {
      id: 20,
      name: "Teacher 20",
      email: "teacher20@example.com",
      phone: "654987321",
      address: "Address 20",
      countClass: 4,
      image_link: "https://via.placeholder.com/150",
      subject: "German",
      status: "unactive",
    },
  ],
};
const initialSubjectsState: { data: Subjects[] } = {
  data: [
    {
      id: 1,
      name: "اللغة العربية",
      status: "active",
    },
    {
      id: 2,
      name: "الرياضيات",
      status: "unactive",
    },
    {
      id: 3,
      name: "العلوم",
      status: "active",
    },
    {
      id: 4,
      name: "اللغة الإنجليزية",
      status: "active",
    },
    {
      id: 5,
      name: "التاريخ",
      status: "unactive",
    },
    {
      id: 6,
      name: "الجغرافيا",
      status: "active",
    },
    {
      id: 7,
      name: "الحاسب الآلي",
      status: "unactive",
    },
  ],
};
const initialClassesState: { data: Classes[] } = {
  data: [
    {
      id: 1,
      student: "Student 1",
      teacher: "Teacher 1",
      teacherPhone: "01556665556",
      subject: "Math",
      date: "2023-01-01",
      start: "",
      end: "",
      price: 120,
      status: "pending",
      active: "active",
    },
    {
      id: 2,
      student: "Student 2",
      teacher: "Teacher 2",
      teacherPhone: "01556665556",
      subject: "Science",
      date: "2023-02-01",
      start: "11:00 AM",
      end: "01:00 PM",
      price: 150,
      status: "processing",
      active: "active",
    },
    {
      id: 3,
      student: "Student 3",
      teacher: "Teacher 3",
      teacherPhone: "01556665556",
      subject: "English",
      date: "2023-03-01",
      start: "02:00 PM",
      end: "04:00 PM",
      price: 110,
      status: "done",
      active: "active",
    },
    {
      id: 4,
      student: "Student 4",
      teacher: "Teacher 1",
      teacherPhone: "01556665556",
      subject: "Arabic",
      date: "2023-04-01",
      start: "10:00 AM",
      end: "12:00 PM",
      price: 130,
      status: "pending",
      active: "active",
    },
    {
      id: 5,
      student: "Student 5",
      teacher: "Teacher 2",
      teacherPhone: "01556665556",
      subject: "Physics",
      date: "2023-05-01",
      start: "03:00 PM",
      end: "05:00 PM",
      price: 160,
      status: "processing",
      active: "active",
    },
    {
      id: 6,
      student: "Student 6",
      teacher: "Teacher 3",
      teacherPhone: "01556665556",
      subject: "Chemistry",
      date: "2023-06-01",
      start: "11:00 AM",
      end: "01:00 PM",
      price: 140,
      status: "done",
      active: "active",
    },
    {
      id: 7,
      student: "Student 7",
      teacher: "Teacher 4",
      teacherPhone: "01556665556",
      subject: "History",
      date: "2023-07-01",
      start: "09:00 AM",
      end: "11:00 AM",
      price: 115,
      status: "pending",
      active: "active",
    },
    {
      id: 8,
      student: "Student 8",
      teacher: "Teacher 5",
      teacherPhone: "01556665556",
      subject: "Geography",
      date: "2023-08-01",
      start: "01:00 PM",
      end: "03:00 PM",
      price: 125,
      status: "processing",
      active: "active",
    },
    {
      id: 9,
      student: "Student 9",
      teacher: "Teacher 6",
      teacherPhone: "01556665556",
      subject: "Computer Science",
      date: "2023-09-01",
      start: "02:00 PM",
      end: "04:00 PM",
      price: 170,
      status: "done",
      active: "active",
    },
    {
      id: 10,
      student: "Student 10",
      teacher: "Teacher 1",
      teacherPhone: "01556665556",
      subject: "Math",
      date: "2023-10-01",
      start: "10:00 AM",
      end: "12:00 PM",
      price: 120,
      status: "pending",
      active: "active",
    },
    {
      id: 11,
      student: "Student 11",
      teacher: "Teacher 2",
      teacherPhone: "01556665556",
      subject: "Science",
      date: "2023-11-01",
      start: "11:00 AM",
      end: "01:00 PM",
      price: 150,
      status: "processing",
      active: "active",
    },
    {
      id: 12,
      student: "Student 12",
      teacher: "Teacher 3",
      teacherPhone: "01556665556",
      subject: "English",
      date: "2023-12-01",
      start: "02:00 PM",
      end: "04:00 PM",
      price: 110,
      status: "done",
      active: "active",
    },
    {
      id: 13,
      student: "Student 13",
      teacher: "Teacher 4",
      teacherPhone: "01556665556",
      subject: "Arabic",
      date: "2024-01-01",
      start: "10:00 AM",
      end: "12:00 PM",
      price: 130,
      status: "pending",
      active: "active",
    },
    {
      id: 14,
      student: "Student 14",
      teacher: "Teacher 5",
      teacherPhone: "01556665556",
      subject: "Physics",
      date: "2024-02-01",
      start: "03:00 PM",
      end: "05:00 PM",
      price: 160,
      status: "processing",
      active: "active",
    },
    {
      id: 15,
      student: "Student 15",
      teacher: "Teacher 6",
      teacherPhone: "01556665556",
      subject: "Chemistry",
      date: "2024-03-01",
      start: "11:00 AM",
      end: "01:00 PM",
      price: 140,
      status: "done",
      active: "active",
    },
    {
      id: 16,
      student: "Student 16",
      teacher: "Teacher 1",
      teacherPhone: "01556665556",
      subject: "History",
      date: "2024-04-01",
      start: "09:00 AM",
      end: "11:00 AM",
      price: 115,
      status: "pending",
      active: "active",
    },
    {
      id: 17,
      student: "Student 17",
      teacher: "Teacher 2",
      teacherPhone: "01556665556",
      subject: "Geography",
      date: "2024-05-01",
      start: "01:00 PM",
      end: "03:00 PM",
      price: 125,
      status: "processing",
      active: "active",
    },
    {
      id: 18,
      student: "Student 18",
      teacher: "Teacher 3",
      teacherPhone: "01556665556",
      subject: "Computer Science",
      date: "2024-06-01",
      start: "02:00 PM",
      end: "04:00 PM",
      price: 170,
      status: "done",
      active: "active",
    },
    {
      id: 19,
      student: "Student 19",
      teacher: "Teacher 4",
      teacherPhone: "01556665556",
      subject: "Math",
      date: "2024-07-01",
      start: "10:00 AM",
      end: "12:00 PM",
      price: 120,
      status: "pending",
      active: "active",
    },
    {
      id: 20,
      student: "Student 20",
      teacher: "Teacher 5",
      teacherPhone: "01556665556",
      subject: "Science",
      date: "2024-08-01",
      start: "11:00 AM",
      end: "01:00 PM",
      price: 150,
      status: "processing",
      active: "active",
    },
  ],
};

const initialSessionsTeacerState: { data: ScheduleSessions[] } = {
  data: [
    {
      id: 1,
      day: "01/03/2025",
      sessions: [
        { id: 1, name: "Morning Yoga",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 2, name: "Tech Conference",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Networking Session",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Networking Session",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Networking Session",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Networking Session",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Networking Session",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Networking Session",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
      ]
    },
    {
      id: 2,
      day: "02/03/2025",
      sessions: [
        { id: 1, name: "AI Workshop",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 2, name: "Lunch Break",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Coding Challenge",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" }
      ]
    },
    {
      id: 3,
      day: "03/03/2025",
      sessions: [
        { id: 1, name: "Cybersecurity Talk",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 2, name: "Machine Learning Basics",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Evening Meditation",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" }
      ]
    },
    {
      id: 4,
      day: "04/03/2025",
      sessions: [
        { id: 1, name: "Web Development Bootcamp",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 2, name: "Data Science Intro",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Live Q&A",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" }
      ]
    },
    {
      id: 5,
      day: "05/03/2025",
      sessions: [
        { id: 1, name: "Marketing Strategy",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 2, name: "Social Media Growth",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Personal Branding",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" }
      ]
    },
    {
      id: 6,
      day: "06/03/2025",
      sessions: [
        { id: 1, name: "Blockchain Basics",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 2, name: "Cryptocurrency Panel",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "DeFi and NFTs",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" }
      ]
    },
    {
      id: 7,
      day: "07/03/2025",
      sessions: [
        { id: 1, name: "UI/UX Design Trends",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 2, name: "Product Management Insights",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "Startup Pitch Session",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" }
      ]
    },
    {
      id: 8,
      day: "08/03/2025",
      sessions: [
        { id: 1, name: "Game Development 101",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 2, name: "Unity vs Unreal Engine",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" },
        { id: 3, name: "VR & AR Future",location: "newdfsdfsdfdsf", start: "", end: "", status: "unactive" }
      ]
    }
  ]
  ,
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
/* Sessions Teacher */
const sessionTeacherSlice = createSlice({
  name: "sessionsTeacher",
  initialState: initialSessionsTeacerState,
  reducers: {
    setSessionsTeacher: (state, action) => {
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
export const { setSessionsTeacher } = sessionTeacherSlice.actions;

export const userReducer = userSlice.reducer;
export const studentsReducer = studentsSlice.reducer;
export const teachersReducer = teachersSlice.reducer;
export const subjectsReducer = subjectsSlice.reducer;
export const classesReducer = classesSlice.reducer;
export const sessionsTeacherReducer = sessionTeacherSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Classes,
  ScheduleSessions,
  Students,
  Subjects,
  Teachers,
} from "../types";

const initialUserState: { data: { role: string } | null } = {
  data:null,
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
      status: "pending",
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
      status: "pending",
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
      status: "pending",
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
      status: "pending",
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
      status: "pending",
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
      status: "pending",
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
      status: "pending",
      active: "active",
    },
  ],
};

const initialSessionsTeacerState: { data: ScheduleSessions[] } = {
  data : [
    {
      "day": "01/03/2025",
      "sessions": [
        { id: 1, student: { id: 1, name: "محمد علي", address: "٢١ شارع النيل", subject: "الرياضيات" }, start: "", end: "", status: "pending" },
        { id: 2, student: { id: 2, name: "سارة محمود", address: "٥٠ شارع الجامعة", subject: "العلوم" }, start: "12:00:00", end: "", status: "pending" },
      ]
    },
    {
      "day": "02/03/2025",
      "sessions": [
        { id: 3, student: { id: 3, name: "أحمد حسن", address: "٣٢ شارع الجيش", subject: "التاريخ" }, start: "13:00:00", end: "14:00:00", status: "done" },
        { id: 4, student: { id: 4, name: "مريم خالد", address: "٤٢ شارع الزهراء", subject: "الفيزياء" }, start: "", end: "", status: "pending" },
        { id: 5, student: { id: 5, name: "يوسف سمير", address: "١١ شارع التحرير", subject: "الكيمياء" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "03/03/2025",
      "sessions": [
        { id: 6, student: { id: 6, name: "ندى عمر", address: "٧ شارع الهرم", subject: "الأحياء" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "04/03/2025",
      "sessions": [
        { id: 7, student: { id: 7, name: "إبراهيم صالح", address: "٣٥ شارع المطار", subject: "اللغة الإنجليزية" }, start: "", end: "", status: "pending" },
        { id: 8, student: { id: 8, name: "خالد شريف", address: "١٢ شارع النصر", subject: "الجغرافيا" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "05/03/2025",
      "sessions": [
        { id: 9, student: { id: 9, name: "هند عبد الله", address: "٤٤ شارع القومية", subject: "الموسيقى" }, start: "", end: "", status: "pending" },
        { id: 10, student: { id: 10, name: "حسن إبراهيم", address: "٩ شارع الأزهر", subject: "الفن" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "06/03/2025",
      "sessions": [
        { id: 11, student: { id: 11, name: "لمياء أشرف", address: "١٥ شارع رمسيس", subject: "الفلسفة" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "08/03/2025",
      "sessions": [
        { id: 12, student: { id: 12, name: "ماهر توفيق", address: "٦ شارع الشهداء", subject: "علم النفس" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "07/03/2025",
      "sessions": [
        { id: 13, student: { id: 13, name: "رنا ياسر", address: "٨ شارع بورسعيد", subject: "علم الاجتماع" }, start: "", end: "", status: "pending" },
        { id: 14, student: { id: 14, name: "سامي يوسف", address: "٣ شارع الفسطاط", subject: "الاقتصاد" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "09/03/2025",
      "sessions": [
        { id: 15, student: { id: 15, name: "لينا حسن", address: "٢ شارع العروبة", subject: "البرمجة" }, start: "10:30:00", end: "11:30:00", status: "pending" },
        { id: 16, student: { id: 16, name: "كريم علاء", address: "١٠ شارع الفجالة", subject: "الإحصاء" }, start: "12:00:00", end: "13:00:00", status: "done" },
        { id: 17, student: { id: 17, name: "هدى طارق", address: "٢٣ شارع مصدق", subject: "الهندسة" }, start: "14:00:00", end: "15:00:00", status: "pending" },
      ]
    },
    {
      "day": "10/03/2025",
      "sessions": [
        { id: 18, student: { id: 18, name: "أيمن شعبان", address: "٧ شارع عبد الخالق", subject: "اللغات الأجنبية" }, start: "15:30:00", end: "16:30:00", status: "pending" },
        { id: 19, student: { id: 19, name: "نور حسن", address: "٤ شارع الجيش", subject: "التصميم الجرافيكي" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "11/03/2025",
      "sessions": [
        { id: 20, student: { id: 8, name: "خالد شريف", address: "١٢ شارع النصر", subject: "الجغرافيا" }, start: "10:00:00", end: "11:00:00", status: "done" },
        { id: 21, student: { id: 9, name: "هند عبد الله", address: "٤٤ شارع القومية", subject: "الموسيقى" }, start: "11:30:00", end: "12:30:00", status: "pending" },
        { id: 22, student: { id: 10, name: "حسن إبراهيم", address: "٩ شارع الأزهر", subject: "الفن" }, start: "13:00:00", end: "14:00:00", status: "done" },
      ]
    },
    {
      "day": "12/03/2025",
      "sessions": [
        { id: 23, student: { id: 11, name: "لمياء أشرف", address: "١٥ شارع رمسيس", subject: "الفلسفة" }, start: "14:30:00", end: "15:30:00", status: "pending" },
        { id: 24, student: { id: 12, name: "ماهر توفيق", address: "٦ شارع الشهداء", subject: "علم النفس" }, start: "", end: "", status: "pending" },
        { id: 25, student: { id: 13, name: "رنا ياسر", address: "٨ شارع بورسعيد", subject: "علم الاجتماع" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "13/03/2025",
      "sessions": [
        { id: 26, student: { id: 1, name: "محمد علي", address: "٢١ شارع النيل", subject: "الرياضيات" }, start: "", end: "", status: "pending" },
        { id: 27, student: { id: 2, name: "سارة محمود", address: "٥٠ شارع الجامعة", subject: "العلوم" }, start: "12:00:00", end: "", status: "pending" },
      ]
    },
    {
      "day": "14/03/2025",
      "sessions": [
        { id: 28, student: { id: 3, name: "أحمد حسن", address: "٣٢ شارع الجيش", subject: "التاريخ" }, start: "13:00:00", end: "14:00:00", status: "done" },
      ]
    },
    {
      "day": "15/03/2025",
      "sessions": [
        { id: 29, student: { id: 4, name: "مريم خالد", address: "٤٢ شارع الزهراء", subject: "الفيزياء" }, start: "14:30:00", end: "15:30:00", status: "done" },
        { id: 30, student: { id: 5, name: "يوسف سمير", address: "١١ شارع التحرير", subject: "الكيمياء" }, start: "16:00:00", end: "17:00:00", status: "done" },
      ]
    },
    {
      "day": "16/03/2025",
      "sessions": [
        { id: 31, student: { id: 6, name: "ندى عمر", address: "٧ شارع الهرم", subject: "الأحياء" }, start: "17:30:00", end: "18:30:00", status: "pending" },
      ]
    },
    {
      "day": "17/03/2025",
      "sessions": [
        { id: 32, student: { id: 1, name: "محمد علي", address: "٢١ شارع النيل", subject: "الرياضيات" }, start: "", end: "", status: "pending" },
        { id: 33, student: { id: 2, name: "سارة محمود", address: "٥٠ شارع الجامعة", subject: "العلوم" }, start: "12:00:00", end: "", status: "pending" },
      ]
    },
    {
      "day": "18/03/2025",
      "sessions": [
        { id: 34, student: { id: 3, name: "أحمد حسن", address: "٣٢ شارع الجيش", subject: "التاريخ" }, start: "13:00:00", end: "14:00:00", status: "done" },
        { id: 35, student: { id: 4, name: "مريم خالد", address: "٤٢ شارع الزهراء", subject: "الفيزياء" }, start: "", end: "", status: "pending" },
        { id: 36, student: { id: 5, name: "يوسف سمير", address: "١١ شارع التحرير", subject: "الكيمياء" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "19/03/2025",
      "sessions": [
        { id: 37, student: { id: 6, name: "ندى عمر", address: "٧ شارع الهرم", subject: "الأحياء" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "20/03/2025",
      "sessions": [
        { id: 38, student: { id: 7, name: "إبراهيم صالح", address: "٣٥ شارع المطار", subject: "اللغة الإنجليزية" }, start: "", end: "", status: "pending" },
        { id: 39, student: { id: 8, name: "خالد شريف", address: "١٢ شارع النصر", subject: "الجغرافيا" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "21/03/2025",
      "sessions": [
        { id: 39, student: { id: 9, name: "هند عبد الله", address: "٤٤ شارع القومية", subject: "الموسيقى" }, start: "", end: "", status: "pending" },
        { id: 40, student: { id: 10, name: "حسن إبراهيم", address: "٩ شارع الأزهر", subject: "الفن" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "22/03/2025",
      "sessions": [
        { id: 41, student: { id: 11, name: "لمياء أشرف", address: "١٥ شارع رمسيس", subject: "الفلسفة" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "23/03/2025",
      "sessions": [
        { id: 42, student: { id: 12, name: "ماهر توفيق", address: "٦ شارع الشهداء", subject: "علم النفس" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "24/03/2025",
      "sessions": [
        { id: 43, student: { id: 13, name: "رنا ياسر", address: "٨ شارع بورسعيد", subject: "علم الاجتماع" }, start: "", end: "", status: "pending" },
        { id: 44, student: { id: 14, name: "سامي يوسف", address: "٣ شارع الفسطاط", subject: "الاقتصاد" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "25/03/2025",
      "sessions": [
        { id: 45, student: { id: 15, name: "لينا حسن", address: "٢ شارع العروبة", subject: "البرمجة" }, start: "10:30:00", end: "11:30:00", status: "pending" },
        { id: 46, student: { id: 16, name: "كريم علاء", address: "١٠ شارع الفجالة", subject: "الإحصاء" }, start: "12:00:00", end: "13:00:00", status: "done" },
        { id: 47, student: { id: 17, name: "هدى طارق", address: "٢٣ شارع مصدق", subject: "الهندسة" }, start: "14:00:00", end: "15:00:00", status: "pending" },
      ]
    },
    {
      "day": "26/03/2025",
      "sessions": [
        { id: 48, student: { id: 18, name: "أيمن شعبان", address: "٧ شارع عبد الخالق", subject: "اللغات الأجنبية" }, start: "15:30:00", end: "16:30:00", status: "pending" },
        { id: 49, student: { id: 19, name: "نور حسن", address: "٤ شارع الجيش", subject: "التصميم الجرافيكي" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "27/03/2025",
      "sessions": [
        { id: 50, student: { id: 8, name: "خالد شريف", address: "١٢ شارع النصر", subject: "الجغرافيا" }, start: "10:00:00", end: "11:00:00", status: "done" },
        { id: 51, student: { id: 9, name: "هند عبد الله", address: "٤٤ شارع القومية", subject: "الموسيقى" }, start: "11:30:00", end: "12:30:00", status: "pending" },
        { id: 52, student: { id: 10, name: "حسن إبراهيم", address: "٩ شارع الأزهر", subject: "الفن" }, start: "13:00:00", end: "14:00:00", status: "done" },
      ]
    },
    {
      "day": "28/03/2025",
      "sessions": [
        { id: 53, student: { id: 11, name: "لمياء أشرف", address: "١٥ شارع رمسيس", subject: "الفلسفة" }, start: "14:30:00", end: "15:30:00", status: "pending" },
        { id: 54, student: { id: 12, name: "ماهر توفيق", address: "٦ شارع الشهداء", subject: "علم النفس" }, start: "", end: "", status: "pending" },
        { id: 55, student: { id: 13, name: "رنا ياسر", address: "٨ شارع بورسعيد", subject: "علم الاجتماع" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "29/03/2025",
      "sessions": [
        { id: 56, student: { id: 1, name: "محمد علي", address: "٢١ شارع النيل", subject: "الرياضيات" }, start: "", end: "", status: "pending" },
        { id: 57, student: { id: 2, name: "سارة محمود", address: "٥٠ شارع الجامعة", subject: "العلوم" }, start: "12:00:00", end: "", status: "pending" },
      ]
    },
    {
      "day": "30/03/2025",
      "sessions": [
        { id: 58, student: { id: 3, name: "أحمد حسن", address: "٣٢ شارع الجيش", subject: "التاريخ" }, start: "13:00:00", end: "14:00:00", status: "done" },
      ]
    },
    {
      "day": "31/03/2025",
      "sessions": [
        { id: 59, student: { id: 4, name: "مريم خالد", address: "٤٢ شارع الزهراء", subject: "الفيزياء" }, start: "14:30:00", end: "15:30:00", status: "done" },
        { id: 60, student: { id: 5, name: "يوسف سمير", address: "١١ شارع التحرير", subject: "الكيمياء" }, start: "16:00:00", end: "17:00:00", status: "done" },
      ]
    },
  ]
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

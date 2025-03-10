import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SessionsSec,
  ScheduleSessions,
  Students,
  Subscriptions,
  Teachers,
} from "../types";

const initialUserState: { data: { role: string } | null } = {
  data:null,
};
const initialStudentsState: { data: Students[] } = {
  data:[
    { id: 1, name: "الطالب 1", category: "المرحلة الابتدائية", parentPhone: "123456789", address: "العنوان 1", countClass: 5, subscription: "اشتراك سنوي", image_link: "https://via.placeholder.com/150", payment: 0, price: 100, status: "active" },
    { id: 2, name: "الطالب 2", category: "المرحلة الإعدادية", parentPhone: "987654321", address: "العنوان 2", countClass: 7, subscription: "اشتراك الشهري", image_link: "https://via.placeholder.com/150", payment: 1, price: 200, status: "unactive" },
    { id: 3, name: "الطالب 3", category: "المرحلة الثانوية", parentPhone: "112233445", address: "العنوان 3", countClass: 10, subscription: "اشتراك الأسبوعي", image_link: "https://via.placeholder.com/150", payment: 2, price: 300, status: "active" },
    { id: 4, name: "الطالب 4", category: "رياض الأطفال", parentPhone: "556677889", address: "العنوان 4", countClass: 3, subscription: "اشتراك الفصلي", image_link: "https://via.placeholder.com/150", payment: 2, price: 150, status: "unactive" },
    { id: 5, name: "الطالب 5", category: "المرحلة الابتدائية", parentPhone: "443322110", address: "العنوان 5", countClass: 6, subscription: "اشتراك سنوي", image_link: "https://via.placeholder.com/150", payment: 1, price: 500, status: "active" },
    { id: 6, name: "الطالب 6", category: "المرحلة الإعدادية", parentPhone: "991122334", address: "العنوان 6", countClass: 8, subscription: "اشتراك الشهري", image_link: "https://via.placeholder.com/150", payment: 0, price: 400, status: "unactive" },
    { id: 7, name: "الطالب 7", category: "المرحلة الثانوية", parentPhone: "223344556", address: "العنوان 7", countClass: 12, subscription: "اشتراك الأسبوعي", image_link: "https://via.placeholder.com/150", payment: 0, price: 600, status: "active" },
    { id: 8, name: "الطالب 8", category: "رياض الأطفال", parentPhone: "778899001", address: "العنوان 8", countClass: 4, subscription: "اشتراك الفصلي", image_link: "https://via.placeholder.com/150", payment: 1, price: 250, status: "unactive" },
    { id: 9, name: "الطالب 9", category: "المرحلة الابتدائية", parentPhone: "665544332", address: "العنوان 9", countClass: 5, subscription: "اشتراك سنوي", image_link: "https://via.placeholder.com/150", payment: 1, price: 700, status: "active" },
    { id: 10, name: "الطالب 10", category: "المرحلة الإعدادية", parentPhone: "112244668", address: "العنوان 10", countClass: 9, subscription: "اشتراك الشهري", image_link: "https://via.placeholder.com/150", payment: 2, price: 350, status: "unactive" },
    { id: 11, name: "الطالب 11", category: "المرحلة الثانوية", parentPhone: "998877665", address: "العنوان 11", countClass: 11, subscription: "اشتراك الأسبوعي", image_link: "https://via.placeholder.com/150", payment: 2, price: 550, status: "active" },
    { id: 12, name: "الطالب 12", category: "رياض الأطفال", parentPhone: "887766554", address: "العنوان 12", countClass: 3, subscription: "اشتراك الفصلي", image_link: "https://via.placeholder.com/150", payment: 0, price: 150, status: "unactive" },
    { id: 13, name: "الطالب 13", category: "المرحلة الابتدائية", parentPhone: "665577889", address: "العنوان 13", countClass: 7, subscription: "اشتراك سنوي", image_link: "https://via.placeholder.com/150", payment: 2, price: 800, status: "active" },
    { id: 14, name: "الطالب 14", category: "المرحلة الإعدادية", parentPhone: "556688990", address: "العنوان 14", countClass: 10, subscription: "اشتراك الشهري", image_link: "https://via.placeholder.com/150", payment: 1, price: 450, status: "unactive" },
    { id: 15, name: "الطالب 15", category: "المرحلة الثانوية", parentPhone: "445566778", address: "العنوان 15", countClass: 13, subscription: "اشتراك الأسبوعي", image_link: "https://via.placeholder.com/150", payment: 0, price: 650, status: "active" },
  
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "pending",
        },
        {
          id: 11,
          student: {
            id: 11,
            name: "الطالب 11",
            parentPhone: "123456789",
            subject: "علم النفس",
            address: "حي الزهراء",
          },
          date: "11/03/2025",
          start: "12:00:00",
          end: "",
          status: "processing",
        },
        {
          id: 12,
          student: {
            id: 12,
            name: "الطالب 12",
            parentPhone: "123456789",
            subject: "الاقتصاد",
            address: "شارع الكرامة",
          },
          date: "12/03/2025",
          start: "02:00:00",
          end: "03:10:00",
          status: "done",
        },
        {
          id: 13,
          student: {
            id: 13,
            name: "الطالب 13",
            parentPhone: "123456789",
            subject: "العلوم السياسية",
            address: "حي التعاون",
          },
          date: "13/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 2,
          student: {
            id: 2,
            name: "الطالب 2",
            parentPhone: "123456789",
            subject: "الرياضيات",
            address: "شارع النصر",
          },
          date: "02/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 3,
          student: {
            id: 3,
            name: "الطالب 3",
            parentPhone: "123456789",
            subject: "الفيزياء",
            address: "حي الزهور",
          },
          date: "03/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 4,
          student: {
            id: 4,
            name: "الطالب 4",
            parentPhone: "123456789",
            subject: "الكيمياء",
            address: "شارع القادسية",
          },
          date: "04/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 5,
          student: {
            id: 5,
            name: "الطالب 5",
            parentPhone: "123456789",
            subject: "الأحياء",
            address: "حي الأمل",
          },
          date: "05/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 6,
          student: {
            id: 6,
            name: "الطالب 6",
            parentPhone: "123456789",
            subject: "التاريخ",
            address: "شارع الحرية",
          },
          date: "06/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 7,
          student: {
            id: 7,
            name: "الطالب 7",
            parentPhone: "123456789",
            subject: "الجغرافيا",
            address: "حي النور",
          },
          date: "07/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 8,
          student: {
            id: 8,
            name: "الطالب 8",
            parentPhone: "123456789",
            subject: "اللغة الإنجليزية",
            address: "شارع السلام",
          },
          date: "08/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 9,
          student: {
            id: 9,
            name: "الطالب 9",
            parentPhone: "123456789",
            subject: "الفرنسية",
            address: "حي الشروق",
          },
          date: "09/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 10,
          student: {
            id: 10,
            name: "الطالب 10",
            parentPhone: "123456789",
            subject: "الفلسفة",
            address: "شارع الطموح",
          },
          date: "10/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
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
      sessions:[
        {
          id: 1,
          student: {
            id: 1,
            name: "الطالب 1",
            parentPhone: "123456789",
            subject: "اللغة العربية",
            address: "عنوان 1",
          },
          date: "01/03/2025",
          start: "",
          end: "",
          status: "cancelled",
        },
      ],
      status: "unactive",
    },
  ],
};
const initialSubscriptionsState: { data: Subscriptions[] } = {
  data: [
  { id: 1, name: "اشتراك يومي", price: 100, sessions: 1, status: "unactive" },
  { id: 2, name: "اشتراك أسبوعي", price: 500, sessions: 7, status: "active" },
  { id: 3, name: "اشتراك شهري", price: 1800, sessions: 30, status: "unactive" },
  { id: 4, name: "اشتراك نصف شهري", price: 1000, sessions: 15, status: "active" },
  { id: 5, name: "اشتراك سنوي", price: 20000, sessions: 365, status: "unactive" },
  { id: 6, name: "باقة الصباح", price: 300, sessions: 5, status: "active" },
  { id: 7, name: "باقة المساء", price: 400, sessions: 6, status: "unactive" },
  { id: 8, name: "باقة نهاية الأسبوع", price: 600, sessions: 3, status: "active" },
  { id: 9, name: "اشتراك رياضي", price: 1500, sessions: 20, status: "unactive" },
  { id: 10, name: "اشتراك عائلي", price: 5000, sessions: 50, status: "active" },
  { id: 11, name: "اشتراك شخصي", price: 800, sessions: 10, status: "unactive" },
  { id: 12, name: "اشتراك المؤسسات", price: 15000, sessions: 300, status: "active" },
  { id: 13, name: "اشتراك تجريبي", price: 50, sessions: 1, status: "unactive" },
  { id: 14, name: "اشتراك الطلاب", price: 700, sessions: 12, status: "active" },
  { id: 15, name: "اشتراك كبار السن", price: 600, sessions: 10, status: "unactive" },
  ],
};
const initialSessionsSecState: { data: SessionsSec[] } = {
  data:[
    {
      id: 1,
      student: "Student 1",
      teacher: "Teacher 1",
      teacherPhone: "01556665556",
      date: "2023-01-01",
      subscription: "اشتراك المؤسسات",
      start: "",
      end: "",
      status: "pending",
      active: "active",
    },
    {
      id: 2,
      student: "Student 2",
      teacher: "Teacher 2",
      teacherPhone: "01556665556",
      date: "2023-01-02",
      subscription: "اشتراك شخصي",
      start: "",
      end: "",
      status: "processing",
      active: "active",
    },
    {
      id: 3,
      student: "Student 3",
      teacher: "Teacher 3",
      teacherPhone: "01556665556",
      date: "2023-01-03",
      subscription: "اشتراك نصف شهري",
      start: "",
      end: "",
      status: "done",
      active: "active",
    },
    {
      id: 4,
      student: "Student 4",
      teacher: "Teacher 4",
      teacherPhone: "01556665556",
      date: "2023-01-04",
      subscription: "اشتراك يومي",
      start: "",
      end: "",
      status: "canceled",
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
        { id: 2, student: { id: 2, name: "سارة محمود", address: "٥٠ شارع الجامعة", subject: "العلوم" }, start: "", end: "", status: "pending" },
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
      "day": "07/03/2025",
      "sessions": [
        { id: 12, student: { id: 12, name: "ماهر توفيق", address: "٦ شارع الشهداء", subject: "علم النفس" }, start: "", end: "", status: "pending" },
      ]
    },
    {
      "day": "08/03/2025",
      "sessions": [
        { id: 13, student: { id: 13, name: "رنا ياسر", address: "٨ شارع بورسعيد", subject: "علم الاجتماع" }, start: "", end: "", status: "pending" },
        { id: 14, student: { id: 14, name: "سامي يوسف", address: "٣ شارع الفسطاط", subject: "الاقتصاد" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "09/03/2025",
      "sessions": [
        { id: 15, student: { id: 15, name: "لينا حسن", address: "٢ شارع العروبة", subject: "البرمجة" }, start: "10:30:00", end: "11:30:00", status: "done" },
        { id: 16, student: { id: 16, name: "كريم علاء", address: "١٠ شارع الفجالة", subject: "الإحصاء" }, start: "12:00:00", end: "13:00:00", status: "done" },
        { id: 17, student: { id: 17, name: "هدى طارق", address: "٢٣ شارع مصدق", subject: "الهندسة" }, start: "14:00:00", end: "15:00:00", status: "done" },
      ]
    },
    {
      "day": "10/03/2025",
      "sessions": [
        { id: 18, student: { id: 18, name: "أيمن شعبان", address: "٧ شارع عبد الخالق", subject: "اللغات الأجنبية" }, start: "15:30:00", end: "16:30:00", status: "done" },
        { id: 19, student: { id: 19, name: "نور حسن", address: "٤ شارع الجيش", subject: "التصميم الجرافيكي" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "11/03/2025",
      "sessions": [
        { id: 20, student: { id: 8, name: "خالد شريف", address: "١٢ شارع النصر", subject: "الجغرافيا" }, start: "10:00:00", end: "11:00:00", status: "done" },
        { id: 21, student: { id: 9, name: "هند عبد الله", address: "٤٤ شارع القومية", subject: "الموسيقى" }, start: "11:30:00", end: "12:30:00", status: "done" },
        { id: 22, student: { id: 10, name: "حسن إبراهيم", address: "٩ شارع الأزهر", subject: "الفن" }, start: "13:00:00", end: "14:00:00", status: "done" },
      ]
    },
    {
      "day": "12/03/2025",
      "sessions": [
        { id: 23, student: { id: 11, name: "لمياء أشرف", address: "١٥ شارع رمسيس", subject: "الفلسفة" }, start: "14:30:00", end: "15:30:00", status: "done" },
        { id: 24, student: { id: 12, name: "ماهر توفيق", address: "٦ شارع الشهداء", subject: "علم النفس" }, start: "", end: "", status: "pending" },
        { id: 25, student: { id: 13, name: "رنا ياسر", address: "٨ شارع بورسعيد", subject: "علم الاجتماع" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "13/03/2025",
      "sessions": [
        { id: 26, student: { id: 1, name: "محمد علي", address: "٢١ شارع النيل", subject: "الرياضيات" }, start: "", end: "", status: "pending" },
        { id: 27, student: { id: 2, name: "سارة محمود", address: "٥٠ شارع الجامعة", subject: "العلوم" }, start: "", end: "", status: "pending" },
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
        { id: 31, student: { id: 6, name: "ندى عمر", address: "٧ شارع الهرم", subject: "الأحياء" }, start: "17:30:00", end: "18:30:00", status: "done" },
      ]
    },
    {
      "day": "17/03/2025",
      "sessions": [
        { id: 32, student: { id: 1, name: "محمد علي", address: "٢١ شارع النيل", subject: "الرياضيات" }, start: "", end: "", status: "pending" },
        { id: 33, student: { id: 2, name: "سارة محمود", address: "٥٠ شارع الجامعة", subject: "العلوم" }, start: "", end: "", status: "pending" },
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
        { id: 45, student: { id: 15, name: "لينا حسن", address: "٢ شارع العروبة", subject: "البرمجة" }, start: "10:30:00", end: "11:30:00", status: "done" },
        { id: 46, student: { id: 16, name: "كريم علاء", address: "١٠ شارع الفجالة", subject: "الإحصاء" }, start: "12:00:00", end: "13:00:00", status: "done" },
        { id: 47, student: { id: 17, name: "هدى طارق", address: "٢٣ شارع مصدق", subject: "الهندسة" }, start: "14:00:00", end: "15:00:00", status: "done" },
      ]
    },
    {
      "day": "26/03/2025",
      "sessions": [
        { id: 48, student: { id: 18, name: "أيمن شعبان", address: "٧ شارع عبد الخالق", subject: "اللغات الأجنبية" }, start: "15:30:00", end: "16:30:00", status: "done" },
        { id: 49, student: { id: 19, name: "نور حسن", address: "٤ شارع الجيش", subject: "التصميم الجرافيكي" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "27/03/2025",
      "sessions": [
        { id: 50, student: { id: 8, name: "خالد شريف", address: "١٢ شارع النصر", subject: "الجغرافيا" }, start: "10:00:00", end: "11:00:00", status: "done" },
        { id: 51, student: { id: 9, name: "هند عبد الله", address: "٤٤ شارع القومية", subject: "الموسيقى" }, start: "11:30:00", end: "12:30:00", status: "done" },
        { id: 52, student: { id: 10, name: "حسن إبراهيم", address: "٩ شارع الأزهر", subject: "الفن" }, start: "13:00:00", end: "14:00:00", status: "done" },
      ]
    },
    {
      "day": "28/03/2025",
      "sessions": [
        { id: 53, student: { id: 11, name: "لمياء أشرف", address: "١٥ شارع رمسيس", subject: "الفلسفة" }, start: "14:30:00", end: "15:30:00", status: "done" },
        { id: 54, student: { id: 12, name: "ماهر توفيق", address: "٦ شارع الشهداء", subject: "علم النفس" }, start: "", end: "", status: "pending" },
        { id: 55, student: { id: 13, name: "رنا ياسر", address: "٨ شارع بورسعيد", subject: "علم الاجتماع" }, start: "", end: "", status: "pending" }
      ]
    },
    {
      "day": "29/03/2025",
      "sessions": [
        { id: 56, student: { id: 1, name: "محمد علي", address: "٢١ شارع النيل", subject: "الرياضيات" }, start: "", end: "", status: "pending" },
        { id: 57, student: { id: 2, name: "سارة محمود", address: "٥٠ شارع الجامعة", subject: "العلوم" }, start: "", end: "", status: "pending" },
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
    setSubscriptions: (state, action) => {
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
export const { setSubscriptions, removePackage } = subscriptionsSlice.actions;
export const { setSessionsSec, removeSessions } = sessionsSecSlice.actions;
export const { setSessionsTeacher } = sessionTeacherSlice.actions;

export const userReducer = userSlice.reducer;
export const studentsReducer = studentsSlice.reducer;
export const teachersReducer = teachersSlice.reducer;
export const subscriptionsReducer = subscriptionsSlice.reducer;
export const sessionsSecReducer = sessionsSecSlice.reducer;
export const sessionsTeacherReducer = sessionTeacherSlice.reducer;

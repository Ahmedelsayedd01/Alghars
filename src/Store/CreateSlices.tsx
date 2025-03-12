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
  // data:[
  //   { id: 1, name: "الطالب 1", category: "المرحلة الابتدائية", parentPhone: "123456789", address: "العنوان 1", countClass: 5, subscription: "اشتراك سنوي", image_link: "https://via.placeholder.com/150", payment: 0, price: 100, status: "active" },
  //   { id: 2, name: "الطالب 2", category: "المرحلة الإعدادية", parentPhone: "987654321", address: "العنوان 2", countClass: 7, subscription: "اشتراك الشهري", image_link: "https://via.placeholder.com/150", payment: 1, price: 200, status: "inactive" },
  //   { id: 3, name: "الطالب 3", category: "المرحلة الثانوية", parentPhone: "112233445", address: "العنوان 3", countClass: 10, subscription: "اشتراك الأسبوعي", image_link: "https://via.placeholder.com/150", payment: 2, price: 300, status: "active" },
  //   { id: 4, name: "الطالب 4", category: "رياض الأطفال", parentPhone: "556677889", address: "العنوان 4", countClass: 3, subscription: "اشتراك الفصلي", image_link: "https://via.placeholder.com/150", payment: 2, price: 150, status: "inactive" },
  //   { id: 5, name: "الطالب 5", category: "المرحلة الابتدائية", parentPhone: "443322110", address: "العنوان 5", countClass: 6, subscription: "اشتراك سنوي", image_link: "https://via.placeholder.com/150", payment: 1, price: 500, status: "active" },
  //   { id: 6, name: "الطالب 6", category: "المرحلة الإعدادية", parentPhone: "991122334", address: "العنوان 6", countClass: 8, subscription: "اشتراك الشهري", image_link: "https://via.placeholder.com/150", payment: 0, price: 400, status: "inactive" },
  //   { id: 7, name: "الطالب 7", category: "المرحلة الثانوية", parentPhone: "223344556", address: "العنوان 7", countClass: 12, subscription: "اشتراك الأسبوعي", image_link: "https://via.placeholder.com/150", payment: 0, price: 600, status: "active" },
  //   { id: 8, name: "الطالب 8", category: "رياض الأطفال", parentPhone: "778899001", address: "العنوان 8", countClass: 4, subscription: "اشتراك الفصلي", image_link: "https://via.placeholder.com/150", payment: 1, price: 250, status: "inactive" },
  //   { id: 9, name: "الطالب 9", category: "المرحلة الابتدائية", parentPhone: "665544332", address: "العنوان 9", countClass: 5, subscription: "اشتراك سنوي", image_link: "https://via.placeholder.com/150", payment: 1, price: 700, status: "active" },
  //   { id: 10, name: "الطالب 10", category: "المرحلة الإعدادية", parentPhone: "112244668", address: "العنوان 10", countClass: 9, subscription: "اشتراك الشهري", image_link: "https://via.placeholder.com/150", payment: 2, price: 350, status: "inactive" },
  //   { id: 11, name: "الطالب 11", category: "المرحلة الثانوية", parentPhone: "998877665", address: "العنوان 11", countClass: 11, subscription: "اشتراك الأسبوعي", image_link: "https://via.placeholder.com/150", payment: 2, price: 550, status: "active" },
  //   { id: 12, name: "الطالب 12", category: "رياض الأطفال", parentPhone: "887766554", address: "العنوان 12", countClass: 3, subscription: "اشتراك الفصلي", image_link: "https://via.placeholder.com/150", payment: 0, price: 150, status: "inactive" },
  //   { id: 13, name: "الطالب 13", category: "المرحلة الابتدائية", parentPhone: "665577889", address: "العنوان 13", countClass: 7, subscription: "اشتراك سنوي", image_link: "https://via.placeholder.com/150", payment: 2, price: 800, status: "active" },
  //   { id: 14, name: "الطالب 14", category: "المرحلة الإعدادية", parentPhone: "556688990", address: "العنوان 14", countClass: 10, subscription: "اشتراك الشهري", image_link: "https://via.placeholder.com/150", payment: 1, price: 450, status: "inactive" },
  //   { id: 15, name: "الطالب 15", category: "المرحلة الثانوية", parentPhone: "445566778", address: "العنوان 15", countClass: 13, subscription: "اشتراك الأسبوعي", image_link: "https://via.placeholder.com/150", payment: 0, price: 650, status: "active" },
  // ],
  data: [],
};
const initialTeachersState: { data: Teachers[] } = {
  // data: [
  //   {
  //     id: 1,
  //     name: "Teacher 1",
  //     email: "teacher1@example.com",
  //     phone: "123456789",
  //     address: "Address 1",
  //     countClass: 5,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Arabic",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "pending",
  //       },
  //       {
  //         id: 11,
  //         student: {
  //           id: 11,
  //           name: "الطالب 11",
  //           parentPhone: "123456789",
  //           subscription: "علم النفس",
  //           address: "حي الزهراء",
  //         },
  //         date: "11/03/2025",
  //         start: "12:00:00",
  //         end: "",
  //         status: "processing",
  //       },
  //       {
  //         id: 12,
  //         student: {
  //           id: 12,
  //           name: "الطالب 12",
  //           parentPhone: "123456789",
  //           subscription: "الاقتصاد",
  //           address: "شارع الكرامة",
  //         },
  //         date: "12/03/2025",
  //         start: "02:00:00",
  //         end: "03:10:00",
  //         status: "done",
  //       },
  //       {
  //         id: 13,
  //         student: {
  //           id: 13,
  //           name: "الطالب 13",
  //           parentPhone: "123456789",
  //           subscription: "العلوم السياسية",
  //           address: "حي التعاون",
  //         },
  //         date: "13/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     name: "Teacher 2",
  //     email: "teacher2@example.com",
  //     phone: "987654321",
  //     address: "Address 2",
  //     countClass: 4,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Math",
  //     sessions:[
  //       {
  //         id: 2,
  //         student: {
  //           id: 2,
  //           name: "الطالب 2",
  //           parentPhone: "123456789",
  //           subscription: "الرياضيات",
  //           address: "شارع النصر",
  //         },
  //         date: "02/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 3,
  //     name: "Teacher 3",
  //     email: "teacher3@example.com",
  //     phone: "111222333",
  //     address: "Address 3",
  //     countClass: 6,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Science",
  //     sessions:[
  //       {
  //         id: 3,
  //         student: {
  //           id: 3,
  //           name: "الطالب 3",
  //           parentPhone: "123456789",
  //           subscription: "الفيزياء",
  //           address: "حي الزهور",
  //         },
  //         date: "03/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "inactive",
  //   },
  //   {
  //     id: 4,
  //     name: "Teacher 4",
  //     email: "teacher4@example.com",
  //     phone: "444555666",
  //     address: "Address 4",
  //     countClass: 3,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "English",
  //     sessions:[
  //       {
  //         id: 4,
  //         student: {
  //           id: 4,
  //           name: "الطالب 4",
  //           parentPhone: "123456789",
  //           subscription: "الكيمياء",
  //           address: "شارع القادسية",
  //         },
  //         date: "04/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 5,
  //     name: "Teacher 5",
  //     email: "teacher5@example.com",
  //     phone: "777888999",
  //     address: "Address 5",
  //     countClass: 2,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "History",
  //     sessions:[
  //       {
  //         id: 5,
  //         student: {
  //           id: 5,
  //           name: "الطالب 5",
  //           parentPhone: "123456789",
  //           subscription: "الأحياء",
  //           address: "حي الأمل",
  //         },
  //         date: "05/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 6,
  //     name: "Teacher 6",
  //     email: "teacher6@example.com",
  //     phone: "123123123",
  //     address: "Address 6",
  //     countClass: 7,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Geography",
  //     sessions:[
  //       {
  //         id: 6,
  //         student: {
  //           id: 6,
  //           name: "الطالب 6",
  //           parentPhone: "123456789",
  //           subscription: "التاريخ",
  //           address: "شارع الحرية",
  //         },
  //         date: "06/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "inactive",
  //   },
  //   {
  //     id: 7,
  //     name: "Teacher 7",
  //     email: "teacher7@example.com",
  //     phone: "456456456",
  //     address: "Address 7",
  //     countClass: 4,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Physics",
  //     sessions:[
  //       {
  //         id: 7,
  //         student: {
  //           id: 7,
  //           name: "الطالب 7",
  //           parentPhone: "123456789",
  //           subscription: "الجغرافيا",
  //           address: "حي النور",
  //         },
  //         date: "07/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 8,
  //     name: "Teacher 8",
  //     email: "teacher8@example.com",
  //     phone: "789789789",
  //     address: "Address 8",
  //     countClass: 5,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Chemistry",
  //     sessions:[
  //       {
  //         id: 8,
  //         student: {
  //           id: 8,
  //           name: "الطالب 8",
  //           parentPhone: "123456789",
  //           subscription: "اللغة الإنجليزية",
  //           address: "شارع السلام",
  //         },
  //         date: "08/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 9,
  //     name: "Teacher 9",
  //     email: "teacher9@example.com",
  //     phone: "321321321",
  //     address: "Address 9",
  //     countClass: 6,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Biology",
  //     sessions:[
  //       {
  //         id: 9,
  //         student: {
  //           id: 9,
  //           name: "الطالب 9",
  //           parentPhone: "123456789",
  //           subscription: "الفرنسية",
  //           address: "حي الشروق",
  //         },
  //         date: "09/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "inactive",
  //   },
  //   {
  //     id: 10,
  //     name: "Teacher 10",
  //     email: "teacher10@example.com",
  //     phone: "654654654",
  //     address: "Address 10",
  //     countClass: 3,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Computer Science",
  //     sessions:[
  //       {
  //         id: 10,
  //         student: {
  //           id: 10,
  //           name: "الطالب 10",
  //           parentPhone: "123456789",
  //           subscription: "الفلسفة",
  //           address: "شارع الطموح",
  //         },
  //         date: "10/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 11,
  //     name: "Teacher 11",
  //     email: "teacher11@example.com",
  //     phone: "987987987",
  //     address: "Address 11",
  //     countClass: 4,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Economics",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "inactive",
  //   },
  //   {
  //     id: 12,
  //     name: "Teacher 12",
  //     email: "teacher12@example.com",
  //     phone: "147258369",
  //     address: "Address 12",
  //     countClass: 5,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Philosophy",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 13,
  //     name: "Teacher 13",
  //     email: "teacher13@example.com",
  //     phone: "258369147",
  //     address: "Address 13",
  //     countClass: 3,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Music",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 14,
  //     name: "Teacher 14",
  //     email: "teacher14@example.com",
  //     phone: "369147258",
  //     address: "Address 14",
  //     countClass: 6,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Art",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "inactive",
  //   },
  //   {
  //     id: 15,
  //     name: "Teacher 15",
  //     email: "teacher15@example.com",
  //     phone: "123654789",
  //     address: "Address 15",
  //     countClass: 7,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Physical Education",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 16,
  //     name: "Teacher 16",
  //     email: "teacher16@example.com",
  //     phone: "987321654",
  //     address: "Address 16",
  //     countClass: 4,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Literature",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 17,
  //     name: "Teacher 17",
  //     email: "teacher17@example.com",
  //     phone: "456789123",
  //     address: "Address 17",
  //     countClass: 5,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Drama",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "inactive",
  //   },
  //   {
  //     id: 18,
  //     name: "Teacher 18",
  //     email: "teacher18@example.com",
  //     phone: "789123456",
  //     address: "Address 18",
  //     countClass: 6,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "Social Studies",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 19,
  //     name: "Teacher 19",
  //     email: "teacher19@example.com",
  //     phone: "321654987",
  //     address: "Address 19",
  //     countClass: 3,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "French",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "active",
  //   },
  //   {
  //     id: 20,
  //     name: "Teacher 20",
  //     email: "teacher20@example.com",
  //     phone: "654987321",
  //     address: "Address 20",
  //     countClass: 4,
  //     image_link: "https://via.placeholder.com/150",
  //     subscription: "German",
  //     sessions:[
  //       {
  //         id: 1,
  //         student: {
  //           id: 1,
  //           name: "الطالب 1",
  //           parentPhone: "123456789",
  //           subscription: "اللغة العربية",
  //           address: "عنوان 1",
  //         },
  //         date: "01/03/2025",
  //         start: "",
  //         end: "",
  //         status: "cancelled",
  //       },
  //     ],
  //     status: "inactive",
  //   },
  // ],
  data: [],
};
const initialSubscriptionsState: { data: Subscriptions[] } = {
  // data: [
  // { id: 1, name: "اشتراك يومي", price: 100, sessions: 1, status: "inactive" },
  // { id: 2, name: "اشتراك أسبوعي", price: 500, sessions: 7, status: "active" },
  // { id: 3, name: "اشتراك شهري", price: 1800, sessions: 30, status: "inactive" },
  // { id: 4, name: "اشتراك نصف شهري", price: 1000, sessions: 15, status: "active" },
  // { id: 5, name: "اشتراك سنوي", price: 20000, sessions: 365, status: "inactive" },
  // { id: 6, name: "باقة الصباح", price: 300, sessions: 5, status: "active" },
  // { id: 7, name: "باقة المساء", price: 400, sessions: 6, status: "inactive" },
  // { id: 8, name: "باقة نهاية الأسبوع", price: 600, sessions: 3, status: "active" },
  // { id: 9, name: "اشتراك رياضي", price: 1500, sessions: 20, status: "inactive" },
  // { id: 10, name: "اشتراك عائلي", price: 5000, sessions: 50, status: "active" },
  // { id: 11, name: "اشتراك شخصي", price: 800, sessions: 10, status: "inactive" },
  // { id: 12, name: "اشتراك المؤسسات", price: 15000, sessions: 300, status: "active" },
  // { id: 13, name: "اشتراك تجريبي", price: 50, sessions: 1, status: "inactive" },
  // { id: 14, name: "اشتراك الطلاب", price: 700, sessions: 12, status: "active" },
  // { id: 15, name: "اشتراك كبار السن", price: 600, sessions: 10, status: "inactive" },
  // ],
  data: [],
};
const initialSessionsSecState: { data: SessionsSec[] } = {
  // data:[
  //   {
  //     id: 1,
  //     student: "Student 1",
  //     teacher: "Teacher 1",
  //     teacherPhone: "01556665556",
  //     date: "2023-01-01",
  //     subscription: "اشتراك المؤسسات",
  //     start: "",
  //     end: "",
  //     status: "pending",
  //     active: "active",
  //   },
  //   {
  //     id: 2,
  //     student: "Student 2",
  //     teacher: "Teacher 2",
  //     teacherPhone: "01556665556",
  //     date: "2023-01-02",
  //     subscription: "اشتراك شخصي",
  //     start: "",
  //     end: "",
  //     status: "processing",
  //     active: "active",
  //   },
  //   {
  //     id: 3,
  //     student: "Student 3",
  //     teacher: "Teacher 3",
  //     teacherPhone: "01556665556",
  //     date: "2023-01-03",
  //     subscription: "اشتراك نصف شهري",
  //     start: "",
  //     end: "",
  //     status: "done",
  //     active: "active",
  //   },
  //   {
  //     id: 4,
  //     student: "Student 4",
  //     teacher: "Teacher 4",
  //     teacherPhone: "01556665556",
  //     date: "2023-01-04",
  //     subscription: "اشتراك يومي",
  //     start: "",
  //     end: "",
  //     status: "canceled",
  //     active: "active",
  //   },
  // ],
  data: [],
};

const initialSessionsTeacerState: { data: ScheduleSessions[] } = {
  data: [
    {
      day: "15/03/2025",
      sessions: [
        {
          id: 1,
          student: {
            id: 1,
            category: "dfd",
            image_link: "",
            countClass: 0,
            parent_phone: "",
            payment_method: "0",
            price: 0,
            status: "",
            name: "محمد علي",
            address: "٢١ شارع النيل",
            subscription: {
              id: 1,
              name: "الرياضيات",
              sessionCount: 2,
              price: 100,
              status: "active",
            },
          },
          start: "",
          end: "",
          status: "pending",
        },
      ],
    },
  ],
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
    //     removesubscription: (state, action: PayloadAction<number>) => {
    //       state.data = state.data.filter(
    //         (subscription: { id: number }) => subscription.id !== action.payload
    //       );
    //     },
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

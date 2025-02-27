// types.ts
interface AuthContextType {
       userState: any;
       loginUser: (userData: any) => void;
       logout: () => void;
       toastSuccess: (text: any) => any;
       toastError: (text: any) => any;
       hideSide: (isHidden: boolean) => void;
       hideSidebar: any;
     }
     
     interface Teachers {
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        countClass: number;
        image_link: string;
        subject: string;
        status: number;
    }

     interface Students {
      id: number;
      name: string;
      category: string;
      parentPhone: string;
      address: string;
      countClass: number;
      subscription: number;
      image_link: string;
      payment: string;
      status: number;
    }
    interface Subjects {
      id: number;
      name: string;
      status: number;
    }
    interface Classes {
      id: number;
      student: string;
      teacher: string;
      date: string;
      teacherPhone: string;
      subject: string;
      start: string;
      end: string;
      price: number;
      status: string;
      active: number;
    }

     interface PostOptions {
      url: string;
      login?: boolean;
      type?: boolean;
    }
     interface ChangeStateOptions {
      url: string;
      message: string;
      data: number;
    }

     interface LogoProps {
      width: number;
      height: number;
    }
    interface Obj {
      name: string;
      id: number;
    }

     export type { AuthContextType, Teachers, Students, Subjects, Classes , PostOptions, ChangeStateOptions,LogoProps,Obj };
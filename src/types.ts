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
        sessions:Array<{
            id: number;
            student: {
              id: number;
              name:string;
              parentPhone:string;
              subject:string;
              address:string;
            };
            date: string;
            start: string;
            end: string;
            status: string;

        }>;
        status: string;
    }

    interface TeacherSessions {
      sessions: Array<{
        id: number;
        student: {
          id: number;
          name:string;
          parentPhone:string;
          subject:string;
          address:string;
        };
        date: string;
        start: string;
        end: string;
        status: string;

      }>;
    }

    interface TeacherSession{
        id: number;
        student: {
            id: number;
            name:string;
            subject:string;
            parentPhone:string;
            address:string;
        };
        date: string;
        start: string;
        end: string;
        status: string;

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
      status: string;
    }
    interface Subjects {
      id: number;
      name: string;
      status: string;
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
      active: string;
    }

     interface PostOptions {
      url: string;
      login?: boolean;
      type?: boolean;
    }
     interface ChangeStateOptions {
      url: string;
      message: string;
      data: string;
    }

     interface LogoProps {
      width: number;
      height: number;
    }
    interface Obj {
      name: string;
      id: number;
    }

    interface ScheduleSessions {
      day: string;
      sessions: Array<{
        id: number;
        student: {
          id: number;
          name: string;
          subject: string;
          address: string;
        };
        start: string;
        end: string;
        status: string;
      }>;
    }
    interface Sessions {
      day: string;
      sessions: Array<{
        id: number;
        student: {
          id: number;
          name: string;
          subject: string;
          address: string;
        };
        start: string;
        end: string;
        status: string;
      }>;
    }
    interface Session {
      id: number;
      student:{
        id: number;
          name: string;
          subject: string;
          address: string;
      };
      start: string;
      end: string;
      status: string;
    }

     export type { AuthContextType, Teachers, TeacherSessions, TeacherSession, Students, Subjects, Classes , PostOptions, ChangeStateOptions,LogoProps,Obj, ScheduleSessions,Sessions, Session };
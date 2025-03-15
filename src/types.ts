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
        sessionCount: number;
        avatar: string;
        subject: string;
        sessions:Sessions;
        status: string;
    }

    interface Subscriptions{
      id:number;
      name:string;
      sessionCount:number;
      price:number;
      status:string;
    }

    interface TeacherSessions {
      sessions: Array<{
        id: number;
        student:Students;
        date: string;
        start: string;
        end: string;
        status: string;

      }>;
    }

    interface TeacherSession{
        id: number;
        student: Students;
        date: string;
        start: string;
        end: string;
        status: string;
    }

     interface Students {
      id: number;
      name: string;
      address: string;
      parent_phone: string;
      image_link: string;
      category: string;
      subscription: Subscriptions;
      sessionsLimite: string;
      sessionCount: number;
      payment_method: string;
      price: number;
      status: string;
    }
    interface SessionsSec {
      id: number;
      student: Students;
      teacher: Teachers;
      teacherPhone: string;
      subscription: string;
      date: string;
      // subject: string;
      start: string;
      end: string;
      // price: number;
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
      date: string;
      sessions: Array<{
        Session_id: number;
        student:Students;
        start: string;
        end: string;
        status: string;
      }>;
    }
    interface Sessions {
      day: string;
      sessions: Array<{
        Session_id: number;
        student:Students;
        start: string;
        end: string;
        status: string;
      }>;
    }
    interface Session {
      Session_id: number;
      student:Students;
      start: string;
      end: string;
      status: string;
    }

     export type { AuthContextType, Teachers, TeacherSessions, TeacherSession, Students, Subscriptions, SessionsSec , PostOptions, ChangeStateOptions,LogoProps,Obj, ScheduleSessions,Sessions, Session };
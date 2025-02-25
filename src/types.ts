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
     
     // Add other interfaces here...
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

     export type { AuthContextType, PostOptions, ChangeStateOptions,LogoProps,Obj };
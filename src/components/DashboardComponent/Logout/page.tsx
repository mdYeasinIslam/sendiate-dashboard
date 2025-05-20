import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import box from "../../../../public/images/box.png"
import Image from "next/image";
import { LogOut } from "lucide-react";

const page = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center justify-start text-lg font-semibold hover:text-black text-red-500 hover:bg-red-500  w-[216px] p-2 gap-2 rounded-[8px] dark:bg-[#fbe7e8] bg-[#fbe7e8]">
          <p className=" flex flex-row justify-start gap-2 items-center"> <LogOut />Logout</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
        <Image
            src={box}
            alt="Login Image"  
            className=" h-[75px] w-[91px] rounded-lg"
            width={500}
            height={500}
            
            />
          <AlertDialogTitle>Log out Securely</AlertDialogTitle>
          <AlertDialogDescription>
            You have been successfully signed out of the dashboard. Please close
            your browser or log in again to continue managing the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-12 py-5 rounded-sm bg-[#C2F3CD]">
            No
          </AlertDialogCancel>
          <AlertDialogAction className="px-12 py-5 bg-[#36C556] rounded-sm text-black ">
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default page;

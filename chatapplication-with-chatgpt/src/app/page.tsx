import Image from "next/image";
import Sidebar from "@/app/components/sidebar";
import Chat from "@/app/components/Chat";

export default function Home() {
  return (
      <div className="flex h-screen justify-center items-center">
        <div className="h-full flex" style={{ width: "1280px" }}>
            <div className="w-1/5 h-full">
                <Sidebar/>
            </div>
            <div className="w-4/5 f-full">
                <Chat/>
            </div>
        </div>
      </div>
  );
}

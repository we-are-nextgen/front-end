

import { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getProfile } from "@/lib/controllers/profileController"

export default async function ItProfessionalLayout({ children }: { children: ReactNode }) {
  const profile = await getProfile();
  return (
    
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header profile={profile}/>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

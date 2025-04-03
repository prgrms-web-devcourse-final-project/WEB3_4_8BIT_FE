import type { ReactNode } from "react"
import { Sidebar } from "@/components/SideBar";

export default function UserMyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Sidebar />
          </div>
          <div className="md:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
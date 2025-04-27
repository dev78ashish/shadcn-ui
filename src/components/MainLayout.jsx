import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from '../Components/AppSidebar'
import RoutesComp from '../Routes/RoutesComp'


const MainLayout = () => {
  return (
    <SidebarProvider>
        <div className="flex w-full min-h-screen">
          {/* <AppSidebar /> */}

          <div className="flex-1 w-full flex flex-col">
            <header className="bg-gray-100  p-4 shadow flex items-center justify-between">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">My App</h1>
            </header>

            <main className="p-4">
              
            </main>
          </div>
        </div>
      </SidebarProvider>
  )
}

export default MainLayout
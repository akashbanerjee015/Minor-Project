import React, { useState } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Circle, Home, Inbox, Layers, Search, Settings, UserCircle, Wallet } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import AiTools from '@/app/(routes)/dashboard/_components/AITools'

const items = [
    {
        title: "Workspace",
        url: "/dashboard",
        icon: Layers,
    },
    {
        title: "AI Tools",
        url: "/dashboard",
        icon: Inbox,
    },
    {
        title: "Billing",
        url: "/billing",
        icon: Wallet,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: UserCircle,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    const path = usePathname();
    const [openSheet, setOpenSheet] = useState<string | null>(null)
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    {/* use the public/ path for static assets in Next.js */}
                    <Image src="/logo.jpg" alt='logo' width={100} height={70} className='w-full' />
                    <h2 className='text-sm text-gray-400 text-center mt-3'>Build Awesome Skills</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-2'>
                            {items.map((item, index) => {
                                // For placeholder items (url === '#') open an in-app Sheet
                                if (item.url === '#') {
                                    return (
                                        <div key={index} className="p-2">
                                            <Sheet open={openSheet === item.title} onOpenChange={(open) => setOpenSheet(open ? item.title : null)}>
                                                <SheetTrigger asChild>
                                                    <button className={`w-full text-left p-3 text-lg flex gap-2 items-center hover:bg-gray-100 rounded-lg ${openSheet === item.title ? 'bg-gray-200' : ''}`}>
                                                        <item.icon className='h-5 w-5' />
                                                        <span>{item.title}</span>
                                                    </button>
                                                </SheetTrigger>
                                                <SheetContent side="right" className="w-[--sidebar-width] p-4">
                                                    {item.title === 'AI Tools' ? <AiTools /> : <div className='p-4'><h2 className='text-lg font-semibold'>{item.title}</h2><p className='text-sm text-muted-foreground'>Content coming soon.</p></div>}
                                                </SheetContent>
                                            </Sheet>
                                        </div>
                                    )
                                }

                                return (
                                    <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center hover:bg-gray-100 rounded-lg ${path?.includes(item.url) ? 'bg-gray-200' : ''}`}>
                                        <item.icon className='h-5 w-5' />
                                        <span>{item.title}</span>
                                    </a>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
           
        </Sidebar>
    )
}
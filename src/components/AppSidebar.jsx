import { useLocation, Link } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../redux/slices/authSlice";
import {
  LayoutDashboardIcon,
  ChartAreaIcon,
  Phone,
  BandageIcon,
  Settings,
  LogOut,
  FormInput
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";

import { Button } from '@/components/ui/button';
import { useDispatch } from "react-redux";

const items = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: LayoutDashboardIcon
  },
  {
    title: "Revenue",
    url: "/revenue",
    icon: ChartAreaIcon
  },
  {
    title: "Data",
    url: "/data",
    icon: BandageIcon
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Phone
  },
  {
    title: "Form",
    url: "/form",
    icon: FormInput
  }
];

export function AppSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.error("Logout successful!");
  };

  const isActive = (url) => location.pathname === url;

  return (
    <Sidebar>
      <SidebarHeader>Welcome to MyApp</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${isActive(item.url) ? "bg-gray-300 font-medium" : "hover:bg-gray-100"}`}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link
          to="/settings"
          className={`flex gap-2 px-2 py-1 rounded hover:bg-gray-200 ${isActive("/settings") ? "bg-gray-300 font-medium" : ""}`}
        >
          <Settings /> Settings
        </Link>
        <Button onClick={handleLogout}>
          <LogOut /> Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

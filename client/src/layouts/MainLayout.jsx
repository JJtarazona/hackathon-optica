import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Home,
  Users,
  Calendar,
  Archive,
  Package,
  FileText,
  Truck,
  ShoppingCart,
  Users2,
  BarChart3,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton, SignUpButton, useOrganization } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { getOpticaId } from "@/Redux/action/opticaAction";

const navOrganizacion = [
  { to: "/app/organizacion", label: "Organización", icon: Building2 },
];

const navItemsFull = [
  { to: "/app/dashboard", label: "Dashboard", icon: Home },
  { to: "/app/clientes", label: "Clientes", icon: Users },
  { to: "/app/formulas", label: "Fórmulas", icon: FileText },
  { to: "/app/turnos", label: "Turnos", icon: Calendar },
  { to: "/app/inventario", label: "Inventario", icon: Archive },
  { to: "/app/pedidos", label: "Pedidos", icon: Package },
  { to: "/app/entregas", label: "Entregas", icon: Truck },
  { to: "/app/facturacion", label: "Facturación", icon: ShoppingCart },
  { to: "/app/proveedores", label: "Proveedores", icon: Users2 },
  { to: "/app/reportes", label: "Reportes", icon: BarChart3 },
  { to: "/app/configuracion", label: "Configuración", icon: Settings },
  { to: "/app/organizacion", label: "Organización", icon: Building2 },
];

const SidebarLink = ({ item, collapsed, onClick }) => (
  <NavLink
    to={item.to}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        "flex  items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-150 group",
        "hover:bg-primary/90 hover:text-primary-foreground",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg"
          : "text-indigo-500 dark:text-slate-300 hover:text-white dark:hover:text-slate-100",
        collapsed ? "justify-center" : ""
      )
    }
  >
    <item.icon
      className={cn(
        "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
        collapsed ? "" : "mr-3"
      )}
    />
    <AnimatePresence>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap"
        >
          {item.label}
        </motion.span>
      )}
    </AnimatePresence>
  </NavLink>
);

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const opticaDatos = useSelector((state) => state.optica.opticaId);
  // const opticaId = opticaDatos[0]?.id;
  const opticaId = opticaDatos?.id;

  const { organization } = useOrganization();
  const organizacionId = organization?.id;

  console.log("Optica ID:", opticaDatos);

  useEffect(() => {
    dispatch(getOpticaId(organizacionId));
  }, [dispatch]);

  useEffect(() => {
    const root = window.document.documentElement;
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex h-screen text-foreground  transition-colors duration-300">
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? "5rem" : "16rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "hidden md:flex flex-col bg-card  shadow-2xl transition-all duration-300 ease-in-out overflow-y-auto overflow-x-hidden border-r border-border",
          "dark:bg-slate-900 dark:border-slate-700"
        )}
      >
        <div
          className={cn(
            "flex items-center p-4 border-b border-border dark:border-slate-700",
            sidebarCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!sidebarCollapsed && (
            <motion.h1
              className="text-2xl font-bold text-primary text-black dark:text-indigo-400 cursor-pointer"
              onClick={() => navigate("/app/dashboard")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              OptiCRM
            </motion.h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            {sidebarCollapsed ? (
              <ChevronsRight size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-1.5">
          {!opticaId || opticaId !== organizacionId
            ? navOrganizacion.map((item) => (
                <SidebarLink
                  key={item.to}
                  item={item}
                  collapsed={sidebarCollapsed}
                />
              ))
            : navItemsFull.map((item) => (
                <SidebarLink
                  key={item.to}
                  item={item}
                  collapsed={sidebarCollapsed}
                />
              ))}
        </nav>
      </motion.aside>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 flex md:hidden flex-col w-64 bg-card dark:bg-slate-900 shadow-2xl overflow-y-auto border-r border-border dark:border-slate-700"
          >
            <div className="flex items-center justify-between p-4 border-b border-border dark:border-slate-700">
              <h1
                className="text-2xl font-bold text-primary dark:text-indigo-400 cursor-pointer"
                onClick={() => {
                  navigate("/app/dashboard");
                  toggleMobileMenu();
                }}
              >
                OptiCRM
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                <ChevronsLeft size={20} />
              </Button>
            </div>
            {!opticaId || opticaId !== organizacionId
              ? navOrganizacion.map((item) => (
                  <SidebarLink
                    key={item.to}
                    item={item}
                    collapsed={false}
                    onClick={toggleMobileMenu}
                  />
                ))
              : navItemsFull.map((item) => (
                  <SidebarLink
                    key={item.to}
                    item={item}
                    collapsed={false}
                    onClick={toggleMobileMenu}
                  />
                ))}
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card dark:bg-slate-800 shadow-md p-3 sm:p-4 flex items-center justify-between border-b border-border dark:border-slate-700">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden text-muted-foreground hover:text-foreground hover:bg-accent mr-2"
          >
            <Menu size={24} />
          </Button>
          <div className="flex-grow"></div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <UserButton />
            <SignUpButton
              mode="modal"
              redirectUrl="/app/dashboard"
              className="hidden"
            />
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default MainLayout;

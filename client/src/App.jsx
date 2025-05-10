import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/DashboardPage";
import ClientesPage from "@/pages/ClientesPage";
import FormulasPage from "@/pages/FormulasPage";
import TurnosPage from "@/pages/TurnosPage";
import InventarioPage from "@/pages/InventarioPage";
import PedidosPage from "@/pages/PedidosPage";
import EntregasPage from "@/pages/EntregasPage";
import FacturacionPage from "@/pages/FacturacionPage";
import ProveedoresPage from "@/pages/ProveedoresPage";
import ConfiguracionPage from "@/pages/ConfiguracionPage";
import ReportesPage from "@/pages/ReportesPage";
import { Toaster } from "@/components/ui/toaster";
import { AnimatePresence } from "framer-motion";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignInButton,
  SignUpButton,
  ClerkLoaded,
} from "@clerk/clerk-react";

function App() {
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <ClerkLoaded>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Rutas públicas */}
            <Route path="/" element={<LandingPage />} />

            {/* Rutas protegidas */}
            <Route
              path="/app/*"
              element={
                <>
                  <SignedIn>
                    <MainLayout />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="clientes" element={<ClientesPage />} />
              <Route path="formulas" element={<FormulasPage />} />
              <Route path="turnos" element={<TurnosPage />} />
              <Route path="inventario" element={<InventarioPage />} />
              <Route path="pedidos" element={<PedidosPage />} />
              <Route path="entregas" element={<EntregasPage />} />
              <Route path="facturacion" element={<FacturacionPage />} />
              <Route path="proveedores" element={<ProveedoresPage />} />
              <Route path="reportes" element={<ReportesPage />} />
              <Route path="configuracion" element={<ConfiguracionPage />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Catch-all para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </ClerkLoaded>
      <Toaster />
    </>
  );
}

export default App;

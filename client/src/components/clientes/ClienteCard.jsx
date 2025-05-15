import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  MessageSquare,
  Mail,
  Phone,
  Eye,
  FileText as FileTextIcon,
  CalendarDays,
  Edit,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatDate, formatCurrency, formatFormField } from "@/lib/constants";
import { useReminders } from "../../hooks/useReminders";

const ClienteCard = ({ cliente, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { sendWhatsApp, sendEmail } = useReminders();
  const getInitials = (name, apellido) => {
    return `${name?.charAt(0) || ""}${apellido?.charAt(0) || ""}`.toUpperCase();
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
  };

  const handleViewFormulas = () => {
    navigate(`/formulas?clienteId=${cliente.id}`);
  };

  const handleScheduleAppointment = () => {
    navigate(`/turnos?clienteId=${cliente.id}&action=new`);
  };

  const getUltimaRXData = () => {
    if (!cliente.ultimaRX) return null;

    if (typeof cliente.ultimaRX === "string") {
      return {
        fecha: cliente.ultimaRX,
        od: cliente.formula?.od_sph ? { sph: cliente.formula.od_sph } : null,
        os: cliente.formula?.os_sph ? { sph: cliente.formula.os_sph } : null,
        condiciones: cliente.formula?.condiciones || [],
      };
    }
    return null;
  };

  const ultimaRXData = getUltimaRXData();

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <Card className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50">
        <CardHeader className="flex flex-row items-start justify-between space-x-4 pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  cliente.avatarUrl ||
                  `https://avatar.vercel.sh/${cliente.email}.png?size=60`
                }
                alt={`${cliente.nombre} ${cliente.apellido}`}
              />
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                {getInitials(cliente.nombre, cliente.apellido)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {cliente.nombre} {cliente.apellido}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {cliente.email || "No especificado"}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:bg-accent"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-popover text-popover-foreground border-border"
            >
              <DropdownMenuItem
                onClick={() => onEdit(cliente)}
                className="cursor-pointer hover:bg-accent"
              >
                <Edit className="mr-2 h-4 w-4" /> Editar Cliente
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                onClick={() => navigate(`/clientes/${cliente.id}`)}
                className="cursor-pointer hover:bg-accent"
              >
                <Eye className="mr-2 h-4 w-4" /> Ver Detalles (Próximamente)
              </DropdownMenuItem> */}
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuLabel>Recordatorios</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  try {
                    sendWhatsApp(cliente);
                  } catch (error) {
                    alert(error.message);
                  }
                }}
                className="cursor-pointer hover:bg-accent"
              >
                <Phone className="mr-2 h-4 w-4 text-green-500" /> WhatsApp
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  try {
                    sendEmail(cliente);
                  } catch (error) {
                    alert(error.message);
                  }
                }}
                className="cursor-pointer hover:bg-accent"
              >
                <Mail className="mr-2 h-4 w-4 text-blue-500" /> Email
              </DropdownMenuItem>

              {/* <DropdownMenuItem
                onClick={() => onDelete(cliente.id)}
                className="text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar Cliente
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="flex-grow space-y-3 text-sm pt-2">
          {cliente.ultimaCompra && (
            <div className="p-2.5 rounded-md bg-accent/50 dark:bg-slate-800/50">
              <p className="text-xs font-medium text-muted-foreground">
                Última Compra ({formatDate(cliente.ultimaCompra.fecha)}):
              </p>
              <div className="flex justify-between items-center">
                <Badge
                  variant="secondary"
                  className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100"
                >
                  {cliente.ultimaCompra.item || "Producto no especificado"}
                </Badge>
                <span className="font-semibold text-foreground/90">
                  {formatCurrency(cliente.ultimaCompra.precio || 0)}
                </span>
              </div>
            </div>
          )}

          {ultimaRXData && (
            <div className="p-2.5 rounded-md bg-accent/50 dark:bg-slate-800/50">
              <div className="flex justify-between items-baseline">
                <p className="text-xs font-medium text-muted-foreground">
                  Última RX:
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(ultimaRXData.fecha)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-2 text-xs mt-1">
                <p className="text-foreground/80">
                  OD: {formatFormField(ultimaRXData.od?.sph)}
                </p>
                <p className="text-foreground/80">
                  OS: {formatFormField(ultimaRXData.os?.sph)}
                </p>
              </div>
              {ultimaRXData.condiciones?.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {ultimaRXData.condiciones.map((cond) => (
                    <Badge
                      key={cond}
                      variant="outline"
                      className="text-xs border-indigo-400 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400"
                    >
                      {cond}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-md bg-accent/30 dark:bg-slate-800/30">
              <p className="text-xs font-medium text-muted-foreground">Deuda</p>
              <p
                className={`font-semibold text-sm ${
                  (cliente.deudaPendiente || 0) < 0
                    ? "text-red-500 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {formatCurrency(cliente.deudaPendiente || 0)}
              </p>
            </div>
            <div className="p-2 rounded-md bg-accent/30 dark:bg-slate-800/30">
              <p className="text-xs font-medium text-muted-foreground">
                Próx. Cita
              </p>
              <p className="font-semibold text-sm text-foreground/90">
                {cliente.ultimaCita?.fecha
                  ? formatDate(cliente.ultimaCita.fecha)
                  : "N/A"}
              </p>
            </div>
            <div className="p-2 rounded-md bg-accent/30 dark:bg-slate-800/30">
              <p className="text-xs font-medium text-muted-foreground">Notas</p>
              <p className="font-semibold text-sm text-foreground/90">
                {cliente.notasCount || 0}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-border dark:border-slate-700/50 pt-3 mt-3 flex flex-col sm:flex-row justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-primary/10 w-full sm:w-auto"
            onClick={handleViewFormulas}
          >
            <FileTextIcon className="mr-1.5 h-4 w-4" /> Ver Fórmulas
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-primary/10 w-full sm:w-auto"
            onClick={handleScheduleAppointment}
          >
            <CalendarDays className="mr-1.5 h-4 w-4" /> Agendar Cita
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClienteCard;

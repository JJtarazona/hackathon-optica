import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useOrganization } from "@clerk/clerk-react";
import { createCliente, updateCliente } from "@/Redux/action/clientesAction";

const ClienteForm = ({ isOpen, currentCliente, onClose }) => {
  if (!isOpen) return null;
  const { organization } = useOrganization();
  const id = organization?.id;
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    opticaId: id || "",
  });

  // Cargar datos del cliente si se está editando
  useEffect(() => {
    if (currentCliente) {
      setForm({
        nombre: currentCliente.nombre || "",
        apellido: currentCliente.apellido || "",
        email: currentCliente.email || "",
        telefono: currentCliente.telefono || "",
        direccion: currentCliente.direccion || "",
        opticaId: id,
      });
    } else {
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        opticaId: id,
      });
    }
  }, [currentCliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCliente) {
      dispatch(updateCliente(currentCliente.id, form));
    } else {
      dispatch(createCliente(form));
    }
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      direccion: "",
      opticaId: id,
    });
    onClose?.(); // opcional: cerrar modal
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <Card className="bg-card shadow-xl border-border dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-primary">
            {currentCliente ? "Editar Cliente" : "Nuevo Cliente"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Completa los datos personales del cliente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre" className="text-foreground/90">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="bg-background border-input focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="apellido" className="text-foreground/90">
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                  className="bg-background border-input focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground/90">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-background border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="telefono" className="text-foreground/90">
                Teléfono
              </Label>
              <Input
                id="telefono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="bg-background border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <div>
              <Label htmlFor="direccion" className="text-foreground/90">
                Dirección
              </Label>
              <Input
                id="direccion"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                className="bg-background border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <CardFooter className="flex justify-end gap-2 p-0 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="text-muted-foreground hover:bg-accent"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {currentCliente ? "Guardar Cambios" : "Crear Cliente"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClienteForm;

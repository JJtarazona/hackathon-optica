
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

const ClienteForm = ({ isOpen, formData, currentCliente, handleInputChange, handleSubmit, resetForm }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <Card className="bg-card shadow-xl border-border dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-primary">{currentCliente ? 'Editar Cliente' : 'Nuevo Cliente'}</CardTitle>
          <CardDescription className="text-muted-foreground">Completa los datos personales del cliente.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre" className="text-foreground/90">Nombre</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required className="bg-background border-input focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <Label htmlFor="apellido" className="text-foreground/90">Apellido</Label>
                <Input id="apellido" name="apellido" value={formData.apellido} onChange={handleInputChange} required className="bg-background border-input focus:border-primary focus:ring-primary" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground/90">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="bg-background border-input focus:border-primary focus:ring-primary" />
            </div>
            <div>
              <Label htmlFor="telefono" className="text-foreground/90">Teléfono</Label>
              <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} className="bg-background border-input focus:border-primary focus:ring-primary" />
            </div>
            <div>
              <Label htmlFor="direccion" className="text-foreground/90">Dirección</Label>
              <Input id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} className="bg-background border-input focus:border-primary focus:ring-primary" />
            </div>
            <CardFooter className="flex justify-end gap-2 p-0 pt-4">
              <Button type="button" variant="outline" onClick={resetForm} className="text-muted-foreground hover:bg-accent">Cancelar</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">{currentCliente ? 'Guardar Cambios' : 'Crear Cliente'}</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClienteForm;
  

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { XCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { optometristas, estadosCita } from '@/lib/constants';

const TurnoForm = ({ turno, clientes, onSubmit, onCancel, preselectedClienteId, preselectedDate }) => {
  const [formData, setFormData] = useState({
    clienteId: preselectedClienteId || '',
    fecha: preselectedDate || new Date().toISOString().split('T')[0],
    hora: '09:00',
    motivo: '',
    optometrista: '',
    estado: 'Pendiente',
    notas: ''
  });

  useEffect(() => {
    if (turno) {
      setFormData({
        clienteId: turno.clienteId || preselectedClienteId || '',
        fecha: turno.fecha ? new Date(turno.fecha).toISOString().split('T')[0] : (preselectedDate || new Date().toISOString().split('T')[0]),
        hora: turno.hora || '09:00',
        motivo: turno.motivo || '',
        optometrista: turno.optometrista || '',
        estado: turno.estado || 'Pendiente',
        notas: turno.notas || ''
      });
    } else {
      setFormData({
        clienteId: preselectedClienteId || '',
        fecha: preselectedDate || new Date().toISOString().split('T')[0],
        hora: '09:00',
        motivo: '',
        optometrista: '',
        estado: 'Pendiente',
        notas: ''
      });
    }
  }, [turno, preselectedClienteId, preselectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteSeleccionado = clientes.find(c => String(c.id) === String(formData.clienteId));
    const submissionData = {
      ...formData,
      clienteNombre: clienteSeleccionado ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}` : 'N/A',
      title: `${formData.motivo || 'Cita'} - ${clienteSeleccionado ? clienteSeleccionado.nombre : 'Cliente'}`,
      start: `${formData.fecha}T${formData.hora}:00`,
      end: `${formData.fecha}T${(parseInt(formData.hora.split(':')[0]) + 1).toString().padStart(2, '0')}:${formData.hora.split(':')[1]}:00`
    };
    onSubmit(submissionData);
  };
  
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20}}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-lg bg-card shadow-2xl dark:border-slate-700 max-h-[90vh] flex flex-col">
        <CardHeader className="border-b border-border dark:border-slate-700">
          <CardTitle className="text-primary">{turno?.id ? 'Editar Turno' : 'Nuevo Turno'}</CardTitle>
          <CardDescription className="text-muted-foreground">Programa o modifica una cita.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 overflow-y-auto">
          <form id="turno-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="clienteId" className="text-foreground/90">Cliente</Label>
              <Select name="clienteId" value={String(formData.clienteId)} onValueChange={(value) => handleSelectChange('clienteId', value)}>
                <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border-border">
                  {clientes.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.nombre} {c.apellido}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fecha" className="text-foreground/90">Fecha</Label>
                <Input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"/>
              </div>
              <div>
                <Label htmlFor="hora" className="text-foreground/90">Hora</Label>
                <Input type="time" id="hora" name="hora" value={formData.hora} onChange={handleChange} className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"/>
              </div>
            </div>
            <div>
              <Label htmlFor="motivo" className="text-foreground/90">Motivo de la Cita</Label>
              <Input id="motivo" name="motivo" value={formData.motivo} onChange={handleChange} className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="optometrista" className="text-foreground/90">Optometrista</Label>
                <Select name="optometrista" value={formData.optometrista} onValueChange={(value) => handleSelectChange('optometrista', value)}>
                  <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Seleccionar optometrista" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border">
                    {optometristas.map(o => <SelectItem key={o.id} value={o.nombre}>{o.nombre}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="estado" className="text-foreground/90">Estado</Label>
                <Select name="estado" value={formData.estado} onValueChange={(value) => handleSelectChange('estado', value)}>
                  <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border">
                    {estadosCita.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notas" className="text-foreground/90">Notas Adicionales</Label>
              <Input as="textarea" id="notas" name="notas" value={formData.notas || ''} onChange={handleChange} className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary min-h-[80px]" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 border-t border-border dark:border-slate-700">
          <Button type="button" variant="outline" onClick={onCancel} className="text-muted-foreground hover:bg-accent">
            <XCircle className="mr-2 h-4 w-4" /> Cancelar
          </Button>
          <Button type="submit" form="turno-form" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="mr-2 h-4 w-4" /> {formData.id ? 'Guardar Cambios' : 'Agendar Turno'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TurnoForm;
  
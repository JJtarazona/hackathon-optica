
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { XCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { optometristas, tiposLente, materialesLente, tratamientosLente } from '@/lib/constants';

const FormulaForm = ({ formula, clientes, onSubmit, onCancel, preselectedClienteId }) => {
  const [formData, setFormData] = useState({
    clienteId: preselectedClienteId || '',
    fecha: new Date().toISOString().split('T')[0],
    optometrista: '',
    od: { sph: '', cyl: '', axis: '', add: '', dp: '' },
    os: { sph: '', cyl: '', axis: '', add: '', dp: '' },
    add: '',
    tipoLente: '',
    material: '',
    tratamientos: [],
    observaciones: '',
  });

  useEffect(() => {
    if (formula) {
      setFormData({
        clienteId: formula.clienteId || preselectedClienteId || '',
        fecha: formula.fecha ? new Date(formula.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        optometrista: formula.optometrista || '',
        od: formula.od || { sph: '', cyl: '', axis: '', add: '', dp: '' },
        os: formula.os || { sph: '', cyl: '', axis: '', add: '', dp: '' },
        add: formula.add || '',
        tipoLente: formula.tipoLente || '',
        material: formula.material || '',
        tratamientos: Array.isArray(formula.tratamientos) ? formula.tratamientos : (formula.tratamientos ? String(formula.tratamientos).split(',').map(t => t.trim()) : []),
        observaciones: formula.observaciones || '',
      });
    } else {
       setFormData({
        clienteId: preselectedClienteId || '',
        fecha: new Date().toISOString().split('T')[0],
        optometrista: '',
        od: { sph: '', cyl: '', axis: '', add: '', dp: '' },
        os: { sph: '', cyl: '', axis: '', add: '', dp: '' },
        add: '',
        tipoLente: '',
        material: '',
        tratamientos: [],
        observaciones: '',
      });
    }
  }, [formula, preselectedClienteId]);

  const handleChange = (e, part = null, subPart = null) => {
    const { name, value } = e.target;
    if (part && subPart) {
      setFormData(prev => ({ ...prev, [part]: { ...prev[part], [subPart]: value } }));
    } else if (part) {
      setFormData(prev => ({ ...prev, [part]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => {
      const currentValues = prev[name] || [];
      if (currentValues.includes(value)) {
        return { ...prev, [name]: currentValues.filter(item => item !== value) };
      } else {
        return { ...prev, [name]: [...currentValues, value] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteSeleccionado = clientes.find(c => String(c.id) === String(formData.clienteId));
    const submissionData = {
      ...formData,
      clienteNombre: clienteSeleccionado ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}` : 'N/A',
    };
    onSubmit(submissionData);
  };

  const renderEyeInput = (eye) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-3 border border-border dark:border-slate-700 rounded-md bg-background dark:bg-slate-900/50">
      {['sph', 'cyl', 'axis', 'add', 'dp'].map(param => (
        <div key={`${eye}-${param}`}>
          <Label htmlFor={`${eye}-${param}`} className="text-xs text-muted-foreground">{param.toUpperCase()}</Label>
          <Input 
            type={param === 'axis' || param === 'add' || param === 'dp' || param === 'sph' || param === 'cyl' ? 'number' : 'text'} 
            step={param === 'axis' ? "1" : "0.25"}
            id={`${eye}-${param}`} 
            name={`${eye}-${param}`} 
            value={formData[eye]?.[param] || ''} 
            onChange={(e) => handleChange(e, eye, param)}
            className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary h-9"
          />
        </div>
      ))}
    </div>
  );
  
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20}}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl bg-card shadow-2xl dark:border-slate-700 max-h-[90vh] flex flex-col">
        <CardHeader className="border-b border-border dark:border-slate-700">
          <CardTitle className="text-primary">{formula?.id ? 'Editar Fórmula Óptica' : 'Nueva Fórmula Óptica'}</CardTitle>
          <CardDescription className="text-muted-foreground">Complete los detalles de la receta.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 overflow-y-auto">
          <form id="formula-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="fecha" className="text-foreground/90">Fecha</Label>
                <Input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"/>
              </div>
            </div>
            
            <div>
              <Label className="text-foreground/90 block mb-1">Ojo Derecho (OD)</Label>
              {renderEyeInput('od')}
            </div>
            <div>
              <Label className="text-foreground/90 block mb-1">Ojo Izquierdo (OS)</Label>
              {renderEyeInput('os')}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="add" className="text-foreground/90">Adición (ADD)</Label>
                <Input type="number" step="0.25" id="add" name="add" value={formData.add} onChange={handleChange} className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"/>
              </div>
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
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipoLente" className="text-foreground/90">Tipo de Lente</Label>
                <Select name="tipoLente" value={formData.tipoLente} onValueChange={(value) => handleSelectChange('tipoLente', value)}>
                  <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border">{tiposLente.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="material" className="text-foreground/90">Material del Lente</Label>
                 <Select name="material" value={formData.material} onValueChange={(value) => handleSelectChange('material', value)}>
                  <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"><SelectValue placeholder="Seleccionar material" /></SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border">{materialesLente.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
                <Label className="text-foreground/90">Tratamientos</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1 p-3 border border-border dark:border-slate-700 rounded-md bg-background dark:bg-slate-900/50">
                    {tratamientosLente.map(t => (
                        <Label key={t} htmlFor={`tratamiento-${t}`} className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer">
                            <Input 
                                type="checkbox" 
                                id={`tratamiento-${t}`}
                                value={t}
                                checked={formData.tratamientos?.includes(t)}
                                onChange={() => handleMultiSelectChange('tratamientos', t)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span>{t}</span>
                        </Label>
                    ))}
                </div>
            </div>
            <div>
              <Label htmlFor="observaciones" className="text-foreground/90">Observaciones</Label>
              <Input as="textarea" id="observaciones" name="observaciones" value={formData.observaciones} onChange={handleChange} className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary min-h-[80px]"/>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 border-t border-border dark:border-slate-700">
          <Button type="button" variant="outline" onClick={onCancel} className="text-muted-foreground hover:bg-accent">
            <XCircle className="mr-2 h-4 w-4" /> Cancelar
          </Button>
          <Button type="submit" form="formula-form" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="mr-2 h-4 w-4" /> {formula?.id ? 'Guardar Cambios' : 'Crear Fórmula'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FormulaForm;
  
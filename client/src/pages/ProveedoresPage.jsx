
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Search, Users2 as ProveedoresIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import TableLayout from '@/components/shared/TableLayout';
import EmptyState from '@/components/shared/EmptyState';
import { initialProveedoresData, tiposProveedor } from '@/lib/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from "@/components/ui/textarea";


const ProveedorForm = ({ isOpen, currentProveedor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
    tipo: tiposProveedor[0],
    notas: '',
  });

  useEffect(() => {
    if (currentProveedor) {
      setFormData(currentProveedor);
    } else {
      setFormData({
        nombre: '', contacto: '', email: '', telefono: '', direccion: '', tipo: tiposProveedor[0], notas: '',
      });
    }
  }, [currentProveedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-lg bg-card shadow-2xl dark:border-slate-700 max-h-[90vh] flex flex-col">
        <CardHeader>
          <CardTitle className="text-primary">{currentProveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}</CardTitle>
          <CardDescription>Complete los detalles del proveedor.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 overflow-y-auto">
          <form id="proveedor-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre del Proveedor</Label>
              <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contacto">Persona de Contacto</Label>
                <Input id="contacto" name="contacto" value={formData.contacto} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo de Proveedor</Label>
                <Select name="tipo" value={formData.tipo} onValueChange={(value) => handleSelectChange('tipo', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                  <SelectContent>{tiposProveedor.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Input id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="notas">Notas</Label>
              <Textarea id="notas" name="notas" value={formData.notas} onChange={handleChange} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" form="proveedor-form">{currentProveedor ? 'Guardar Cambios' : 'Crear Proveedor'}</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


const ProveedoresPage = () => {
  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProveedor, setCurrentProveedor] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedProveedores = localStorage.getItem('proveedoresCRM');
    if (storedProveedores) {
        try {
            setProveedores(JSON.parse(storedProveedores));
        } catch (error) {
            console.error("Error parsing stored proveedores:", error);
            setProveedores(initialProveedoresData);
            localStorage.setItem('proveedoresCRM', JSON.stringify(initialProveedoresData));
        }
    } else {
        setProveedores(initialProveedoresData);
        localStorage.setItem('proveedoresCRM', JSON.stringify(initialProveedoresData));
    }
  }, []);

  useEffect(() => {
    if (proveedores.length > 0 || currentProveedor) {
        localStorage.setItem('proveedoresCRM', JSON.stringify(proveedores));
    }
  }, [proveedores, currentProveedor]);

  const handleSubmit = useCallback((formData) => {
    if (currentProveedor) {
      setProveedores(prev => prev.map(p => p.id === currentProveedor.id ? { ...formData, id: currentProveedor.id } : p));
      toast({ title: "Proveedor actualizado", description: "El proveedor ha sido modificado." });
    } else {
      setProveedores(prev => [{ ...formData, id: `PROV${Date.now()}` }, ...prev]);
      toast({ title: "Proveedor creado", description: "Nuevo proveedor registrado." });
    }
    setIsFormOpen(false);
    setCurrentProveedor(null);
  }, [currentProveedor, toast]);

  const openForm = useCallback((proveedor = null) => {
    setCurrentProveedor(proveedor);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setProveedores(prev => prev.filter(p => p.id !== id));
    toast({ title: "Proveedor eliminado", description: "El proveedor ha sido eliminado.", variant: "destructive" });
  }, [toast]);

  const filteredProveedores = proveedores.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contacto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ["ID", "Nombre", "Contacto", "Tipo", "Email", "Teléfono", "Acciones"];

  return (
    <div className="space-y-6">
      <Toaster />
      <PageHeader 
        title="Gestión de Proveedores"
        actions={
          <>
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar proveedor..."
                className="pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => openForm()} className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Proveedor
            </Button>
          </>
        }
      />

      <AnimatePresence>
        {isFormOpen && (
          <ProveedorForm 
            isOpen={isFormOpen}
            currentProveedor={currentProveedor}
            onSubmit={handleSubmit}
            onCancel={() => { setIsFormOpen(false); setCurrentProveedor(null); }}
          />
        )}
      </AnimatePresence>
      
      <TableLayout headers={tableHeaders}>
        <AnimatePresence>
          {filteredProveedores.length > 0 ? (
            filteredProveedores.map(proveedor => (
              <motion.tr
                key={proveedor.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-accent/50 dark:hover:bg-slate-800/50"
              >
                <td className="p-3 text-sm font-mono text-muted-foreground border-b">{proveedor.id}</td>
                <td className="p-3 text-sm text-foreground/90 border-b">{proveedor.nombre}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{proveedor.contacto}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{proveedor.tipo}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{proveedor.email}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{proveedor.telefono}</td>
                <td className="p-3 border-b text-right">
                  <Button variant="ghost" size="icon" onClick={() => openForm(proveedor)} className="text-blue-500 hover:text-blue-600 mr-1 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(proveedor.id)} className="text-destructive hover:text-destructive/80 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length} className="p-6 text-center">
                <EmptyState 
                  icon={ProveedoresIcon}
                  title="No hay proveedores"
                  description={searchTerm ? "No se encontraron proveedores con ese criterio." : "Agrega un nuevo proveedor para comenzar."}
                />
              </td>
            </tr>
          )}
        </AnimatePresence>
      </TableLayout>
    </div>
  );
};

export default ProveedoresPage;
  
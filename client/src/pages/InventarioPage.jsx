
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Search, Archive } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import TableLayout from '@/components/shared/TableLayout';
import EmptyState from '@/components/shared/EmptyState';
import { initialInventarioData, formatCurrency, tiposProductoInventario, initialProveedoresData } from '@/lib/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';

const InventarioForm = ({ isOpen, currentItem, onSubmit, onCancel, proveedores }) => {
  const [formData, setFormData] = useState({
    tipo: tiposProductoInventario[0] || '',
    nombre: '',
    marca: '',
    material: '',
    color: '',
    stock: 0,
    precioCompra: 0,
    precioVenta: 0,
    proveedorId: '',
    indice: '', 
    duracion: '',
  });

  useEffect(() => {
    if (currentItem) {
      setFormData({
        tipo: currentItem.tipo || tiposProductoInventario[0] || '',
        nombre: currentItem.nombre || '',
        marca: currentItem.marca || '',
        material: currentItem.material || '',
        color: currentItem.color || '',
        stock: currentItem.stock || 0,
        precioCompra: currentItem.precioCompra || 0,
        precioVenta: currentItem.precioVenta || 0,
        proveedorId: currentItem.proveedorId || '',
        indice: currentItem.indice || '',
        duracion: currentItem.duracion || '',
      });
    } else {
      setFormData({
        tipo: tiposProductoInventario[0] || '', nombre: '', marca: '', material: '', color: '', stock: 0, precioCompra: 0, precioVenta: 0, proveedorId: '', indice: '', duracion: '',
      });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
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
          <CardTitle className="text-primary">{currentItem ? 'Editar Artículo' : 'Nuevo Artículo de Inventario'}</CardTitle>
          <CardDescription>Complete los detalles del artículo.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 overflow-y-auto">
          <form id="inventario-form" onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="nombre">Nombre del Artículo</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo de Producto</Label>
                <Select name="tipo" value={formData.tipo} onValueChange={(value) => handleSelectChange('tipo', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                  <SelectContent>{tiposProductoInventario.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Input id="marca" name="marca" value={formData.marca} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="material">Material</Label>
                <Input id="material" name="material" value={formData.material} onChange={handleChange} />
              </div>
            </div>
            
            {formData.tipo === 'Armazón' || formData.tipo === 'Gafa de Sol' ? (
              <div>
                <Label htmlFor="color">Color</Label>
                <Input id="color" name="color" value={formData.color} onChange={handleChange} />
              </div>
            ) : null}

            {formData.tipo === 'Lente Oftálmico' ? (
              <div>
                <Label htmlFor="indice">Índice de Refracción</Label>
                <Input id="indice" name="indice" value={formData.indice} onChange={handleChange} />
              </div>
            ) : null}

            {formData.tipo === 'Lente de Contacto' ? (
               <div>
                <Label htmlFor="duracion">Duración (Ej: Diario, Mensual)</Label>
                <Input id="duracion" name="duracion" value={formData.duracion} onChange={handleChange} />
              </div>
            ) : null}


            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="stock">Stock Actual</Label>
                <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} min="0" />
              </div>
              <div>
                <Label htmlFor="precioCompra">Precio Compra</Label>
                <Input id="precioCompra" name="precioCompra" type="number" value={formData.precioCompra} onChange={handleChange} step="0.01" min="0" />
              </div>
              <div>
                <Label htmlFor="precioVenta">Precio Venta</Label>
                <Input id="precioVenta" name="precioVenta" type="number" value={formData.precioVenta} onChange={handleChange} step="0.01" min="0" />
              </div>
            </div>
            <div>
              <Label htmlFor="proveedorId">Proveedor</Label>
              <Select name="proveedorId" value={formData.proveedorId} onValueChange={(value) => handleSelectChange('proveedorId', value)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar proveedor" /></SelectTrigger>
                <SelectContent>{(proveedores || []).map(p => <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" form="inventario-form">{currentItem ? 'Guardar Cambios' : 'Crear Artículo'}</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


const InventarioPage = () => {
  const [inventario, setInventario] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedInventario = localStorage.getItem('inventarioCRM');
    if (storedInventario) {
        try {
            setInventario(JSON.parse(storedInventario));
        } catch (error) {
            console.error("Error parsing stored inventario:", error);
            setInventario(initialInventarioData);
            localStorage.setItem('inventarioCRM', JSON.stringify(initialInventarioData));
        }
    } else {
        setInventario(initialInventarioData);
        localStorage.setItem('inventarioCRM', JSON.stringify(initialInventarioData));
    }

    const storedProveedores = localStorage.getItem('proveedoresCRM');
    if (storedProveedores) {
        try {
            setProveedores(JSON.parse(storedProveedores));
        } catch (error) {
            console.error("Error parsing stored proveedores for inventario:", error);
            setProveedores(initialProveedoresData);
        }
    } else {
        setProveedores(initialProveedoresData);
    }
  }, []);

  useEffect(() => {
     if(inventario.length > 0 || currentItem){
        localStorage.setItem('inventarioCRM', JSON.stringify(inventario));
    }
  }, [inventario, currentItem]);

  const handleSubmit = useCallback((formData) => {
    if (currentItem) {
      setInventario(prev => prev.map(item => item.id === currentItem.id ? { ...formData, id: currentItem.id } : item));
      toast({ title: "Artículo actualizado", description: "El artículo del inventario ha sido modificado." });
    } else {
      setInventario(prev => [{ ...formData, id: `${formData.tipo.substring(0,3).toUpperCase()}${Date.now()}` }, ...prev]);
      toast({ title: "Artículo creado", description: "Nuevo artículo agregado al inventario." });
    }
    setIsFormOpen(false);
    setCurrentItem(null);
  }, [currentItem, toast]);

  const openForm = useCallback((item = null) => {
    setCurrentItem(item);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setInventario(prev => prev.filter(item => item.id !== id));
    toast({ title: "Artículo eliminado", description: "El artículo ha sido eliminado del inventario.", variant: "destructive" });
  }, [toast]);

  const filteredInventario = inventario.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ["ID", "Nombre", "Tipo", "Marca", "Stock", "P. Venta", "Acciones"];

  return (
    <div className="space-y-6">
      <Toaster />
      <PageHeader 
        title="Gestión de Inventario"
        actions={
          <>
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar en inventario..."
                className="pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => openForm()} className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Artículo
            </Button>
          </>
        }
      />

      <AnimatePresence>
        {isFormOpen && (
          <InventarioForm 
            isOpen={isFormOpen}
            currentItem={currentItem}
            onSubmit={handleSubmit}
            onCancel={() => { setIsFormOpen(false); setCurrentItem(null); }}
            proveedores={proveedores}
          />
        )}
      </AnimatePresence>
      
      <TableLayout headers={tableHeaders}>
        <AnimatePresence>
          {filteredInventario.length > 0 ? (
            filteredInventario.map(item => (
              <motion.tr
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-accent/50 dark:hover:bg-slate-800/50"
              >
                <td className="p-3 text-sm font-mono text-muted-foreground border-b">{item.id}</td>
                <td className="p-3 text-sm text-foreground/90 border-b">{item.nombre}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{item.tipo}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{item.marca || 'N/A'}</td>
                <td className="p-3 text-sm text-foreground/90 border-b text-center">{item.stock}</td>
                <td className="p-3 text-sm text-green-600 dark:text-green-400 font-semibold border-b">{formatCurrency(item.precioVenta)}</td>
                <td className="p-3 border-b text-right">
                  <Button variant="ghost" size="icon" onClick={() => openForm(item)} className="text-blue-500 hover:text-blue-600 mr-1 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive/80 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length} className="p-6 text-center">
                <EmptyState 
                  icon={Archive}
                  title="Inventario vacío"
                  description={searchTerm ? "No se encontraron artículos con ese criterio." : "Agrega artículos para empezar a gestionar tu stock."}
                />
              </td>
            </tr>
          )}
        </AnimatePresence>
      </TableLayout>
    </div>
  );
};

export default InventarioPage;
  
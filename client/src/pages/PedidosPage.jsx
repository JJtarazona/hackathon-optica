
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import TableLayout from '@/components/shared/TableLayout';
import EmptyState from '@/components/shared/EmptyState';
import { initialPedidosData, initialClientesData, initialInventarioData, estadosPedido, formatDate, formatCurrency } from '@/lib/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge';

const PedidoForm = ({ isOpen, currentPedido, onSubmit, onCancel, clientes, inventario }) => {
  const [formData, setFormData] = useState({
    clienteId: '',
    fechaPedido: new Date().toISOString().split('T')[0],
    fechaEstimadaEntrega: '',
    estado: estadosPedido[0],
    laboratorio: '',
    items: [{ itemId: '', cantidad: 1, precio: 0 }],
  });

  useEffect(() => {
    if (currentPedido) {
      setFormData({
        ...currentPedido,
        fechaPedido: currentPedido.fechaPedido ? new Date(currentPedido.fechaPedido).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        fechaEstimadaEntrega: currentPedido.fechaEstimadaEntrega ? new Date(currentPedido.fechaEstimadaEntrega).toISOString().split('T')[0] : '',
        items: currentPedido.items && currentPedido.items.length > 0 ? currentPedido.items : [{ itemId: '', cantidad: 1, precio: 0 }],
      });
    } else {
      setFormData({
        clienteId: '',
        fechaPedido: new Date().toISOString().split('T')[0],
        fechaEstimadaEntrega: '',
        estado: estadosPedido[0],
        laboratorio: '',
        items: [{ itemId: '', cantidad: 1, precio: 0 }],
      });
    }
  }, [currentPedido]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    const parsedValue = field === 'cantidad' ? parseInt(value, 10) : (field === 'precio' ? parseFloat(value) : value);
    newItems[index][field] = parsedValue;

    if (field === 'itemId') {
      const selectedItem = inventario.find(i => i.id === value);
      newItems[index].precio = selectedItem ? selectedItem.precioVenta : 0;
    }
    
    if (field === 'cantidad' && (isNaN(parsedValue) || parsedValue < 1)) {
        newItems[index].cantidad = 1;
    }
    
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({ ...prev, items: [...prev.items, { itemId: '', cantidad: 1, precio: 0 }] }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems.length > 0 ? newItems : [{ itemId: '', cantidad: 1, precio: 0 }] }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteSeleccionado = clientes.find(c => String(c.id) === String(formData.clienteId));
    const total = formData.items.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
    onSubmit({ ...formData, clienteNombre: clienteSeleccionado ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}` : 'N/A', total });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl bg-card shadow-2xl dark:border-slate-700 max-h-[90vh] flex flex-col">
        <CardHeader>
          <CardTitle className="text-primary">{currentPedido ? 'Editar Pedido' : 'Nuevo Pedido'}</CardTitle>
          <CardDescription>Complete los detalles del pedido.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 overflow-y-auto">
          <form id="pedido-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clienteId">Cliente</Label>
                <Select name="clienteId" value={String(formData.clienteId)} onValueChange={(value) => handleSelectChange('clienteId', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar cliente" /></SelectTrigger>
                  <SelectContent>{(clientes || []).map(c => <SelectItem key={c.id} value={String(c.id)}>{c.nombre} {c.apellido}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fechaPedido">Fecha Pedido</Label>
                <Input id="fechaPedido" name="fechaPedido" type="date" value={formData.fechaPedido} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fechaEstimadaEntrega">Fecha Estimada Entrega</Label>
                <Input id="fechaEstimadaEntrega" name="fechaEstimadaEntrega" type="date" value={formData.fechaEstimadaEntrega} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select name="estado" value={formData.estado} onValueChange={(value) => handleSelectChange('estado', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar estado" /></SelectTrigger>
                  <SelectContent>{estadosPedido.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="laboratorio">Laboratorio</Label>
              <Input id="laboratorio" name="laboratorio" value={formData.laboratorio} onChange={handleChange} />
            </div>
            
            <div className="space-y-3">
              <Label>Artículos del Pedido</Label>
              {formData.items.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-end gap-2 p-3 border rounded-md">
                  <div className="flex-grow">
                    <Label htmlFor={`item-${index}-itemId`} className="text-xs">Artículo</Label>
                    <Select name={`item-${index}-itemId`} value={item.itemId} onValueChange={(value) => handleItemChange(index, 'itemId', value)}>
                      <SelectTrigger><SelectValue placeholder="Seleccionar artículo" /></SelectTrigger>
                      <SelectContent>{(inventario || []).map(i => <SelectItem key={i.id} value={i.id}>{i.nombre} ({i.marca})</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:w-20">
                    <Label htmlFor={`item-${index}-cantidad`} className="text-xs">Cant.</Label>
                    <Input id={`item-${index}-cantidad`} name="cantidad" type="number" value={item.cantidad} onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)} min="1" />
                  </div>
                  <div className="w-full sm:w-28">
                    <Label htmlFor={`item-${index}-precio`} className="text-xs">Precio Unit.</Label>
                    <Input id={`item-${index}-precio`} name="precio" type="number" value={item.precio} onChange={(e) => handleItemChange(index, 'precio', e.target.value)} step="0.01" min="0" />
                  </div>
                  {formData.items.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)} className="text-destructive self-center sm:self-end h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addItem} className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Artículo
              </Button>
            </div>
            <div>
              <p className="text-right font-semibold">Total Pedido: {formatCurrency(formData.items.reduce((sum, item) => sum + (item.cantidad * item.precio), 0))}</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" form="pedido-form">{currentPedido ? 'Guardar Cambios' : 'Crear Pedido'}</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedPedidos = localStorage.getItem('pedidosCRM');
     if (storedPedidos) {
        try {
            setPedidos(JSON.parse(storedPedidos));
        } catch (error) {
            console.error("Error parsing stored pedidos:", error);
            setPedidos(initialPedidosData);
            localStorage.setItem('pedidosCRM', JSON.stringify(initialPedidosData));
        }
    } else {
        setPedidos(initialPedidosData);
        localStorage.setItem('pedidosCRM', JSON.stringify(initialPedidosData));
    }

    const storedClientes = localStorage.getItem('clientesCRM');
    if (storedClientes) {
        try {
            setClientes(JSON.parse(storedClientes));
        } catch (error) {
            console.error("Error parsing stored clientes for pedidos page:", error);
            setClientes(initialClientesData);
        }
    } else {
        setClientes(initialClientesData);
    }

    const storedInventario = localStorage.getItem('inventarioCRM');
     if (storedInventario) {
        try {
            setInventario(JSON.parse(storedInventario));
        } catch (error) {
            console.error("Error parsing stored inventario for pedidos page:", error);
            setInventario(initialInventarioData);
        }
    } else {
        setInventario(initialInventarioData);
    }
  }, []);

  useEffect(() => {
    if(pedidos.length > 0 || currentPedido){
        localStorage.setItem('pedidosCRM', JSON.stringify(pedidos));
    }
  }, [pedidos, currentPedido]);

  const handleSubmit = useCallback((formData) => {
    if (currentPedido) {
      setPedidos(prev => prev.map(p => p.id === currentPedido.id ? { ...formData, id: currentPedido.id } : p));
      toast({ title: "Pedido actualizado", description: "El pedido ha sido modificado." });
    } else {
      setPedidos(prev => [{ ...formData, id: `PED${Date.now()}` }, ...prev]);
      toast({ title: "Pedido creado", description: "Nuevo pedido registrado." });
    }
    setIsFormOpen(false);
    setCurrentPedido(null);
  }, [currentPedido, toast]);

  const openForm = useCallback((pedido = null) => {
    setCurrentPedido(pedido);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setPedidos(prev => prev.filter(p => p.id !== id));
    toast({ title: "Pedido eliminado", description: "El pedido ha sido eliminado.", variant: "destructive" });
  }, [toast]);
  
  const getStatusBadgeVariant = (status) => {
    if (status === 'Entregado') return 'success';
    if (status === 'Cancelado') return 'destructive';
    if (status === 'En Laboratorio' || status === 'Enviado') return 'warning';
    if (status === 'Listo para Entrega' || status === 'Recibido en Óptica') return 'info';
    return 'secondary';
  };


  const filteredPedidos = pedidos.filter(p =>
    p.clienteNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ["ID Pedido", "Cliente", "Fecha Pedido", "Fecha Estimada", "Estado", "Total", "Acciones"];

  return (
    <div className="space-y-6">
      <Toaster />
      <PageHeader 
        title="Gestión de Pedidos"
        actions={
          <>
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar pedido..."
                className="pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => openForm()} className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Pedido
            </Button>
          </>
        }
      />

      <AnimatePresence>
        {isFormOpen && (
          <PedidoForm 
            isOpen={isFormOpen}
            currentPedido={currentPedido}
            onSubmit={handleSubmit}
            onCancel={() => { setIsFormOpen(false); setCurrentPedido(null); }}
            clientes={clientes}
            inventario={inventario}
          />
        )}
      </AnimatePresence>
      
      <TableLayout headers={tableHeaders}>
        <AnimatePresence>
          {filteredPedidos.length > 0 ? (
            filteredPedidos.map(pedido => (
              <motion.tr
                key={pedido.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-accent/50 dark:hover:bg-slate-800/50"
              >
                <td className="p-3 text-sm font-mono text-muted-foreground border-b">{pedido.id}</td>
                <td className="p-3 text-sm text-foreground/90 border-b">{pedido.clienteNombre}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{formatDate(pedido.fechaPedido)}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{formatDate(pedido.fechaEstimadaEntrega)}</td>
                <td className="p-3 text-sm border-b">
                  <Badge variant={getStatusBadgeVariant(pedido.estado)}>{pedido.estado}</Badge>
                </td>
                <td className="p-3 text-sm text-green-600 dark:text-green-400 font-semibold border-b">{formatCurrency(pedido.total)}</td>
                <td className="p-3 border-b text-right">
                  <Button variant="ghost" size="icon" onClick={() => openForm(pedido)} className="text-blue-500 hover:text-blue-600 mr-1 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(pedido.id)} className="text-destructive hover:text-destructive/80 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length} className="p-6 text-center">
                <EmptyState 
                  icon={ShoppingBag}
                  title="No hay pedidos"
                  description={searchTerm ? "No se encontraron pedidos con ese criterio." : "Crea un nuevo pedido para comenzar."}
                />
              </td>
            </tr>
          )}
        </AnimatePresence>
      </TableLayout>
    </div>
  );
};

export default PedidosPage;
  
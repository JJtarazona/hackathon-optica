
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Search, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import TableLayout from '@/components/shared/TableLayout';
import EmptyState from '@/components/shared/EmptyState';
import { initialFacturasData, initialClientesData, initialPedidosData, metodosPago, estadosFactura, formatDate, formatCurrency } from '@/lib/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge';

const FacturaForm = ({ isOpen, currentFactura, onSubmit, onCancel, clientes, pedidos }) => {
  const [formData, setFormData] = useState({
    clienteId: '',
    pedidoId: '',
    fechaFactura: new Date().toISOString().split('T')[0],
    total: 0,
    metodoPago: metodosPago[0],
    estado: estadosFactura[0],
  });

  useEffect(() => {
    if (currentFactura) {
      setFormData({
        ...currentFactura,
        fechaFactura: currentFactura.fechaFactura ? new Date(currentFactura.fechaFactura).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        clienteId: '',
        pedidoId: '',
        fechaFactura: new Date().toISOString().split('T')[0],
        total: 0,
        metodoPago: metodosPago[0],
        estado: estadosFactura[0],
      });
    }
  }, [currentFactura]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'pedidoId') {
      const selectedPedido = pedidos.find(p => p.id === value);
      if (selectedPedido) {
        setFormData(prev => ({ ...prev, clienteId: selectedPedido.clienteId, total: selectedPedido.total }));
      }
    } else if (name === 'clienteId' && !formData.pedidoId) {
        setFormData(prev => ({...prev, total: 0}));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteSeleccionado = clientes.find(c => String(c.id) === String(formData.clienteId));
    onSubmit({ ...formData, clienteNombre: clienteSeleccionado ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}` : 'N/A' });
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
          <CardTitle className="text-primary">{currentFactura ? 'Editar Factura' : 'Nueva Factura'}</CardTitle>
          <CardDescription>Complete los detalles de la factura.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 overflow-y-auto">
          <form id="factura-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clienteId">Cliente</Label>
                <Select name="clienteId" value={String(formData?.clienteId)} onValueChange={(value) => handleSelectChange('clienteId', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar cliente" /></SelectTrigger>
                  <SelectContent>{(clientes || []).map(c => <SelectItem key={c?.id} value={String(c?.id)}>{c?.nombre} {c?.apellido}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pedidoId">Pedido (Opcional)</Label>
                 <Select name="pedidoId" value={formData?.pedidoId} onValueChange={(value) => handleSelectChange('pedidoId', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar pedido" /></SelectTrigger>
                  <SelectContent>{(pedidos || []).filter(p=> String(p?.clienteId) === String(formData?.clienteId)).map(p => <SelectItem key={p?.id} value={p?.id}>{p?.id} - {formatCurrency(p?.total)}</SelectItem>)}
                  {(pedidos || []).filter(p=> String(p?.clienteId) === String(formData?.clienteId)).length === 0 && <SelectItem value="prueba" disabled>No hay pedidos para este cliente</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <Label htmlFor="fechaFactura">Fecha Factura</Label>
                <Input id="fechaFactura" name="fechaFactura" type="date" value={formData.fechaFactura} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="total">Total</Label>
                <Input id="total" name="total" type="number" value={formData.total} onChange={handleChange} step="0.01" min="0" disabled={!!formData.pedidoId} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="metodoPago">Método de Pago</Label>
                <Select name="metodoPago" value={formData.metodoPago} onValueChange={(value) => handleSelectChange('metodoPago', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar método" /></SelectTrigger>
                  <SelectContent>{metodosPago.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select name="estado" value={formData.estado} onValueChange={(value) => handleSelectChange('estado', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar estado" /></SelectTrigger>
                  <SelectContent>{estadosFactura.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" form="factura-form">{currentFactura ? 'Guardar Cambios' : 'Crear Factura'}</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


const FacturacionPage = () => {
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentFactura, setCurrentFactura] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedFacturas = localStorage.getItem('facturasCRM');
    if (storedFacturas) {
        try {
            setFacturas(JSON.parse(storedFacturas));
        } catch (error) {
            console.error("Error parsing stored facturas:", error);
            setFacturas(initialFacturasData);
            localStorage.setItem('facturasCRM', JSON.stringify(initialFacturasData));
        }
    } else {
        setFacturas(initialFacturasData);
        localStorage.setItem('facturasCRM', JSON.stringify(initialFacturasData));
    }

    const storedClientes = localStorage.getItem('clientesCRM');
    if (storedClientes) {
        try {
            setClientes(JSON.parse(storedClientes));
        } catch (error) {
            console.error("Error parsing stored clientes for facturacion:", error);
            setClientes(initialClientesData);
        }
    } else {
        setClientes(initialClientesData);
    }

    const storedPedidos = localStorage.getItem('pedidosCRM');
    if (storedPedidos) {
        try {
            setPedidos(JSON.parse(storedPedidos));
        } catch (error) {
            console.error("Error parsing stored pedidos for facturacion:", error);
            setPedidos(initialPedidosData);
        }
    } else {
        setPedidos(initialPedidosData);
    }
  }, []);

  useEffect(() => {
    if(facturas.length > 0 || currentFactura) {
        localStorage.setItem('facturasCRM', JSON.stringify(facturas));
    }
  }, [facturas, currentFactura]);

  const handleSubmit = useCallback((formData) => {
    if (currentFactura) {
      setFacturas(prev => prev.map(f => f.id === currentFactura.id ? { ...formData, id: currentFactura.id } : f));
      toast({ title: "Factura actualizada", description: "La factura ha sido modificada." });
    } else {
      setFacturas(prev => [{ ...formData, id: `FACT${Date.now()}` }, ...prev]);
      toast({ title: "Factura creada", description: "Nueva factura registrada." });
    }
    setIsFormOpen(false);
    setCurrentFactura(null);
  }, [currentFactura, toast]);

  const openForm = useCallback((factura = null) => {
    setCurrentFactura(factura);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setFacturas(prev => prev.filter(f => f.id !== id));
    toast({ title: "Factura eliminada", description: "La factura ha sido eliminada.", variant: "destructive" });
  }, [toast]);

  const getStatusBadgeVariant = (status) => {
    if (status === 'Pagada') return 'success';
    if (status === 'Cancelada' || status === 'Vencida') return 'destructive';
    if (status === 'Parcialmente Pagada') return 'warning';
    return 'secondary';
  };

  const filteredFacturas = facturas.filter(f =>
    f.clienteNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.pedidoId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.estado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ["ID Factura", "Cliente", "Fecha", "Pedido ID", "Total", "Estado", "Acciones"];

  return (
    <div className="space-y-6">
      <Toaster />
      <PageHeader 
        title="Facturación y Ventas"
        actions={
          <>
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar factura..."
                className="pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => openForm()} className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" /> Nueva Factura
            </Button>
          </>
        }
      />

      <AnimatePresence>
        {isFormOpen && (
          <FacturaForm
            isOpen={isFormOpen}
            currentFactura={currentFactura}
            onSubmit={handleSubmit}
            onCancel={() => { setIsFormOpen(false); setCurrentFactura(null); }}
            clientes={clientes}
            pedidos={pedidos}
          />
        )}
      </AnimatePresence>
      
      <TableLayout headers={tableHeaders}>
        <AnimatePresence>
          {filteredFacturas.length > 0 ? (
            filteredFacturas.map(factura => (
              <motion.tr
                key={factura.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-accent/50 dark:hover:bg-slate-800/50"
              >
                <td className="p-3 text-sm font-mono text-muted-foreground border-b">{factura.id}</td>
                <td className="p-3 text-sm text-foreground/90 border-b">{factura.clienteNombre}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{formatDate(factura.fechaFactura)}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{factura.pedidoId || 'N/A'}</td>
                <td className="p-3 text-sm text-green-600 dark:text-green-400 font-semibold border-b">{formatCurrency(factura.total)}</td>
                <td className="p-3 text-sm border-b">
                   <Badge variant={getStatusBadgeVariant(factura.estado)}>{factura.estado}</Badge>
                </td>
                <td className="p-3 border-b text-right">
                  <Button variant="ghost" size="icon" onClick={() => openForm(factura)} className="text-blue-500 hover:text-blue-600 mr-1 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(factura.id)} className="text-destructive hover:text-destructive/80 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length} className="p-6 text-center">
                <EmptyState 
                  icon={FileText}
                  title="No hay facturas"
                  description={searchTerm ? "No se encontraron facturas con ese criterio." : "Crea una nueva factura para comenzar."}
                />
              </td>
            </tr>
          )}
        </AnimatePresence>
      </TableLayout>
    </div>
  );
};

export default FacturacionPage;
  
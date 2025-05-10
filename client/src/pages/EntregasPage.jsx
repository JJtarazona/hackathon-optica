
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Search, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import TableLayout from '@/components/shared/TableLayout';
import EmptyState from '@/components/shared/EmptyState';
import { initialEntregasData, initialPedidosData, initialClientesData, formatDate } from '@/lib/constants';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Textarea } from "@/components/ui/textarea";

const EntregaForm = ({ isOpen, currentEntrega, onSubmit, onCancel, pedidos, clientes }) => {
  const [formData, setFormData] = useState({
    pedidoId: '',
    clienteId: '',
    fechaEntrega: new Date().toISOString().split('T')[0],
    notas: '',
    entregadoPor: 'Admin', 
  });

  useEffect(() => {
    if (currentEntrega) {
      setFormData({
        ...currentEntrega,
        fechaEntrega: currentEntrega.fechaEntrega ? new Date(currentEntrega.fechaEntrega).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        pedidoId: '',
        clienteId: '',
        fechaEntrega: new Date().toISOString().split('T')[0],
        notas: '',
        entregadoPor: 'Admin',
      });
    }
  }, [currentEntrega]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'pedidoId') {
      const selectedPedido = pedidos.find(p => p.id === value);
      if (selectedPedido) {
        setFormData(prev => ({ ...prev, clienteId: selectedPedido.clienteId }));
      }
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
          <CardTitle className="text-primary">{currentEntrega ? 'Editar Entrega' : 'Registrar Nueva Entrega'}</CardTitle>
          <CardDescription>Complete los detalles de la entrega.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 overflow-y-auto">
          <form id="entrega-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="pedidoId">Pedido</Label>
              <Select name="pedidoId" value={formData.pedidoId} onValueChange={(value) => handleSelectChange('pedidoId', value)}>
                <SelectTrigger><SelectValue placeholder="Seleccionar pedido" /></SelectTrigger>
                <SelectContent>{(pedidos || []).map(p => <SelectItem key={p.id} value={p.id}>{p.id} - {p.clienteNombre}</SelectItem>)}</SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="clienteId">Cliente (auto-seleccionado)</Label>
              <Input id="clienteId" name="clienteId" value={(clientes.find(c=> String(c.id) === String(formData.clienteId))?.nombre || '') + ' ' + (clientes.find(c=> String(c.id) === String(formData.clienteId))?.apellido || '') || 'N/A'} disabled />
            </div>
            <div>
              <Label htmlFor="fechaEntrega">Fecha de Entrega</Label>
              <Input id="fechaEntrega" name="fechaEntrega" type="date" value={formData.fechaEntrega} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="entregadoPor">Entregado Por</Label>
              <Input id="entregadoPor" name="entregadoPor" value={formData.entregadoPor} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="notas">Notas</Label>
              <Textarea id="notas" name="notas" value={formData.notas} onChange={handleChange} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" form="entrega-form">{currentEntrega ? 'Guardar Cambios' : 'Registrar Entrega'}</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const EntregasPage = () => {
  const [entregas, setEntregas] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEntrega, setCurrentEntrega] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedEntregas = localStorage.getItem('entregasCRM');
    if (storedEntregas) {
        try {
            setEntregas(JSON.parse(storedEntregas));
        } catch (error) {
            console.error("Error parsing stored entregas:", error);
            setEntregas(initialEntregasData);
            localStorage.setItem('entregasCRM', JSON.stringify(initialEntregasData));
        }
    } else {
        setEntregas(initialEntregasData);
        localStorage.setItem('entregasCRM', JSON.stringify(initialEntregasData));
    }

    const storedPedidos = localStorage.getItem('pedidosCRM');
     if (storedPedidos) {
        try {
            setPedidos(JSON.parse(storedPedidos));
        } catch (error) {
            console.error("Error parsing stored pedidos for entregas:", error);
            setPedidos(initialPedidosData);
        }
    } else {
        setPedidos(initialPedidosData);
    }

    const storedClientes = localStorage.getItem('clientesCRM');
    if (storedClientes) {
        try {
            setClientes(JSON.parse(storedClientes));
        } catch (error) {
            console.error("Error parsing stored clientes for entregas:", error);
            setClientes(initialClientesData);
        }
    } else {
        setClientes(initialClientesData);
    }
  }, []);

  useEffect(() => {
    if (entregas.length > 0 || currentEntrega) {
        localStorage.setItem('entregasCRM', JSON.stringify(entregas));
    }
  }, [entregas, currentEntrega]);

  const handleSubmit = useCallback((formData) => {
    if (currentEntrega) {
      setEntregas(prev => prev.map(e => e.id === currentEntrega.id ? { ...formData, id: currentEntrega.id } : e));
      toast({ title: "Entrega actualizada", description: "El registro de entrega ha sido modificado." });
    } else {
      setEntregas(prev => [{ ...formData, id: `ENT${Date.now()}` }, ...prev]);
      toast({ title: "Entrega registrada", description: "Nueva entrega registrada exitosamente." });
    }
    setIsFormOpen(false);
    setCurrentEntrega(null);
  }, [currentEntrega, toast]);

  const openForm = useCallback((entrega = null) => {
    setCurrentEntrega(entrega);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setEntregas(prev => prev.filter(e => e.id !== id));
    toast({ title: "Entrega eliminada", description: "El registro de entrega ha sido eliminado.", variant: "destructive" });
  }, [toast]);

  const filteredEntregas = entregas.filter(e =>
    e.clienteNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.pedidoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.entregadoPor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = ["ID Entrega", "ID Pedido", "Cliente", "Fecha Entrega", "Entregado Por", "Acciones"];

  return (
    <div className="space-y-6">
      <Toaster />
      <PageHeader 
        title="Registro de Entregas"
        actions={
          <>
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar entrega..."
                className="pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => openForm()} className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" /> Registrar Entrega
            </Button>
          </>
        }
      />

      <AnimatePresence>
        {isFormOpen && (
          <EntregaForm 
            isOpen={isFormOpen}
            currentEntrega={currentEntrega}
            onSubmit={handleSubmit}
            onCancel={() => { setIsFormOpen(false); setCurrentEntrega(null); }}
            pedidos={pedidos}
            clientes={clientes}
          />
        )}
      </AnimatePresence>
      
      <TableLayout headers={tableHeaders}>
        <AnimatePresence>
          {filteredEntregas.length > 0 ? (
            filteredEntregas.map(entrega => (
              <motion.tr
                key={entrega.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hover:bg-accent/50 dark:hover:bg-slate-800/50"
              >
                <td className="p-3 text-sm font-mono text-muted-foreground border-b">{entrega.id}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{entrega.pedidoId}</td>
                <td className="p-3 text-sm text-foreground/90 border-b">{entrega.clienteNombre}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{formatDate(entrega.fechaEntrega)}</td>
                <td className="p-3 text-sm text-muted-foreground border-b">{entrega.entregadoPor}</td>
                <td className="p-3 border-b text-right">
                  <Button variant="ghost" size="icon" onClick={() => openForm(entrega)} className="text-blue-500 hover:text-blue-600 mr-1 h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(entrega.id)} className="text-destructive hover:text-destructive/80 h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeaders.length} className="p-6 text-center">
                <EmptyState 
                  icon={Truck}
                  title="No hay entregas registradas"
                  description={searchTerm ? "No se encontraron entregas con ese criterio." : "Registra una nueva entrega para comenzar."}
                />
              </td>
            </tr>
          )}
        </AnimatePresence>
      </TableLayout>
    </div>
  );
};

export default EntregasPage;
  

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ClienteCard from '@/components/clientes/ClienteCard';
import ClienteForm from '@/components/clientes/ClienteForm';
import { initialClientesData } from '@/lib/constants';
import PageHeader from '@/components/layout/PageHeader';
import ItemList from '@/components/shared/ItemList';
import EmptyState from '@/components/shared/EmptyState';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', email: '', telefono: '', direccion: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const storedClientes = localStorage.getItem('clientesCRM');
    if (storedClientes) {
      try {
        const parsedClientes = JSON.parse(storedClientes);
        setClientes(parsedClientes);
      } catch (error) {
        console.error("Error parsing stored clientes:", error);
        setClientes(initialClientesData);
        localStorage.setItem('clientesCRM', JSON.stringify(initialClientesData));
      }
    } else {
      setClientes(initialClientesData); 
      localStorage.setItem('clientesCRM', JSON.stringify(initialClientesData));
    }
  }, []);

  useEffect(() => {
    if(clientes.length > 0) { // Only save if clientes is not empty to avoid overwriting initial load with empty array during setup
        localStorage.setItem('clientesCRM', JSON.stringify(clientes));
    }
  }, [clientes]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const newClienteData = {
      ...formData,
      fechaRegistro: currentCliente?.fechaRegistro || new Date().toISOString().split('T')[0],
      ultimaCompra: currentCliente?.ultimaCompra || null,
      ultimaRX: currentCliente?.ultimaRX || null,
      historialRX: currentCliente?.historialRX || [],
      deudaPendiente: currentCliente?.deudaPendiente || 0,
      proximaCita: currentCliente?.proximaCita || null,
      historialCitas: currentCliente?.historialCitas || [],
      notasCount: currentCliente?.notasCount || 0,
      avatarUrl: currentCliente?.avatarUrl || `https://avatar.vercel.sh/${formData.email || Date.now()}.png?size=60`,
    };

    if (currentCliente) {
      setClientes(prevClientes => prevClientes.map(c => c.id === currentCliente.id ? { ...newClienteData, id: currentCliente.id } : c));
      toast({ title: "Cliente actualizado", description: "Los datos del cliente han sido modificados." });
    } else {
      setClientes(prevClientes => [{ ...newClienteData, id: Date.now() }, ...prevClientes]);
      toast({ title: "Cliente creado", description: "Nuevo cliente registrado exitosamente." });
    }
    resetForm();
  }, [formData, currentCliente, toast]);

  const resetForm = useCallback(() => {
    setIsFormOpen(false);
    setCurrentCliente(null);
    setFormData({ nombre: '', apellido: '', email: '', telefono: '', direccion: '' });
  }, []);

  const openForm = useCallback((cliente = null) => {
    if (cliente) {
      setCurrentCliente(cliente);
      setFormData({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
      });
    } else {
      setCurrentCliente(null);
      setFormData({ nombre: '', apellido: '', email: '', telefono: '', direccion: '' });
    }
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setClientes(prevClientes => prevClientes.filter(c => c.id !== id));
    toast({ title: "Cliente eliminado", description: "El cliente ha sido eliminado.", variant: "destructive" });
  }, [toast]);

  const filteredClientes = clientes.filter(cliente =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Toaster />
      <PageHeader 
        title="Gestión de Clientes"
        actions={
          <>
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar cliente..."
                className="pl-10 w-full md:w-64 bg-card border-border focus:border-primary focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => openForm()} className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground whitespace-nowrap">
              <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Cliente
            </Button>
          </>
        }
      />

      <AnimatePresence>
        <ClienteForm
          isOpen={isFormOpen}
          formData={formData}
          currentCliente={currentCliente}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        />
      </AnimatePresence>

      <ItemList
        items={filteredClientes}
        renderItem={(cliente) => (
          <ClienteCard 
            key={cliente.id} 
            cliente={cliente} 
            onEdit={openForm} 
            onDelete={handleDelete} 
          />
        )}
        emptyState={
          <EmptyState 
            icon={Search}
            title="No se encontraron clientes"
            description={searchTerm ? "Intenta con otro término de búsqueda." : "Agrega un nuevo cliente para comenzar."}
          />
        }
        isLoading={false} 
      />
    </div>
  );
};

export default ClientesPage;
  
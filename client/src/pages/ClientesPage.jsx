import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClienteCard from "@/components/clientes/ClienteCard";
import ClienteForm from "@/components/clientes/ClienteForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { initialClientesData } from "@/lib/constants";
import PageHeader from "@/components/layout/PageHeader";
import ItemList from "@/components/shared/ItemList";
import EmptyState from "@/components/shared/EmptyState";
import { clientePorOptica } from "@/Redux/action/clientesAction";
import { useOrganization } from "@clerk/clerk-react";
import { toast } from "sonner";

const ClientesPage = () => {
  const dispatch = useDispatch();
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const clientesData = useSelector((state) => state.cliente?.cliente);

  const { organization } = useOrganization();
  const id = organization?.id;

  useEffect(() => {
    if (id) {
      dispatch(clientePorOptica(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (clientes.length > 0) {
      localStorage.setItem("clientesCRM", JSON.stringify(clientes));
    }
  }, [clientes]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newClienteData = {
        ...formData,
        fechaRegistro:
          currentCliente?.fechaRegistro ||
          new Date().toISOString().split("T")[0],
        ultimaCompra: currentCliente?.ultimaCompra || null,
        ultimaRX: currentCliente?.ultimaRX || null,
        historialRX: currentCliente?.historialRX || [],
        deudaPendiente: currentCliente?.deudaPendiente || 0,
        proximaCita: currentCliente?.proximaCita || null,
        historialCitas: currentCliente?.historialCitas || [],
        condiciones: currentCliente[0].formula?.condiciones || [],
        notasCount: currentCliente?.notasCount || 0,
        avatarUrl:
          currentCliente?.avatarUrl ||
          `https://avatar.vercel.sh/${
            formData.email || Date.now()
          }.png?size=60`,
        isTest: true,
      };

      if (currentCliente) {
        setClientes((prevClientes) =>
          prevClientes.map((c) =>
            c.id === currentCliente.id
              ? { ...newClienteData, id: currentCliente.id }
              : c
          )
        );
        toast({
          title: "Cliente actualizado",
          description: "Los datos del cliente han sido modificados.",
        });
      } else {
        setClientes((prevClientes) => [
          { ...newClienteData, id: Date.now() },
          ...prevClientes,
        ]);
        toast({
          title: "Cliente creado",
          description: "Nuevo cliente registrado exitosamente.",
        });
      }
      resetForm();
    },
    [formData, currentCliente, toast]
  );

  const resetForm = useCallback(() => {
    setIsFormOpen(false);
    setCurrentCliente(null);
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      direccion: "",
    });
  }, []);

  const openForm = useCallback(
    (cliente = null) => {
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
        resetForm();
      }
      setIsFormOpen(true);
    },
    [resetForm]
  );

  const handleDelete = useCallback(
    (id) => {
      setClientes((prevClientes) => prevClientes.filter((c) => c.id !== id));
      toast({
        title: "Cliente eliminado",
        description: "El cliente ha sido eliminado.",
        variant: "destructive",
      });
    },
    [toast]
  );

  const filteredRealClientes = Array.isArray(clientesData)
    ? clientesData.filter(
        (cliente) =>
          `${cliente.nombre} ${cliente.apellido}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
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
            <Button
              onClick={() => openForm()}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground whitespace-nowrap"
            >
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
          onClose={() => setIsFormOpen(false)}
        />
      </AnimatePresence>

      {filteredRealClientes.length > 0 && (
        <>
          <ItemList
            items={filteredRealClientes}
            renderItem={(cliente) => (
              <ClienteCard
                key={`real-${cliente.id}`}
                cliente={cliente}
                onEdit={openForm}
                onDelete={handleDelete}
              />
            )}
          />
        </>
      )}

      {filteredRealClientes.length === 0 && (
        <EmptyState
          icon={Search}
          title="No se encontraron clientes"
          description={
            searchTerm
              ? "Intenta con otro término de búsqueda."
              : "Agrega un nuevo cliente para comenzar."
          }
        />
      )}
    </div>
  );
};

export default ClientesPage;

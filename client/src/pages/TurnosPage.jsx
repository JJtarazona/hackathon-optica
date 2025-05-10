
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Search, Calendar as CalendarIcon, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialTurnosData, initialClientesData, formatDate, formatTime } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import TurnoForm from '@/components/turnos/TurnoForm.jsx';
import PageHeader from '@/components/layout/PageHeader';
import EmptyState from '@/components/shared/EmptyState';

const TurnosPage = () => {
  const [turnos, setTurnos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTurno, setCurrentTurno] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [preselectedClienteIdForForm, setPreselectedClienteIdForForm] = useState(null);

  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedTurnos = localStorage.getItem('turnosCRM');
    if (storedTurnos) {
        try {
            setTurnos(JSON.parse(storedTurnos));
        } catch (error) {
            console.error("Error parsing stored turnos:", error);
            setTurnos(initialTurnosData);
            localStorage.setItem('turnosCRM', JSON.stringify(initialTurnosData));
        }
    } else {
        setTurnos(initialTurnosData);
        localStorage.setItem('turnosCRM', JSON.stringify(initialTurnosData));
    }

    const storedClientes = localStorage.getItem('clientesCRM');
    if (storedClientes) {
      try {
          setClientes(JSON.parse(storedClientes));
      } catch (error) {
          console.error("Error parsing stored clientes for turnos page:", error);
          setClientes(initialClientesData);
      }
    } else {
        setClientes(initialClientesData);
    }
  }, []);

  useEffect(() => {
    if (turnos.length > 0 || currentTurno) {
        localStorage.setItem('turnosCRM', JSON.stringify(turnos));
    }
  }, [turnos, currentTurno]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const clienteId = params.get('clienteId');
    const action = params.get('action');
    if (clienteId && action === 'new') {
      setPreselectedClienteIdForForm(clienteId);
      openForm(null);
    }
  }, [location.search]);


  const handleSubmit = useCallback((formData) => {
    if (currentTurno?.id) {
      setTurnos(prevTurnos => prevTurnos.map(t => t.id === currentTurno.id ? { ...formData, id: currentTurno.id } : t));
      toast({ title: "Turno actualizado", description: "La cita ha sido modificada." });
    } else {
      setTurnos(prevTurnos => [{ ...formData, id: `cita${Date.now()}` }, ...prevTurnos]);
      toast({ title: "Turno agendado", description: "Nueva cita registrada exitosamente." });
    }
    resetForm();
  }, [currentTurno, toast]);

  const resetForm = useCallback(() => {
    setIsFormOpen(false);
    setCurrentTurno(null);
    setPreselectedClienteIdForForm(null);
    if (location.search.includes('clienteId')) {
      navigate('/turnos', { replace: true });
    }
  }, [navigate, location.search]);

  const openForm = useCallback((turno = null) => {
    setCurrentTurno(turno);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    setTurnos(prevTurnos => prevTurnos.filter(t => t.id !== id));
    toast({ title: "Turno eliminado", description: "La cita ha sido eliminada.", variant: "destructive" });
  }, [toast]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmada': return 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100';
      case 'Cancelada': return 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100';
      case 'Completada': return 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100';
    }
  };
  
  const filteredTurnos = turnos.filter(turno =>
    (turno.clienteNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turno.motivo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turno.optometrista?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    new Date(turno.fecha).toDateString() === currentDate.toDateString()
  ).sort((a,b) => (a.hora || "00:00").localeCompare(b.hora || "00:00"));

  const changeDay = useCallback((amount) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + amount);
      return newDate;
    });
  }, []);

  return (
    <div className="space-y-6">
      <Toaster />
      <PageHeader 
        title="Agenda de Turnos"
        actions={
          <>
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar turno..."
                className="pl-10 w-full md:w-64 bg-card border-border focus:border-primary focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => {setPreselectedClienteIdForForm(null); openForm();}} className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground whitespace-nowrap">
              <PlusCircle className="mr-2 h-5 w-5" /> Nuevo Turno
            </Button>
          </>
        }
      />

      <AnimatePresence>
        {isFormOpen && (
          <TurnoForm 
            turno={currentTurno}
            clientes={clientes}
            onSubmit={handleSubmit} 
            onCancel={resetForm} 
            preselectedClienteId={preselectedClienteIdForForm}
            preselectedDate={currentDate.toISOString().split('T')[0]}
          />
        )}
      </AnimatePresence>

      <Card className="bg-card shadow-md dark:border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => changeDay(-1)} className="h-9 w-9">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground tabular-nums">
              {formatDate(currentDate.toISOString())}
            </h2>
            <Button variant="outline" size="icon" onClick={() => changeDay(1)} className="h-9 w-9">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
           <Button variant="outline" onClick={() => setCurrentDate(new Date())} className="text-sm">Hoy</Button>
        </CardHeader>
        <CardContent className="p-0">
          {filteredTurnos.length > 0 ? (
            <ul className="divide-y divide-border dark:divide-slate-700">
              <AnimatePresence>
              {filteredTurnos.map(turno => (
                <motion.li 
                  key={turno.id} 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 hover:bg-accent/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-semibold text-primary">{formatTime(turno.hora)} - {turno.motivo}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <User className="h-4 w-4 mr-1.5 text-indigo-400" /> {turno.clienteNombre}
                      </p>
                      {turno.optometrista && 
                        <p className="text-xs text-muted-foreground/80 flex items-center mt-0.5">
                          <User className="h-3 w-3 mr-1.5 text-purple-400" /> Opt: {turno.optometrista}
                        </p>
                      }
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getStatusColor(turno.estado)}`}>{turno.estado}</Badge>
                      <Button variant="ghost" size="icon" onClick={() => openForm(turno)} className="text-blue-500 hover:text-blue-600 h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(turno.id)} className="text-destructive hover:text-destructive/80 h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {turno.notas && <p className="text-xs text-muted-foreground mt-1.5 pt-1.5 border-t border-dashed border-border dark:border-slate-700/50">{turno.notas}</p>}
                </motion.li>
              ))}
              </AnimatePresence>
            </ul>
          ) : (
             <div className="p-6 text-center">
                <EmptyState 
                  icon={CalendarIcon}
                  title="No hay turnos para este día"
                  description={searchTerm ? "Intente modificar la búsqueda o revise otro día." : "No hay citas programadas para la fecha seleccionada."}
                />
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TurnosPage;
  
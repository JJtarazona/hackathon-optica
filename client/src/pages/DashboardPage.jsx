
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Calendar, PackageMinus, DollarSign, BarChart2, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { initialClientesData, initialTurnosData, initialPedidosData, initialFacturasData, formatDate, formatCurrency, formatTime } from '@/lib/constants';

const StatCard = ({ title, value, icon: Icon, color, description, linkTo }) => {
  const navigate = useNavigate();
  return (
    <motion.div variants={itemVariants}>
      <Card 
        className="bg-card shadow-lg hover:shadow-xl transition-all duration-300 dark:border-slate-700 cursor-pointer hover:border-primary/50"
        onClick={() => linkTo && navigate(linkTo)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${color}`}>{title}</CardTitle>
          <Icon className={`h-5 w-5 ${color}`} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{value}</div>
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ChartPlaceholder = ({ title, icon: Icon, type = "bar" }) => (
  <Card className="bg-card shadow-lg dark:border-slate-700 col-span-1 md:col-span-2 lg:col-span-1">
    <CardHeader>
      <CardTitle className="text-lg text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center h-64">
      {type === "bar" && <BarChart2 className="h-24 w-24 text-primary/30" />}
      {type === "pie" && <PieChart className="h-24 w-24 text-primary/30" />}
      {type === "line" && <TrendingUp className="h-24 w-24 text-primary/30" />}
      <p className="text-sm text-muted-foreground mt-2">Gráfico de {title.toLowerCase()} (datos de prueba)</p>
      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center">
        <AlertTriangle size={14} className="mr-1" /> Implementación de gráficos reales próximamente.
      </p>
    </CardContent>
  </Card>
);

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState(initialClientesData);
  const [turnos, setTurnos] = useState(initialTurnosData);
  const [pedidos, setPedidos] = useState(initialPedidosData);
  const [facturas, setFacturas] = useState(initialFacturasData);

  useEffect(() => {
    const storedClientes = localStorage.getItem('clientesCRM');
    if (storedClientes) setClientes(JSON.parse(storedClientes));
    const storedTurnos = localStorage.getItem('turnosCRM');
    if (storedTurnos) setTurnos(JSON.parse(storedTurnos));
    const storedPedidos = localStorage.getItem('pedidosCRM');
    if (storedPedidos) setPedidos(JSON.parse(storedPedidos));
    const storedFacturas = localStorage.getItem('facturasCRM');
    if (storedFacturas) setFacturas(JSON.parse(storedFacturas));
  }, []);

  const turnosHoy = turnos.filter(t => formatDate(t.fecha) === formatDate(new Date().toISOString())).length;
  const pedidosPendientes = pedidos.filter(p => p.estado !== 'Entregado' && p.estado !== 'Cancelado').length;
  const totalIngresosMes = facturas
    .filter(f => {
      const fechaFactura = new Date(f.fechaFactura);
      const hoy = new Date();
      return fechaFactura.getMonth() === hoy.getMonth() && fechaFactura.getFullYear() === hoy.getFullYear() && f.estado === 'Pagada';
    })
    .reduce((sum, f) => sum + f.total, 0);

  const stats = [
    { title: "Clientes Registrados", value: clientes.length, icon: Users, color: "text-indigo-500 dark:text-indigo-400", description: "Total de clientes activos.", linkTo: "/app/clientes" },
    { title: "Turnos Hoy", value: turnosHoy, icon: Calendar, color: "text-purple-500 dark:text-purple-400", description: "Citas programadas para hoy.", linkTo: "/app/turnos" },
    { title: "Pedidos Pendientes", value: pedidosPendientes, icon: PackageMinus, color: "text-pink-500 dark:text-pink-400", description: "Pedidos en proceso.", linkTo: "/app/pedidos" },
    { title: "Ingresos Este Mes", value: formatCurrency(totalIngresosMes), icon: DollarSign, color: "text-green-500 dark:text-green-400", description: "Facturas pagadas este mes.", linkTo: "/app/facturacion" },
  ];
  
  const recentActivity = [
    ...clientes.slice(0, 1).map(c => ({ type: "Nuevo cliente", text: `${c.nombre} ${c.apellido} - Registrado.`, color: "text-indigo-500 dark:text-indigo-400", date: c.fechaRegistro })),
    ...turnos.filter(t => t.estado === 'Confirmada').slice(0, 1).map(t => ({ type: "Turno", text: `${t.clienteNombre} - Confirmado para ${formatTime(t.hora)}.`, color: "text-purple-500 dark:text-purple-400", date: t.fecha })),
    ...pedidos.filter(p => p.estado === 'En Laboratorio').slice(0, 1).map(p => ({ type: "Pedido", text: `Pedido ${p.id} para ${p.clienteNombre} - Enviado a lab.`, color: "text-pink-500 dark:text-pink-400", date: p.fechaPedido })),
    ...facturas.filter(f => f.estado === 'Pagada').slice(0,1).map(f => ({ type: "Factura", text: `Factura ${f.id} para ${f.clienteNombre} - Pagada.`, color: "text-green-500 dark:text-green-400", date: f.fechaFactura })),
  ].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,4);


  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Principal</h1>
        <Button onClick={() => navigate('/app/turnos')} className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Agendar Turno
        </Button>
      </motion.div>

      <motion.div variants={cardVariants} className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>
      
      <motion.div variants={cardVariants} className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ChartPlaceholder title="Pacientes Atendidos (Últ. 7 días)" icon={Users} type="bar" />
        <ChartPlaceholder title="Pedidos por Estado" icon={PackageMinus} type="pie" />
        <ChartPlaceholder title="Ingresos Mensuales (Últ. 6 meses)" icon={DollarSign} type="line" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-card shadow-lg dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-foreground">Actividad Reciente</CardTitle>
            <CardDescription className="text-muted-foreground">Últimos movimientos en el sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <ul className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="text-sm text-foreground/90 dark:text-slate-300 flex items-start">
                    <span className={`font-semibold ${activity.color} mr-1.5`}>{activity.type}:</span> 
                    <span>{activity.text}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{formatDate(activity.date)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No hay actividad reciente para mostrar.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
  
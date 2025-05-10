
import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, PieChart, Users, ShoppingCart, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportCard = ({ title, description, icon: Icon, dataValue, chartType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 dark:border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground/90">{title}</CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {dataValue && <div className="text-2xl font-bold text-primary">{dataValue}</div>}
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
          <div className="mt-4 h-32 bg-muted/50 dark:bg-slate-800/50 rounded-md flex items-center justify-center">
            {chartType === 'bar' && <BarChart className="h-12 w-12 text-primary/30" />}
            {chartType === 'pie' && <PieChart className="h-12 w-12 text-primary/30" />}
            {!chartType && <AlertTriangle className="h-12 w-12 text-amber-500/50" />}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ReportesPage = () => {
  const reportesDisponibles = [
    { title: "Ventas del Mes", description: "Total de ingresos generados en el mes actual.", icon: ShoppingCart, dataValue: "$12,345", chartType: "bar" },
    { title: "Clientes Nuevos", description: "Número de clientes registrados este mes.", icon: Users, dataValue: "23", chartType: "bar" },
    { title: "Pedidos Pendientes", description: "Pedidos que aún no han sido entregados.", icon: ShoppingCart, dataValue: "8", chartType: "pie" },
    { title: "Productos Más Vendidos", description: "Top 5 productos por unidades vendidas.", icon: BarChart, dataValue: "Lentes Sol XYZ", chartType: "pie" },
    { title: "Citas Completadas vs. Canceladas", description: "Comparativa de citas del último periodo.", icon: Users, dataValue: "85% Comp.", chartType: "bar" },
    { title: "Rendimiento por Optometrista", description: "Ventas y citas por cada optometrista.", icon: Users, dataValue: "Dr. López", chartType: "pie" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Reportes y Estadísticas" />
      
      <motion.div 
        className="p-6 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-md shadow"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Módulo en Desarrollo</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Los reportes detallados y personalizables estarán disponibles próximamente. Por ahora, puedes ver una vista previa de los tipos de reportes que ofreceremos.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportesDisponibles.map((report, index) => (
          <ReportCard 
            key={index}
            title={report.title}
            description={report.description}
            icon={report.icon}
            dataValue={report.dataValue}
            chartType={report.chartType}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportesPage;
  
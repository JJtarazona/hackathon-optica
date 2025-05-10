
export const initialClientesData = [
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'Pérez',
    email: 'ana.perez@example.com',
    telefono: '555-1234',
    direccion: 'Calle Falsa 123, Ciudad',
    fechaRegistro: '2023-01-15',
    ultimaCompra: { item: 'Lentes Progresivos Zeiss', precio: 145.05, fecha: '2024-04-20' },
    ultimaRX: {
      id: 'rx1_ana',
      fecha: '2024-03-16',
      od: { sph: -2.25, cyl: -0.75, axis: 180, dp: 31.5 },
      os: { sph: -3.00, cyl: -0.50, axis: 175, dp: 32.0 },
      add: '+1.75',
      tipoLente: 'Progresivo',
      material: 'Policarbonato',
      tratamientos: ['Antirreflejo', 'Fotocromático'],
      observaciones: 'Adaptación a progresivos, revisar en 15 días.',
      condiciones: ['Miopía', 'Astigmatismo', 'Presbicia'],
      optometrista: 'Dr. López'
    },
    historialRX: [
      { id: 'rx1_ana', fecha: '2024-03-16', optometrista: 'Dr. López', od_sph: -2.25, os_sph: -3.00 },
      { id: 'rx0_ana', fecha: '2022-02-10', optometrista: 'Dr. López', od_sph: -2.00, os_sph: -2.75 },
    ],
    deudaPendiente: -46.00,
    proximaCita: { id: 'cita1_ana', fecha: '2025-05-21', hora: '10:30', motivo: 'Revisión anual', estado: 'Confirmada' },
    historialCitas: [
      { id: 'cita1_ana', fecha: '2025-05-21', hora: '10:30', motivo: 'Revisión anual', estado: 'Confirmada' },
      { id: 'cita0_ana', fecha: '2024-03-16', hora: '11:00', motivo: 'Examen Visual', estado: 'Completada' },
    ],
    notasCount: 2,
    avatarUrl: 'https://avatar.vercel.sh/ana.perez@example.com.png?size=60'
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Gómez',
    email: 'carlos.gomez@example.com',
    telefono: '555-5678',
    direccion: 'Av. Siempreviva 742, Pueblo',
    fechaRegistro: '2023-02-20',
    ultimaCompra: { item: 'Lentes de Contacto Acuvue', precio: 60.00, fecha: '2024-05-01' },
    ultimaRX: {
      id: 'rx1_carlos',
      fecha: '2024-04-10',
      od: { sph: -1.50, dp: 33.0 },
      os: { sph: -1.75, dp: 33.5 },
      tipoLente: 'Contacto Blando',
      material: 'Hidrogel de Silicona',
      observaciones: 'Usuario de lentes de contacto mensuales.',
      condiciones: ['Miopía'],
      optometrista: 'Dra. Martínez'
    },
    historialRX: [
       { id: 'rx1_carlos', fecha: '2024-04-10', optometrista: 'Dra. Martínez', od_sph: -1.50, os_sph: -1.75 },
    ],
    deudaPendiente: 0,
    proximaCita: null,
    historialCitas: [
       { id: 'cita0_carlos', fecha: '2024-04-10', hora: '14:00', motivo: 'Adaptación Lentes de Contacto', estado: 'Completada' },
    ],
    notasCount: 0,
    avatarUrl: 'https://avatar.vercel.sh/carlos.gomez@example.com.png?size=60'
  },
  {
    id: 3,
    nombre: 'Laura',
    apellido: 'Martínez',
    email: 'laura.martinez@example.com',
    telefono: '555-8765',
    direccion: 'Boulevard de los Sueños Rotos 45, Villa',
    fechaRegistro: '2023-05-10',
    ultimaCompra: { item: 'Gafas de Sol Ray-Ban Graduadas', precio: 220.75, fecha: '2024-03-15' },
    ultimaRX: {
      id: 'rx1_laura',
      fecha: '2024-02-28',
      od: { sph: 0.00, cyl: -1.00, axis: 90, dp: 30.5 },
      os: { sph: 0.00, cyl: -1.25, axis: 85, dp: 31.0 },
      tipoLente: 'Visión Sencilla',
      material: 'CR-39',
      tratamientos: ['Filtro UV'],
      observaciones: 'Para uso ocasional, principalmente conducción.',
      condiciones: ['Astigmatismo'],
      optometrista: 'Dr. Fernández'
    },
    historialRX: [
      { id: 'rx1_laura', fecha: '2024-02-28', optometrista: 'Dr. Fernández', od_cyl: -1.00, os_cyl: -1.25 },
    ],
    deudaPendiente: 0,
    proximaCita: { id: 'cita1_laura', fecha: '2025-06-10', hora: '16:00', motivo: 'Control Astigmatismo', estado: 'Pendiente' },
    historialCitas: [
      { id: 'cita1_laura', fecha: '2025-06-10', hora: '16:00', motivo: 'Control Astigmatismo', estado: 'Pendiente' },
    ],
    notasCount: 1,
    avatarUrl: 'https://avatar.vercel.sh/laura.martinez@example.com.png?size=60'
  },
  {
    id: 4,
    nombre: 'Pedro',
    apellido: 'Ramírez',
    email: 'pedro.ramirez@example.com',
    telefono: '555-4321',
    direccion: 'Camino Real 88, Aldea',
    fechaRegistro: '2023-08-01',
    ultimaCompra: { item: 'Armazón + Lentes Blue Protect', precio: 180.50, fecha: '2024-01-20'},
    ultimaRX: {
        id: 'rx1_pedro',
        fecha: '2024-01-15',
        od: { sph: +1.25, dp: 32.0 },
        os: { sph: +1.50, dp: 32.5 },
        tipoLente: 'Visión Sencilla',
        material: 'Trivex',
        tratamientos: ['Blue Protect'],
        observaciones: 'Uso principal para computadora.',
        condiciones: ['Hipermetropía'],
        optometrista: 'Dra. Sánchez'
    },
    historialRX: [
        { id: 'rx1_pedro', fecha: '2024-01-15', optometrista: 'Dra. Sánchez', od_sph: +1.25, os_sph: +1.50 }
    ],
    deudaPendiente: 0.00,
    proximaCita: { id: 'cita1_pedro', fecha: '2025-07-15', hora: '09:00', motivo: 'Revisión y graduación', estado: 'Confirmada'},
    historialCitas: [
        { id: 'cita1_pedro', fecha: '2025-07-15', hora: '09:00', motivo: 'Revisión y graduación', estado: 'Confirmada'},
        { id: 'cita0_pedro', fecha: '2024-01-15', hora: '09:30', motivo: 'Examen visual inicial', estado: 'Completada'}
    ],
    notasCount: 0,
    avatarUrl: 'https://avatar.vercel.sh/pedro.ramirez@example.com.png?size=60'
  }
];

export const initialFormulasData = initialClientesData.reduce((acc, cliente) => {
  if (cliente.historialRX) {
    cliente.historialRX.forEach(rx => {
      const fullRxDetails = cliente.ultimaRX?.id === rx.id ? cliente.ultimaRX : rx;
      acc.push({
        id: fullRxDetails.id || `rx_fallback_${Date.now()}_${Math.random()}`,
        fecha: fullRxDetails.fecha,
        optometrista: fullRxDetails.optometrista,
        clienteId: cliente.id,
        clienteNombre: `${cliente.nombre} ${cliente.apellido}`,
        od: fullRxDetails.od || {sph: rx.od_sph, cyl: rx.od_cyl, axis: rx.od_axis, add: rx.od_add, dp: rx.od_dp},
        os: fullRxDetails.os || {sph: rx.os_sph, cyl: rx.os_cyl, axis: rx.os_axis, add: rx.os_add, dp: rx.os_dp},
        add: fullRxDetails.add,
        tipoLente: fullRxDetails.tipoLente || 'No especificado',
        material: fullRxDetails.material || 'No especificado',
        tratamientos: fullRxDetails.tratamientos || [],
        observaciones: fullRxDetails.observaciones || '',
      });
    });
  }
  return acc;
}, []);


export const initialTurnosData = initialClientesData.reduce((acc, cliente) => {
    if (cliente.historialCitas) {
        cliente.historialCitas.forEach(cita => {
            acc.push({
                ...cita, // This includes id, fecha, hora, motivo, estado
                title: `${cita.motivo || 'Cita'} - ${cliente.nombre} ${cliente.apellido}`, // for calendar view
                start: `${cita.fecha}T${cita.hora || '09:00'}:00`, 
                end: `${cita.fecha}T${(cita.hora ? (parseInt(cita.hora.split(':')[0]) + 1).toString().padStart(2, '0') : '10')}:${cita.hora ? cita.hora.split(':')[1] : '00'}:00`, 
                clienteId: cliente.id,
                clienteNombre: `${cliente.nombre} ${cliente.apellido}`,
                optometrista: cliente.ultimaRX?.optometrista || 'N/A'
            });
        });
    }
    return acc;
}, []);

export const initialInventarioData = [
  { id: 'ARM001', tipo: 'Armazón', nombre: 'Ray-Ban Aviator Classic', marca: 'Ray-Ban', material: 'Metal', color: 'Dorado', stock: 15, precioCompra: 70.00, precioVenta: 150.00, proveedorId: 'PROV001' },
  { id: 'ARM002', tipo: 'Armazón', nombre: 'Oakley Holbrook', marca: 'Oakley', material: 'Plástico', color: 'Negro Mate', stock: 25, precioCompra: 60.00, precioVenta: 130.00, proveedorId: 'PROV002' },
  { id: 'ARM003', tipo: 'Armazón', nombre: 'Persol PO3007V', marca: 'Persol', material: 'Acetato', color: 'Havana', stock: 10, precioCompra: 90.00, precioVenta: 200.00, proveedorId: 'PROV001' },
  { id: 'LEN001', tipo: 'Lente Oftálmico', nombre: 'Zeiss Progresivo Individual 2', marca: 'Zeiss', material: 'CR-39', indice: '1.50', stock: 50, precioCompra: 50.00, precioVenta: 120.00, proveedorId: 'LAB001' },
  { id: 'LEN002', tipo: 'Lente Oftálmico', nombre: 'Essilor Varilux Comfort', marca: 'Essilor', material: 'Policarbonato', indice: '1.59', stock: 40, precioCompra: 65.00, precioVenta: 140.00, proveedorId: 'LAB002' },
  { id: 'SOL001', tipo: 'Gafa de Sol', nombre: 'Maui Jim Ho\'okipa', marca: 'Maui Jim', material: 'Nylon', color: 'Gris Transparente', stock: 12, precioCompra: 80.00, precioVenta: 180.00, proveedorId: 'PROV002' },
  { id: 'CON001', tipo: 'Lente de Contacto', nombre: 'Acuvue Oasys 1-Day', marca: 'Johnson & Johnson', duracion: 'Diario', stock: 100, precioCompra: 20.00, precioVenta: 45.00, proveedorId: 'LAB003' },
];

export const initialPedidosData = [
  { id: 'PED001', clienteId: 1, clienteNombre: 'Ana Pérez', fechaPedido: '2024-05-01', fechaEstimadaEntrega: '2024-05-10', estado: 'En Laboratorio', laboratorio: 'LAB001', total: 270.00, items: [{itemId: 'ARM001', cantidad: 1, precio: 150.00}, {itemId: 'LEN001', cantidad: 1, precio: 120.00}] },
  { id: 'PED002', clienteId: 2, clienteNombre: 'Carlos Gómez', fechaPedido: '2024-05-03', fechaEstimadaEntrega: '2024-05-08', estado: 'Enviado', laboratorio: 'LAB003', total: 45.00, items: [{itemId: 'CON001', cantidad: 1, precio: 45.00}]},
  { id: 'PED003', clienteId: 3, clienteNombre: 'Laura Martínez', fechaPedido: '2024-04-25', fechaEstimadaEntrega: '2024-05-05', estado: 'Recibido en Óptica', laboratorio: 'LAB002', total: 340.00, items: [{itemId: 'ARM003', cantidad: 1, precio: 200.00}, {itemId: 'LEN002', cantidad: 1, precio: 140.00}]},
];

export const initialEntregasData = [
  { id: 'ENT001', pedidoId: 'PED001', clienteId: 1, clienteNombre: 'Ana Pérez', fechaEntrega: '2024-05-12', notas: 'Cliente satisfecho con los progresivos.', entregadoPor: 'Admin' },
  { id: 'ENT002', pedidoId: 'PED002', clienteId: 2, clienteNombre: 'Carlos Gómez', fechaEntrega: '2024-05-09', notas: 'Instrucciones de cuidado de lentes de contacto dadas.', entregadoPor: 'Admin' },
];

export const initialFacturasData = [
  { id: 'FACT001', clienteId: 1, clienteNombre: 'Ana Pérez', fechaFactura: '2024-05-12', pedidoId: 'PED001', total: 270.00, metodoPago: 'Tarjeta de Crédito', estado: 'Pagada' },
  { id: 'FACT002', clienteId: 2, clienteNombre: 'Carlos Gómez', fechaFactura: '2024-05-09', pedidoId: 'PED002', total: 45.00, metodoPago: 'Efectivo', estado: 'Pagada' },
  { id: 'FACT003', clienteId: 4, clienteNombre: 'Pedro Ramírez', fechaFactura: '2024-01-20', total: 180.50, metodoPago: 'Transferencia', estado: 'Pagada' },
];

export const initialProveedoresData = [
  { id: 'PROV001', nombre: 'Luxottica Group', contacto: 'Juan Pérez', email: 'ventas@luxottica.es', telefono: '555-0011', direccion: 'Milán, Italia', tipo: 'Armazones', notas: 'Principal proveedor de marcas de lujo.' },
  { id: 'PROV002', nombre: 'Kering Eyewear', contacto: 'Maria Lopez', email: 'contacto@keringeyewear.com', telefono: '555-0022', direccion: 'Padua, Italia', tipo: 'Armazones, Gafas de Sol', notas: 'Marcas como Gucci, Saint Laurent.' },
  { id: 'LAB001', nombre: 'Zeiss Vision Care', contacto: 'Carlos Sanchez', email: 'laboratorio@zeiss.es', telefono: '555-0033', direccion: 'Aalen, Alemania', tipo: 'Lentes Oftálmicos', notas: 'Lentes de alta precisión.' },
  { id: 'LAB002', nombre: 'EssilorLuxottica Lab', contacto: 'Laura Garcia', email: 'lab.es@essilor.com', telefono: '555-0044', direccion: 'Charenton-le-Pont, Francia', tipo: 'Lentes Oftálmicos', notas: 'Amplia gama de lentes Varilux.' },
  { id: 'LAB003', nombre: 'CooperVision Iberia', contacto: 'Pedro Martin', email: 'pedidos@coopervision.es', telefono: '555-0055', direccion: 'Madrid, España', tipo: 'Lentes de Contacto', notas: 'Especialistas en lentes de contacto.' },
];

export const estadosPedido = ['Pendiente', 'En Laboratorio', 'Enviado', 'Recibido en Óptica', 'Listo para Entrega', 'Entregado', 'Cancelado'];
export const tiposProductoInventario = ['Armazón', 'Lente Oftálmico', 'Gafa de Sol', 'Lente de Contacto', 'Accesorio', 'Otro'];
export const metodosPago = ['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia Bancaria', 'Cheque', 'Otro'];
export const estadosFactura = ['Pendiente', 'Pagada', 'Parcialmente Pagada', 'Vencida', 'Cancelada'];
export const tiposProveedor = ['Armazones', 'Lentes Oftálmicos', 'Lentes de Contacto', 'Gafas de Sol', 'Accesorios', 'Servicios', 'Otro'];


export const optometristas = [
  { id: 'dr_lopez', nombre: 'Dr. López' },
  { id: 'dra_martinez', nombre: 'Dra. Martínez' },
  { id: 'dr_fernandez', nombre: 'Dr. Fernández' },
  { id: 'dra_sanchez', nombre: 'Dra. Sánchez' },
];

export const tiposLente = ['Visión Sencilla', 'Bifocal', 'Progresivo', 'Ocupacional', 'Contacto Blando', 'Contacto RGP'];
export const materialesLente = ['CR-39', 'Policarbonato', 'Trivex', 'Alto Índice 1.67', 'Alto Índice 1.74', 'Vidrio'];
export const tratamientosLente = ['Antirreflejo', 'Fotocromático', 'Blue Protect', 'Filtro UV', 'Polarizado', 'Tinte'];
export const estadosCita = ['Pendiente', 'Confirmada', 'Cancelada', 'Completada', 'No Asistió'];

export const formatFormField = (value) => {
    if (value === null || value === undefined || value === '') return 'N/A';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return String(value);
    if (numValue > 0) return `+${numValue.toFixed(2)}`;
    return numValue.toFixed(2);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  // Check if the date is valid after parsing. Add a day because of timezone issues sometimes.
  const adjustedDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()*60000));
  if (isNaN(adjustedDate.getTime())) return 'Fecha inválida';
  try {
    return adjustedDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (error) {
    console.error("Error formatting date:", error, "Input:", dateString);
    return 'Fecha inválida';
  }
};

export const formatTime = (timeString) => {
  if (!timeString) return 'N/A';
  const [hours, minutes] = timeString.split(':');
  if (!hours || !minutes) return timeString; 
  
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  
  try {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch (error) {
    return timeString; 
  }
};

export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return '$0.00';
    amount = parsedAmount;
  }
  try {
    return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
  } catch (error) {
    return `${Number(amount).toFixed(2)}`;
  }
};
  
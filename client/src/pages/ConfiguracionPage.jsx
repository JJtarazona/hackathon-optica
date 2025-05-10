
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import PageHeader from '@/components/layout/PageHeader';
import { Save, Bell, Palette, Shield, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const ConfiguracionPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    nombreEmpresa: 'OptiCRM Solutions',
    direccionEmpresa: 'Calle de la Óptica 123, Ciudad Visión',
    emailNotificaciones: 'notificaciones@opticrm.com',
    recordatoriosSMS: true,
    recordatoriosEmail: true,
    logoUrl: '',
    colorPrimario: '#6366F1', 
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem('configuracionCRM');
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings(parsedSettings);
        if (parsedSettings.colorPrimario) {
           document.documentElement.style.setProperty('--primary', parsedSettings.colorPrimario);
        }
      } catch (error) {
        console.error("Error parsing stored settings:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setSettings(prev => ({ ...prev, colorPrimario: newColor }));
    document.documentElement.style.setProperty('--primary-dynamic', newColor);
    
    const primaryColorValue = newColor.replace('#','');
    let r,g,b;
    if(primaryColorValue.length === 3) {
        r = parseInt(primaryColorValue[0]+primaryColorValue[0], 16);
        g = parseInt(primaryColorValue[1]+primaryColorValue[1], 16);
        b = parseInt(primaryColorValue[2]+primaryColorValue[2], 16);
    } else if (primaryColorValue.length === 6) {
        r = parseInt(primaryColorValue.substring(0,2), 16);
        g = parseInt(primaryColorValue.substring(2,4), 16);
        b = parseInt(primaryColorValue.substring(4,6), 16);
    } else {
        return; 
    }
    document.documentElement.style.setProperty('--primary', `${r} ${g} ${b}`);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('configuracionCRM', JSON.stringify(settings));
    toast({
      title: "Configuración Guardada",
      description: "Tus ajustes han sido guardados exitosamente.",
    });
  };

  const sections = [
    {
      title: "Información de la Empresa",
      icon: Building,
      fields: [
        { name: "nombreEmpresa", label: "Nombre de la Empresa", type: "text" },
        { name: "direccionEmpresa", label: "Dirección Principal", type: "text" },
        { name: "logoUrl", label: "URL del Logo (Opcional)", type: "url", placeholder: "https://ejemplo.com/logo.png" },
      ]
    },
    {
      title: "Notificaciones",
      icon: Bell,
      fields: [
        { name: "emailNotificaciones", label: "Email para Notificaciones", type: "email" },
        { name: "recordatoriosSMS", label: "Habilitar Recordatorios SMS", type: "switch" },
        { name: "recordatoriosEmail", label: "Habilitar Recordatorios por Email", type: "switch" },
      ]
    },
    {
      title: "Apariencia",
      icon: Palette,
      fields: [
        { name: "colorPrimario", label: "Color Primario de la Marca", type: "color" },
      ]
    },
     {
      title: "Seguridad (Próximamente)",
      icon: Shield,
      fields: [
         { name: "autenticacionDosFactores", label: "Autenticación de Dos Factores (2FA)", type: "switch", disabled: true },
         { name: "politicaContrasenas", label: "Política de Contraseñas", type: "text", disabled: true, placeholder: "Mínimo 8 caracteres, 1 mayúscula..." },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Toaster />
      <PageHeader title="Configuración del Sistema" />

      <form onSubmit={handleSubmit} className="space-y-8">
        {sections.map((section, sectionIdx) => (
          <motion.div 
            key={sectionIdx}
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration: 0.3, delay: sectionIdx * 0.1}}
          >
            <Card className="overflow-hidden shadow-lg dark:border-slate-700">
              <CardHeader className="bg-muted/30 dark:bg-slate-800/50 border-b dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 grid gap-6 md:grid-cols-2">
                {section.fields.map((field) => (
                  <div key={field.name} className={field.type === 'switch' ? 'flex items-center justify-between col-span-full sm:col-span-1 pt-2' : 'space-y-1.5'}>
                    <Label htmlFor={field.name} className={field.type === 'switch' ? 'text-sm font-medium' : ''}>
                      {field.label}
                    </Label>
                    {field.type === 'switch' ? (
                      <Switch
                        id={field.name}
                        name={field.name}
                        checked={settings[field.name]}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, [field.name]: checked }))}
                        disabled={field.disabled}
                      />
                    ) : field.type === 'color' ? (
                       <Input
                        id={field.name}
                        name={field.name}
                        type="color"
                        value={settings[field.name]}
                        onChange={handleColorChange}
                        className="w-full h-10 p-1"
                        disabled={field.disabled}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={settings[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <CardFooter className="flex justify-end p-0 pt-4">
          <Button type="submit" size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground hover:from-primary/90 hover:to-purple-600/90">
            <Save className="mr-2 h-5 w-5" /> Guardar Configuración
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default ConfiguracionPage;
  
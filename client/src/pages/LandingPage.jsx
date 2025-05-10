import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  BarChart,
  Users,
  Calendar,
  Package,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lenis from "lenis";
import { SignUpButton } from "@clerk/clerk-react";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border/50 dark:border-slate-700/50"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

const DeviceMockup = ({ type = "laptop" }) => {
  const commonClasses =
    "absolute rounded-lg shadow-2xl border-4 border-slate-700 dark:border-slate-500";
  const contentClasses =
    "w-full h-full bg-slate-800 dark:bg-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs";

  if (type === "laptop") {
    return (
      <motion.div
        className={`w-[300px] h-[200px] md:w-[450px] md:h-[300px] bg-slate-900 dark:bg-slate-800 p-2 rounded-t-lg relative ${commonClasses}`}
        initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={contentClasses}>
          <img
            alt="CRM Dashboard Preview on Laptop"
            src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b"
          />
        </div>
        <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-[60%] h-2 bg-slate-700 dark:bg-slate-600 rounded-b-md"></div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`w-[100px] h-[200px] md:w-[150px] md:h-[300px] bg-slate-900 dark:bg-slate-800 p-1.5 rounded-[20px] relative ${commonClasses}`}
      initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <div className={`rounded-[16px] overflow-hidden ${contentClasses}`}>
        <img
          alt="CRM Mobile Preview on iPhone"
          src="https://images.unsplash.com/photo-1648134859182-98df6e93ef58"
        />
      </div>
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-slate-600 dark:bg-slate-500 rounded-full"></div>
      <div className="absolute -right-1 top-16 w-1 h-6 bg-slate-700 dark:bg-slate-600 rounded-l-sm"></div>
      <div className="absolute -left-1 top-16 w-1 h-6 bg-slate-700 dark:bg-slate-600 rounded-r-sm"></div>
      <div className="absolute -left-1 top-24 w-1 h-6 bg-slate-700 dark:bg-slate-600 rounded-r-sm"></div>
    </motion.div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (value) =>
    value < 0.5 ? "sticky" : "relative"
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const features = [
    {
      icon: Users,
      title: "Gestión de Clientes 360°",
      description:
        "Todo el historial de tus pacientes, recetas y citas en un solo lugar.",
      delay: 0.1,
    },
    {
      icon: Calendar,
      title: "Agenda Inteligente",
      description:
        "Organiza turnos, confirma citas y reduce las ausencias con recordatorios.",
      delay: 0.2,
    },
    {
      icon: Package,
      title: "Control de Inventario",
      description:
        "Administra armazones, lentes y stock con alertas de mínimos.",
      delay: 0.3,
    },
    {
      icon: BarChart,
      title: "Facturación Simplificada",
      description:
        "Genera facturas, registra pagos y lleva un control de tus ventas.",
      delay: 0.4,
    },
    {
      icon: Settings,
      title: "Multi-Sucursal y Personalizable",
      description:
        "Adapta OptiCRM a tu óptica, gestiona varias sucursales y roles de usuario.",
      delay: 0.5,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-background via-slate-50 to-indigo-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-900/30 text-foreground min-h-screen overflow-x-hidden">
      <motion.header
        ref={targetRef}
        style={{ opacity, scale, position: "sticky", top: 0 }}
        className="sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5 border-b border-transparent">
            <motion.h1
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              OptiCRM
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SignUpButton afterSignInUrl="/app/dashboard" mode="modal">
                <span className="flex items-center gap-2">
                  Acceder al CRM <ArrowRight className="h-4 w-4" />
                </span>
              </SignUpButton>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10"></div>
            <motion.div
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl filter"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              La Solución SaaS Definitiva para tu Óptica
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Optimiza cada proceso, desde la agenda hasta la facturación.
              OptiCRM es la herramienta simple, escalable y centrada en tu
              éxito.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <SignUpButton
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground rounded-full shadow-xl text-lg px-10 py-6 transition-transform hover:scale-105"
                afterSignInUrl="/app/dashboard"
                mode="modal"
                redirectUrl="/app/dashboard"
              >
                <span className="flex items-center gap-2">
                  Comienza a Transformar tu Óptica{" "}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </SignUpButton>
            </motion.div>
          </div>
          <div className="mt-16 md:mt-24 flex justify-center items-end gap-4 md:gap-8 px-4">
            <DeviceMockup type="iphone" />
            <DeviceMockup type="laptop" />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background dark:bg-slate-900/70">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Todo lo que necesitas, y más
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">
                OptiCRM está diseñado para simplificar la complejidad de la
                gestión de una óptica moderna.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Beneficios Clave de OptiCRM
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-xl mx-auto">
                Descubre cómo OptiCRM puede impulsar la eficiencia y el
                crecimiento de tu negocio.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  class="rounded-xl shadow-2xl border border-border/30"
                  alt="Optometrist using OptiCRM on a tablet"
                  src="https://images.unsplash.com/photo-1687582393793-ff2a33057a59"
                />
              </motion.div>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                {[
                  {
                    title: "Aumenta la Productividad",
                    description:
                      "Automatiza tareas repetitivas y permite a tu equipo centrarse en la atención al cliente.",
                  },
                  {
                    title: "Mejora la Experiencia del Paciente",
                    description:
                      "Acceso rápido al historial, recordatorios de citas y seguimiento personalizado.",
                  },
                  {
                    title: "Toma Decisiones Informadas",
                    description:
                      "Reportes simples y visuales para entender el rendimiento de tu óptica.",
                  },
                  {
                    title: "Escalabilidad Garantizada",
                    description:
                      "Crece sin preocupaciones. OptiCRM se adapta a tus necesidades, desde una óptica hasta una cadena.",
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg text-foreground">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gradient-to-t from-primary/10 via-transparent to-transparent dark:from-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              ¿Listo para llevar tu óptica al siguiente nivel?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Únete a las ópticas que ya están transformando su gestión con
              OptiCRM.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                onClick={() => navigate("/app/dashboard")}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground rounded-full shadow-xl text-lg px-10 py-6 transition-transform hover:scale-105"
              >
                Explorar OptiCRM Ahora
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-card dark:bg-slate-900 border-t border-border dark:border-slate-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>
            &copy; {new Date().getFullYear()} OptiCRM. Todos los derechos
            reservados.
          </p>
          <p>Desarrollado con ❤️ para ópticas modernas.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

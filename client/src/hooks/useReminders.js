import { useCallback } from "react";

export const useReminders = () => {
  const sendWhatsApp = useCallback((cliente, messageTemplate = null) => {
    if (!cliente?.telefono) {
      throw new Error("El cliente no tiene un número de teléfono registrado");
    }

    const phoneNumber = cliente.telefono.replace(/\D/g, "");
    const defaultMessage =
      messageTemplate ||
      `Hola ${cliente.nombre}, este es un recordatorio de tu próxima cita en nuestra óptica.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`,
      "_blank"
    );
  }, []);

  const sendEmail = useCallback(
    (cliente, subjectTemplate = null, bodyTemplate = null) => {
      if (!cliente?.email) {
        throw new Error("El cliente no tiene un email registrado");
      }

      const subject = subjectTemplate || "Recordatorio de cita - Óptica";
      const body =
        bodyTemplate ||
        `Estimado/a ${cliente.nombre} ${cliente.apellido},\n\nEste es un recordatorio de su próxima cita con nosotros.\n\nSaludos cordiales,\nEl equipo de la óptica`;

      window.open(
        `mailto:${cliente.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`,
        "_blank"
      );
    },
    []
  );

  return { sendWhatsApp, sendEmail };
};

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { XCircle, Save } from "lucide-react";
import { motion } from "framer-motion";
import {
  optometristas,
  tiposLente,
  materialesLente,
  opcionesCondiciones,
} from "@/lib/constants";
import { useOrganization } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { createFormula, updateFormula } from "../../Redux/action/formulaAction";
import { clientePorOptica } from "../../Redux/action/clientesAction";

const FormulaForm = ({ formula, onSubmit, onCancel, preselectedClienteId }) => {
  const cliente = useSelector((state) => state.cliente.cliente);
  const { organization } = useOrganization();
  const dispatch = useDispatch();

  useEffect(() => {
    if (organization?.id) {
      dispatch(clientePorOptica(organization.id));
    }
  }, [organization?.id]);

  const [formData, setFormData] = useState({
    clienteId: preselectedClienteId || "",
    fecha: new Date().toISOString().split("T")[0],
    optometrista: "",
    od_sph: "",
    od_cyl: "",
    od_axis: "",
    od_dp: "",
    od_add: "",
    os_sph: "",
    os_cyl: "",
    os_axis: "",
    os_dp: "",
    os_add: "",
    add: "",
    tipoLente: "",
    material: "",
    condiciones: [],
    observaciones: "",
  });

  useEffect(() => {
    if (formula) {
      setFormData({
        clienteId: formula.clienteId || preselectedClienteId || "",
        fecha: formula.fecha.split("T")[0],
        optometrista: formula.optometrista || "",
        od_sph: formula.od_sph || "",
        od_cyl: formula.od_cyl || "",
        od_axis: formula.od_axis || "",
        od_dp: formula.od_dp || "",
        od_add: formula.od_add || "",
        os_sph: formula.os_sph || "",
        os_cyl: formula.os_cyl || "",
        os_axis: formula.os_axis || "",
        os_dp: formula.os_dp || "",
        os_add: formula.os_add || "",
        add: formula.add || "",
        tipoLente: formula.tipoLente || "",
        material: formula.material || "",
        condiciones: formula.condiciones || [],
        observaciones: formula.observaciones || "",
      });
    } else {
      setFormData({
        clienteId: preselectedClienteId || "",
        fecha: new Date().toISOString().split("T")[0],
        optometrista: "",
        od_sph: "",
        od_cyl: "",
        od_axis: "",
        od_dp: "",
        od_add: "",
        os_sph: "",
        os_cyl: "",
        os_axis: "",
        os_dp: "",
        os_add: "",
        add: "",
        tipoLente: "",
        material: "",
        condiciones: [],
        observaciones: "",
      });
    }
  }, [formula, preselectedClienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData((prev) => {
      const currentValues = prev[name] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter((item) => item !== value),
        };
      } else {
        return { ...prev, [name]: [...currentValues, value] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepara los datos asegurando los campos obligatorios
      const formulaData = {
        fecha: formData.fecha,
        optometrista: formData.optometrista,
        tipoLente: formData.tipoLente,
        clienteId: formData.clienteId,
        opticaId: organization.id, // Asegúrate que organization esté definido

        // Campos de graduación
        od_sph: formData.od_sph,
        od_cyl: formData.od_cyl,
        od_axis: formData.od_axis,
        od_dp: formData.od_dp,
        od_add: formData.od_add,
        os_sph: formData.os_sph,
        os_cyl: formData.os_cyl,
        os_axis: formData.os_axis,
        os_dp: formData.os_dp,
        os_add: formData.os_add,
        add: formData.add,

        // Especificaciones de lentes
        material: formData.material,
        condiciones: Array.isArray(formData.condiciones)
          ? formData.condiciones
          : [formData.condiciones].filter(Boolean),
        observaciones: formData.observaciones,
      };
      if (formula?.id) {
        await dispatch(
          updateFormula({
            id: formula.id,
            data: formulaData,
          })
        );
      } else {
        await dispatch(createFormula(formulaData));
      }

      onSubmit(formulaData);
    } catch (error) {
      console.error("Error al guardar la fórmula:", error);
    }
  };

  const renderEyeInput = (eye) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-3 border border-border dark:border-slate-700 rounded-md bg-background dark:bg-slate-900/50">
      {["sph", "cyl", "axis", "add", "dp"].map((param) => (
        <div key={`${eye}_${param}`}>
          <Label
            htmlFor={`${eye}_${param}`}
            className="text-xs text-muted-foreground"
          >
            {param.toUpperCase()}
          </Label>
          <Input
            type={
              param === "axis" ||
              param === "add" ||
              param === "dp" ||
              param === "sph" ||
              param === "cyl"
                ? "number"
                : "text"
            }
            step={param === "axis" ? "1" : "0.25"}
            id={`${eye}_${param}`}
            name={`${eye}_${param}`}
            value={formData[`${eye}_${param}`] || ""}
            onChange={handleChange}
            className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary h-9"
          />
        </div>
      ))}
    </div>
  );

  const validateForm = () => {
    // Campos obligatorios
    const requiredFields = [
      "clienteId",
      "fecha",
      "optometrista",
      "tipoLente",
      "od_sph",
      "od_cyl",
      "os_sph",
      "os_cyl",
    ];

    // Verifica que todos los campos obligatorios tengan valor
    const allRequiredFieldsFilled = requiredFields.every(
      (field) => formData[field] !== "" && formData[field] !== undefined
    );

    // Validación adicional para valores numéricos
    const numericFieldsValid =
      (formData.od_axis === "" ||
        (formData.od_axis >= 0 && formData.od_axis <= 180)) &&
      (formData.os_axis === "" ||
        (formData.os_axis >= 0 && formData.os_axis <= 180)) &&
      (formData.od_dp === "" ||
        (formData.od_dp >= 0 && formData.od_dp <= 100)) &&
      (formData.os_dp === "" || (formData.os_dp >= 0 && formData.os_dp <= 100));

    return allRequiredFieldsFilled && numericFieldsValid;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl bg-card shadow-2xl dark:border-slate-700 max-h-[90vh] flex flex-col">
        <CardHeader className="border-b border-border dark:border-slate-700">
          <CardTitle className="text-primary">
            {formula?.id ? "Editar Fórmula Óptica" : "Nueva Fórmula Óptica"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Complete los detalles de la receta.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4 overflow-y-auto">
          <form id="formula-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="clienteId" className="text-foreground/90">
                    Cliente
                  </Label>
                  <Select
                    name="clienteId"
                    required
                    value={formData.clienteId}
                    onValueChange={(value) =>
                      handleSelectChange("clienteId", value)
                    }
                    disabled={!!preselectedClienteId} // Deshabilitado si ya viene preseleccionado
                  >
                    <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary">
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover text-popover-foreground border-border max-h-[300px] overflow-y-auto">
                      {cliente.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.nombre} {c.apellido} - {c.telefono}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="fecha" className="text-foreground/90">
                  Fecha
                </Label>
                <Input
                  type="date"
                  id="fecha"
                  name="fecha"
                  required
                  value={formData.fecha}
                  onChange={handleChange}
                  className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="optometrista" className="text-foreground/90">
                  Optometrista
                </Label>
                <Select
                  name="optometrista"
                  required
                  value={formData.optometrista}
                  onValueChange={(value) =>
                    handleSelectChange("optometrista", value)
                  }
                >
                  <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Seleccionar optometrista" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border">
                    {optometristas.map((o) => (
                      <SelectItem key={o.id} value={o.nombre}>
                        {o.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-foreground/90 block mb-1">
                Ojo Derecho (OD)
              </Label>
              {renderEyeInput("od")}
            </div>
            <div>
              <Label className="text-foreground/90 block mb-1">
                Ojo Izquierdo (OS)
              </Label>
              {renderEyeInput("os")}
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="add" className="text-foreground/90">
                  Adición (ADD)
                </Label>
                <Input
                  type="number"
                  step="0.25"
                  id="add"
                  name="add"
                  value={formData.add}
                  onChange={handleChange}
                  className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary"
                />
              </div>
            </div> */}
            <div>
              <Label className="text-foreground/90">Condiciones</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1 p-3 border border-border dark:border-slate-700 rounded-md bg-background dark:bg-slate-900/50">
                {opcionesCondiciones.map((t) => (
                  <Label
                    key={t}
                    htmlFor={`condicion-${t}`}
                    className="flex items-center space-x-2 text-sm text-muted-foreground cursor-pointer"
                  >
                    <Input
                      type="checkbox"
                      id={`condicion-${t}`}
                      value={t}
                      checked={formData.condiciones?.includes(t)}
                      onChange={() => handleMultiSelectChange("condiciones", t)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span>{t}</span>
                  </Label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipoLente" className="text-foreground/90">
                  Tipo de Lente {formula?.tipoLente}
                </Label>
                <Select
                  name="tipoLente"
                  value={formData.tipoLente}
                  onValueChange={(value) =>
                    handleSelectChange("tipoLente", value)
                  }
                >
                  <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Seleccionar tipo">
                      {formData.tipoLente}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border">
                    {tiposLente.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="material" className="text-foreground/90">
                  Material del Lente
                </Label>
                <Select
                  name="material"
                  value={formData.material}
                  onValueChange={(value) =>
                    handleSelectChange("material", value)
                  }
                >
                  <SelectTrigger className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Seleccionar material" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border-border">
                    {materialesLente.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="observaciones" className="text-foreground/90">
                Observaciones
              </Label>
              <Input
                as="textarea"
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                className="bg-background dark:bg-slate-800 border-input focus:border-primary focus:ring-primary min-h-[80px]"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4 border-t border-border dark:border-slate-700">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="text-muted-foreground hover:bg-accent"
          >
            <XCircle className="mr-2 h-4 w-4" /> Cancelar
          </Button>
          <Button
            type="submit"
            form="formula-form"
            disabled={!validateForm()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Save className="mr-2 h-4 w-4" />{" "}
            {formula?.id ? "Guardar Cambios" : "Crear Fórmula"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default FormulaForm;

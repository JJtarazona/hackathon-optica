import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit, Trash2, Search, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate, formatFormField } from "@/lib/constants";
import FormulaForm from "@/components/formulas/FormulaForm.jsx";
import PageHeader from "@/components/layout/PageHeader";
import TableLayout from "@/components/shared/TableLayout";
import EmptyState from "@/components/shared/EmptyState";
import { useOrganization } from "@clerk/clerk-react";
import { deleteFormula, getFormula } from "../Redux/action/formulaAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const FormulaRow = ({ formula, onEdit, onDelete, onView }) => {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="hover:bg-accent/50 dark:hover:bg-slate-800/50 transition-colors"
    >
      <td className="p-3 text-sm text-foreground/90 border-b border-border dark:border-slate-700 whitespace-nowrap">
        {formula.clienteNombre}
      </td>
      <td className="p-3 text-sm text-muted-foreground border-b border-border dark:border-slate-700 whitespace-nowrap">
        {formatDate(formula.fecha)}
      </td>
      <td className="p-3 text-sm text-muted-foreground border-b border-border dark:border-slate-700 whitespace-nowrap">
        {formula.optometrista}
      </td>
      <td className="p-3 text-sm text-muted-foreground border-b border-border dark:border-slate-700 whitespace-nowrap">
        {formatFormField(formula?.od_sph)}
      </td>
      <td className="p-3 text-sm text-muted-foreground border-b border-border dark:border-slate-700 whitespace-nowrap">
        {formatFormField(formula?.od_sph)}
      </td>
      <td className="p-3 text-sm text-muted-foreground border-b border-border dark:border-slate-700 whitespace-nowrap">
        {formula.tipoLente}
      </td>
      <td className="p-3 border-b border-border dark:border-slate-700 text-right whitespace-nowrap">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onView(formula)}
          className="text-primary hover:text-primary/80 mr-1 h-8 w-8"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(formula)}
          className="text-blue-500 hover:text-blue-600 mr-1 h-8 w-8"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(formula.id)}
          className="text-destructive hover:text-destructive/80 h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </motion.tr>
  );
};

const FormulasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentFormula, setCurrentFormula] = useState(null);

  const { organization } = useOrganization();
  const dispatch = useDispatch();
  const id = organization?.id;
  const formulaApi = useSelector((state) => state.formula.formula || []);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getFormula(id));
    }
  }, [id, dispatch]);

  const handleSubmit = useCallback(
    (formData) => {
      resetForm();
    },
    [currentFormula]
  );

  const resetForm = useCallback(() => {
    setIsFormOpen(false);
    setCurrentFormula(null);
    if (location.search.includes("clienteId")) {
      navigate("/formulas", { replace: true });
    }
  }, [navigate, location.search]);

  const openForm = useCallback((formula = null) => {
    setCurrentFormula(formula);
    setIsFormOpen(true);
  }, []);

  const handleViewDetails = useCallback(
    (formula) => {
      setCurrentFormula(formula);
      openForm(formula);
    },
    [openForm]
  );

  const handleDelete = (id) => {
    {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que deseas eliminar esta fórmula?"
      );
      if (confirmDelete) {
        dispatch(deleteFormula(id));
      }
    }
  };

  const filteredFormulas = Array.isArray(formulaApi)
    ? formulaApi.filter(
        (formula) =>
          formula.clienteNombre
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          formula.optometrista
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          formatDate(formula.fecha)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : [];

  const tableHeaders = [
    "Cliente",
    "Fecha",
    "Optometrista",
    "OD Esf",
    "OS Esf",
    "Tipo Lente",
    "Acciones",
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de Fórmulas Ópticas"
        actions={
          <>
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar fórmula..."
                className="pl-10 w-full md:w-64 bg-card border-border focus:border-primary focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={() => openForm()}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground whitespace-nowrap"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Nueva Fórmula
            </Button>
          </>
        }
      />

      <AnimatePresence>
        {isFormOpen && (
          <FormulaForm
            formula={currentFormula}
            clientes={[]}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            preselectedClienteId={null}
          />
        )}
      </AnimatePresence>

      <TableLayout headers={tableHeaders}>
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map((formula) => (
            <FormulaRow
              key={formula.id}
              formula={formula}
              onEdit={() => openForm(formula)}
              onDelete={handleDelete}
              onView={handleViewDetails}
            />
          ))
        ) : (
          <tr>
            <td
              colSpan={tableHeaders.length}
              className="p-6 text-center text-muted-foreground border-b border-border dark:border-slate-700"
            >
              <EmptyState
                icon={Search}
                title="No se encontraron fórmulas"
                description={
                  searchTerm
                    ? "Intente modificar la búsqueda."
                    : "Agregue una nueva fórmula para comenzar."
                }
              />
            </td>
          </tr>
        )}
      </TableLayout>
    </div>
  );
};

export default FormulasPage;

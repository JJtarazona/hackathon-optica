import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OrganizationProfile,
  OrganizationSwitcher,
  useOrganization,
  useUser,
} from "@clerk/clerk-react";
import { getOptica, validarOptica } from "@/Redux/action/opticaAction";
import { Button } from "@/components/ui/button";
import { createOptica } from "../Redux/action/opticaAction";

function OrganizacionPage() {
  const { organization } = useOrganization();
  const { user } = useUser(); // obtenemos user.id
  const dispatch = useDispatch();
  const optica = useSelector((state) => state.optica.optica);
  const validaOptica = useSelector((state) => state.optica.validaOptica);

  const opticaCreada = validaOptica.id;

  console.log("Optica:", validaOptica.id);

  useEffect(() => {
    dispatch(getOptica());
  }, [dispatch]);

  useEffect(() => {
    if (organization?.id) {
      dispatch(validarOptica(organization.id));
    }
  }, [dispatch, organization?.id]);

  const handleSubmit = async () => {
    try {
      const body = {
        id: organization.id,
        nombre: organization.name,
        userId: user.id,
      };
      dispatch(createOptica(body));
      dispatch(getOptica());
      dispatch(validarOptica(organization.id));
    } catch (err) {
      console.error(
        "Error al crear óptica:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div>
      {organization ? (
        <div>
          {opticaCreada ? (
            <div>
              <h1>Bienvenido a la organización</h1>
              <p>Nombre de la organización: {organization.name}</p>
              <p>ID de la organización: {organization.id}</p>
              <OrganizationProfile />
            </div>
          ) : (
            <div>
              <h1>Guarda los datos de tu Óptica</h1>
              <Button onClick={handleSubmit}>
                Confirmar la creación de {organization.name}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/app/dashboard"
          afterSelectOrganizationUrl="/app/dashboard"
        />
      )}
    </div>
  );
}

export default OrganizacionPage;

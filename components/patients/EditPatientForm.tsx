"use client";
import { Box, Button } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { updatePatient } from "../../actions/update-patient-action";

export default function EditPatientForm({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const updatePatientWithId = updatePatient.bind(null, +id);
  const [state, dispatch] = useActionState(updatePatientWithId, {
    errors: [],
    success: "",
  });

  const notifications = useNotifications();

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        notifications.show(error, {
          autoHideDuration: 3000,
          severity: "error",
        });
      });
    }
    if (state.success) {
      notifications.show(state.success, {
        autoHideDuration: 3000,
        severity: "success",
      });

      router.push("/patients");
    }
  }, [state, notifications, router]);

  return (
    <PageContainer title="Editar Paciente">
      <form action={dispatch} id="nuevo-paciente__form">
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit" sx={{ mb: 2 }}>
            Guardar Paciente
          </Button>
        </Box>
        {children}
      </form>
    </PageContainer>
  );
}

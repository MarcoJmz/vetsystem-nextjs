"use client";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { addPatient } from "../../actions/add-patient-action";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useRouter } from 'next/navigation';

export default function AddPatientForm({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, dispatch] = useActionState(addPatient, {
    errors: [],
    success: "",
  });

  const router = useRouter();

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

      router.push('/patients');
    }
  }, [state, notifications, router]);

  return (
    <form action={dispatch} id="nuevo-paciente__form">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" type="submit" sx={{ mb: 2 }}>
          Guardar Paciente
        </Button>
      </Box>
      {children}
    </form>
  );
}

"use client";
import { Box, Button } from "@mui/material";
import React, { useActionState, useEffect } from "react";
import { addOwner } from "../../actions/add-owner-action";
import { useNotifications } from "@toolpad/core";
import { useRouter } from 'next/navigation';

export default function AddOwnerForm({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, dispatch] = useActionState(addOwner, {
    errors: [],
    success: "",
  });

  const notifications = useNotifications();

  const router = useRouter();

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

      router.back()
    }
  }, [state, notifications, router]);

  return (
    <form action={dispatch}>
      {children}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" type="submit">
          Guardar Dueño/a
        </Button>
      </Box>
    </form>
  );
}

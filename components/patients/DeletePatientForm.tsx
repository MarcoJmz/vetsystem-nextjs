"use client";
import { useParams, useRouter } from "next/navigation";
import { handleDelete } from "../../actions/delete-patient-action";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Patient } from "../../src/schemas";
import { useActionState, useEffect, useRef, useState } from "react";
import { useNotifications } from "@toolpad/core";
import { useGridApiRef } from "@mui/x-data-grid";

export default function DeletePatientForm({
  patientId,
  apiRef,
}: {
  patientId: Patient["id"];
  apiRef: any;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const deleteForm = useRef(null);

  const deletePatient = handleDelete.bind(null, +patientId);
  const [state, dispatch] = useActionState(deletePatient, {
    errors: [],
    success: "",
  });

  const notifications = useNotifications();

  const handleClose = () => {
    setOpen(false);
  };

  const submitDelete = () => {
    if (deleteForm.current) {
      console.log(deleteForm.current);
      // @ts-ignore
      deleteForm.current.requestSubmit();
    }
    handleClose();
  };

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

      apiRef.current?.dataSource.cache.clear();
      apiRef.current?.dataSource.fetchRows();
    }
  }, [state, notifications, router, apiRef]);

  return (
    <>
      <form ref={deleteForm} action={dispatch}>
        <IconButton
          onClick={() => setOpen(true)}
          aria-label="delete"
          size="small"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar Paciente"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar este paciente? Esta acción no
            se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => submitDelete()} autoFocus>
            Eliminar Paciente
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

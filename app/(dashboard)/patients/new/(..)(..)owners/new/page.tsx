"use client";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddOwnerForm from "../../../../../../components/owners/AddOwnerForm";
import OwnerForm from "../../../../../../components/owners/OwnerForm";

export default function NewOwnerModal() {
  return (
    <Dialog open={true} onClose={() => {}}>
      <DialogTitle>Nuevo Dueño/a</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }} />
        <AddOwnerForm>
          <OwnerForm />
        </AddOwnerForm>
      </DialogContent>
    </Dialog>
  );
}

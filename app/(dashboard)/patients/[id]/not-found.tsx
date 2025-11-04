"use client";
import { Typography } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageContainer title="Paciente No Encontrado">
      <Typography variant="body1">
        Lo sentimos, no pudimos encontrar el paciente que estabas buscando. Por
        favor, verifica el ID del paciente o <Link href={'/patients'}>regresa a la lista de pacientes.</Link>
      </Typography>
    </PageContainer>
  );
}

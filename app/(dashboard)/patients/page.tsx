"use client";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Box, Button, IconButton, useColorScheme } from "@mui/material";
import { DataGrid, GridRenderCellParams, GridRowsProp, useGridApiRef } from "@mui/x-data-grid";
import { patientsDataSource } from "../../../data/patients";
import { GridGetRowsError } from "@mui/x-data-grid";
import { GridUpdateRowError } from "@mui/x-data-grid";
import Link from "next/link";
import { Edit } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import NoSsr from "@mui/material/NoSsr";
import DeletePatientForm from "../../../components/patients/DeletePatientForm";

export default function PatientsPage() {
  const apiRef = useGridApiRef();
  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", editable: false, flex: 1 },
    { field: "species", headerName: "Especie", editable: false },
    {
      field: "owner",
      headerName: "Dueño/a",
      renderCell(params) {
        return `${params.row.owner.name} ${params.row.owner.lastName}`;
      },
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Editar",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Link href={`/patients/${params.row.id}/edit`}>
            <IconButton aria-label="edit" size="small">
              <Edit fontSize="inherit" />
            </IconButton>
          </Link>
        );
      },
    },
    {
      field: "delete",
      headerName: "Eliminar",
      renderCell: (params: GridRenderCellParams) => {
        const patientId = params.row.id;
        return (
          <DeletePatientForm patientId={patientId} apiRef={apiRef} />
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          component={Link}
          href="/patients/new"
          sx={{ mb: 2 }}
        >
          Nuevo Paciente
        </Button>
      </Box>
      <NoSsr>
        <DataGrid
          columns={columns}
          dataSource={patientsDataSource}
          pagination
          apiRef={apiRef}
          onDataSourceError={(error) => {
            if (error instanceof GridGetRowsError) {
              // `error.params` is of type `GridGetRowsParams`
              // fetch related logic, e.g set an overlay state
              console.error("Error fetching rows:", error);
            }
            if (error instanceof GridUpdateRowError) {
              // `error.params` is of type `GridUpdateRowParams`
              // update related logic, e.g set a snackbar state
              console.error("Error updating row:", error);
            }
          }}
        />
      </NoSsr>
    </PageContainer>
  );
}

"use client";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { OwnersResponseSchema } from "../../src/schemas";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Patient } from "../../src/schemas";
import { speciesList } from "../../data/lists";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es-mx";
import Link from "next/link";

type Owner = z.infer<typeof OwnersResponseSchema>[number];

async function fetchOwners() {
  const res = await fetch(`http://localhost:3000/owners`);
  const data = await res.json();

  const owners = OwnersResponseSchema.parse(data); // Assume data is already in the correct format
  return owners;
}

export default function PatientForm({ patient }: { patient?: Patient }) {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [ownerId, setOwnerId] = useState<number>(0);
  const [species, setSpecies] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    fetchOwners().then((data) => {
      setOwners(data);
    });

    if (patient) {
      setOwnerId(patient.owner.id);
      setOwner(patient.owner);
      setSpecies(patient.species);
      setBreed(patient.breed);
      setBirthDate(dayjs(patient.birthDate, "DD/MM/YYYY"));
    }
  }, []);

  const handleOwnerChange = (event: any, value: Owner | null) => {
    setOwner(value);
    setOwnerId(value ? value.id : 0);
  };

  return (
    <Grid container spacing={4} sx={{ marginBottom: 4 }}>
      <Grid size={12}>
        <TextField
          id="name"
          label="Nombre"
          name="name"
          autoFocus
          sx={{ width: "100%" }}
          defaultValue={patient?.name}
        />
      </Grid>
      <Grid size={6}>
        <Autocomplete
          id="species"
          freeSolo
          value={species}
          options={speciesList}
          renderInput={(params) => (
            <TextField {...params} label="Especie" name="species" />
          )}
        />
      </Grid>
      <Grid size={6}>
        <Autocomplete
          id="raza"
          freeSolo
          value={breed}
          options={[]}
          renderInput={(params) => (
            <TextField {...params} label="Raza" name="breed" />
          )}
        />
      </Grid>
      <Grid size={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
          <DatePicker
            sx={{ with: "100%", display: "flex" }}
            name="birthDay"
            value={birthDate}
            label="Fecha de Nacimiento"
            onChange={(e) => setBirthDate(e)}
          ></DatePicker>
        </LocalizationProvider>
      </Grid>
      <Grid size={8}>
        <Typography variant="h6" gutterBottom>
          Información del Dueño
        </Typography>
      </Grid>
      <Grid size={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          component={Link}
          href="/owners/new"
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ mt: 1 }}
        >
          Agregar Dueño
        </Button>
      </Grid>
      <Grid size={12}>
        <input value={ownerId} type="hidden" name="ownerId" />
        <Autocomplete
          id="ownerId"
          value={owner}
          options={owners}
          isOptionEqualToValue={(option, value) =>
            value === undefined ||
            option?.id?.toString() === (value?.id ?? value)?.toString()
          }
          getOptionLabel={(option) => `${option?.name} ${option.lastName}` || ""}
          onChange={(e, value) => handleOwnerChange(e, value)}
          renderInput={(params) => <TextField {...params} label="Dueño" />}
        />
      </Grid>
    </Grid>
  );
}

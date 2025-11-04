"use client";
import { GridDataSource } from "@mui/x-data-grid";
import { PatientsResponseSchema } from "../src/schemas";
import { GridGetRowsParams } from "@mui/x-data-grid";

const API_URL = `http://localhost:3000/patients`;

export const patientsDataSource: GridDataSource = {
  getRows: async () => {
    const url = `http://localhost:3000/patients`;
    const req = await fetch(url);
    const json = await req.json();

    const data = PatientsResponseSchema.parse(json);

    return {
      rows: data.patients,
      rowCount: data.total,
    };
  },
};

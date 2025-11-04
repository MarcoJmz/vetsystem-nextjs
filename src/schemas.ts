import { z } from "zod";

const OwnerSchema = z.object({
  id: z.number(),
  name: z.string(),
  lastName: z.string(),
  phoneNumber: z.string().nullable(),
  email: z.string().nullable(),
});

export const OwnerFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }),
  phoneNumber: z.string().min(1, { message: "El teléfono es obligatorio" }),
  email: z.string().email({ message: "El email debe tener un formato válido" }).optional(),
});

export const OwnersResponseSchema = z.array(OwnerSchema);

export const PatientSchema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: "Name is required" })
    .nonempty("Name is required"),
  birthDate: z.string().nullable(),
  species: z
    .string({ required_error: "Species is required" })
    .nonempty("Species is required"),
  breed: z
    .string({ required_error: "Breed is required" })
    .nonempty("Breed is required"),
  owner: OwnerSchema,
});

export type Patient = z.infer<typeof PatientSchema>;

export const PatientsResponseSchema = z.object({
  patients: z.array(PatientSchema),
  total: z.number(),
});

export const PatientFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  birthDate: z
    .string()
    .min(1, { message: "Proporciona una fecha de nacimiento" }),
  species: z.string().min(1, { message: "La especie es obligatoria" }),
  breed: z.string().min(1, { message: "La raza es obligatoria" }),
  ownerId: z.number().min(1, { message: "El dueño es obligatorio" }),
});
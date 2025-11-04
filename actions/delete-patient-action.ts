import { Patient } from "../src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function handleDelete(
  patientId: Patient["id"],
  prevState: ActionStateType,
  formData: FormData
) {
  const url = `http://localhost:3000/patients/${patientId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      errors: [data.message || "Error deleting patient"],
      success: "",
    };
  }

  return {
    errors: [],
    success: data.message || "Paciente eliminado correctamente",
  };
}

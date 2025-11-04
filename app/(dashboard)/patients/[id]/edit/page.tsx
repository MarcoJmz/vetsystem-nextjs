import { notFound  } from "next/navigation";
import { PatientSchema } from "../../../../../src/schemas";
import EditPatientForm from "../../../../../components/patients/EditPatientForm";
import PatientForm from "../../../../../components/patients/PatientForm";

type Params = Promise<{ id: string }>;

async function getPatient(id: string) {
  const res = await fetch(`http://localhost:3000/patients/${id}`);
  const data = await res.json();

  if (!res.ok) {
    console.log(res);
    notFound();
  }
  const patient = PatientSchema.parse(data);
  return patient;
}

export default async function EditPatientPage({params} : {params: Params}) {
  const { id } = await params;
  const patient = await getPatient(id);

  return (
    <EditPatientForm>
      <PatientForm patient={patient} />
    </EditPatientForm>
  );
}

import { PageContainer } from "@toolpad/core/PageContainer";
import AddPatientForm from "../../../../components/patients/AddPatientForm";
import PatientForm from "../../../../components/patients/PatientForm";

export default function NewPatientPage() {

  return (
    <PageContainer title="Nuevo Paciente">
      <AddPatientForm>
        <PatientForm />
      </AddPatientForm>
    </PageContainer>
  );
}

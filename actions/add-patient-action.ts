"use server"

import { PatientFormSchema } from "../src/schemas";

type ActionStateType ={
    errors: string[];
    success: string;
}

export async function addPatient(prevState: ActionStateType, formData: FormData) {
    const patient = PatientFormSchema.safeParse({
        name: formData.get("name"),
        birthDate: formData.get("birthDay"),
        species: formData.get("species"),
        breed: formData.get("breed"),
        ownerId: Number(formData.get("ownerId")),
    })

    if (!patient.success) {
        const errors = patient.error.errors.map((err) => err.message);
        
        return {
            errors,
            success: "",
        }
    }

    const url = `http://localhost:3000/patients`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient.data),
    });
    
    const data = await response.json();

    if (!response.ok) {
        console.error("Error adding patient:", data);
        return {
            errors: [data.message || "Error adding patient"],
            success: "",
        }
    }

    return {
        errors: [],
        success: "Paciente Agregado Exitosamente",
    }
}
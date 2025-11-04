"use server"

import { LastPage } from "@mui/icons-material";
import { OwnerFormSchema } from "../src/schemas";

type ActionStateType ={
    errors: string[];
    success: string;
}

export async function addOwner(prevState: ActionStateType, formData: FormData) {
    const owner = OwnerFormSchema.safeParse({
        name: formData.get("name"),
        lastName: formData.get("lastName"),
        phoneNumber: formData.get("phoneNumber"),
        email: formData.get("email"),
    })

    if (!owner.success) {
        const errors = owner.error.errors.map((err) => err.message);
        
        return {
            errors,
            success: "",
        }
    }

    const url = `http://localhost:3000/owners`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(owner.data),
    });
    
    const data = await response.json();

    if (!response.ok) {
        return {
            errors: [data.message || "Error adding owner"],
            success: "",
        }
    }

    return {
        errors: [],
        success: "Dueño/a Agregado Exitosamente",
    }
}
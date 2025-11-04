import { TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";

export default function OwnerForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (newPhone: string) => {
    setPhoneNumber(newPhone);
  };
  return (
    <>
      <TextField
        id="name"
        label="Nombre(s)"
        name="name"
        autoFocus
        sx={{ width: "100%" }}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <TextField
        id="lastName"
        label="Apellido(s)"
        name="lastName"
        sx={{ width: "100%", mt: 2 }}
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <MuiTelInput
        id="phone"
        label="Teléfono"
        name="phoneNumber"
        sx={{ width: "100%", mt: 2 }}
        defaultCountry="MX"
        value={phoneNumber}
        onChange={handleChange}
      />
      <TextField
        id="email"
        label="Email"
        name="email"
        sx={{ width: "100%", mt: 2 }}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </>
  );
}

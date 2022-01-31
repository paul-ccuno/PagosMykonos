import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, TextField } from "@mui/material";
import { textFieldStyles } from "components/General/TextField";
import { pagosFields, StepOne } from "models/Pagos.model";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const options = [
  { label: "option 1", value: 1 },
  { label: "option 2", value: 2 },
];

const FormStepOne = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(StepOne) });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const handleSubmitStepOneForm = (values) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitStepOneForm)}>
      <Autocomplete
        {...register(pagosFields.cliente)}
        options={options}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Cliente" />
        )}
      />
      <Autocomplete
        {...register(pagosFields.proyecto)}
        options={options}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Cliente" />
        )}
      />
      <Autocomplete
        {...register(pagosFields.lote)}
        options={options}
        renderInput={(params) => (
          <TextField {...params} {...textFieldStyles} label="Cliente" />
        )}
      />
      <TextField {...register(pagosFields.precio)} />
      <button type="submit">enviar</button>
    </form>
  );
};

export default FormStepOne;

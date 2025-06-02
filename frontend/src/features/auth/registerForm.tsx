import { useForm } from "react-hook-form";
import Input from "../../components/shared/Input/Input";
import type { RegisterFormValues } from "./authTypes";
import FormWrapper from "../../components/shared/formWrapper/formWrapper";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  return (
    <FormWrapper
      title="Login"
      description="Registre-se aqui"
      onSubmit={handleSubmit((data) => console.log(data))}
      buttonLabel="Registrar"
    >
      <Input
        label="Nome"
        type="text"
        placeholder="Seu Primeiro Nome"
        register={register("firstname", {
          required: "Nome é obrigatório",
        })}
        error={errors.firstname?.message}
      />
      <Input
        label="Sobrenome"
        type="text"
        placeholder="Seu Sobrenome"
        register={register("lastname", {
          required: "Nome é obrigatório",
        })}
        error={errors.lastname?.message}
      />

      <Input
        label="Email"
        type="email"
        placeholder="seu@email.com"
        register={register("email", {
          required: "Email é obrigatório",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de e-mail inválido",
          },
        })}
        error={errors.email?.message}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        register={register("password", {
          required: "Senha é obrigatória",
          minLength: {
            value: 6,
            message: "Mínimo de 6 caracteres",
          },
        })}
        error={errors.password?.message}
      />
    </FormWrapper>
  );
}

import { useForm } from "react-hook-form";
import type { LoginFormsValues } from "./authTypes";
import Input from "../../components/shared/Input/Input";
import FormWrapper from "../../components/shared/formWrapper/formWrapper";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsValues>();

  return (
    <FormWrapper
      title="Login"
      description="Realize Login na sua conta aqui"
      onSubmit={handleSubmit((data) => console.log(data))}
      buttonLabel="Acessar"
    >
      <Input
        label="Email"
        type="email"
        placeholder="seu@email.com"
        register={register("email", {
          required: "Email é obrigatório",
        })}
        error={errors.email?.message}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="••••••"
        register={register("password", {
          required: "Senha obrigatória",
        })}
        error={errors.password?.message}
      />
    </FormWrapper>
  );
}

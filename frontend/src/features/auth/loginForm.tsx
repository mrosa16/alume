import { useForm } from "react-hook-form";
import type { LoginFormsValues } from "./authTypes";
import Input from "../../components/shared/Input/Input";
import FormWrapper from "../../components/shared/formWrapper/formWrapper";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsValues>();

  const { login } = useAuth();

  return (
    <FormWrapper
      title="Login"
      description="Realize Login na sua conta aqui"
      onSubmit={handleSubmit(async (data) => {
        try {
          await login(data.email, data.senha);
        } catch (error) {
          console.error("Erro ao logar", error);
        }
      })}
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
        register={register("senha", {
          required: "Senha obrigatória",
        })}
        error={errors.senha?.message}
      />
    </FormWrapper>
  );
}

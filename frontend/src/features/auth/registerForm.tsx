import { useForm } from "react-hook-form";
import Input from "../../components/shared/Input/Input";
import type { RegisterFormValues } from "./authTypes";
import FormWrapper from "../../components/shared/formWrapper/formWrapper";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const { register: registerUser } = useAuth();

  return (
    <FormWrapper
      title="Registro"
      description="Registre-se aqui"
      onSubmit={handleSubmit(async (data) => {
        try {
          await registerUser(data.nome, data.sobrenome, data.email, data.senha);
        } catch (err) {
          console.error("Erro no cadastro:", err);
        }
      })}
      buttonLabel="Registrar"
    >
      <Input
        label="Nome"
        type="text"
        placeholder="Seu Primeiro Nome"
        register={register("nome", {
          required: "Nome é obrigatório",
        })}
        error={errors.nome?.message}
      />
      <Input
        label="Sobrenome"
        type="text"
        placeholder="Seu Sobrenome"
        register={register("sobrenome", {
          required: "Nome é obrigatório",
        })}
        error={errors.sobrenome?.message}
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
        register={register("senha", {
          required: "Senha é obrigatória",
          minLength: {
            value: 6,
            message: "Mínimo de 6 caracteres",
          },
        })}
        error={errors.senha?.message}
      />
    </FormWrapper>
  );
}

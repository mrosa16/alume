import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import FormWrapper from "../../components/shared/formWrapper/formWrapper";
import Input from "../../components/shared/Input/Input";
import type { EditFormValues } from "./profileTypes";
import { useState } from "react";
import { api } from "../../services/api";

export default function ProfileForm() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormValues>({
    defaultValues: {
      nome: user?.nome,
      sobrenome: user?.sobrenome,
      email: user?.email,
    },
  });

  const onSubmit = async (data: EditFormValues) => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const response = await api.put("/student", data);
      if (response.status === 200) {
        window.location.replace("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao salvar simulação:", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <FormWrapper
      title="Perfil do Estudante"
      description={
        isEditing
          ? "Edite seus dados e clique em salvar"
          : "Visualização dos dados cadastrais"
      }
      onSubmit={handleSubmit(onSubmit)}
      buttonLabel={isEditing ? "Salvar Alterações" : "Editar Perfil"}
    >
      <Input
        label="Nome"
        type="text"
        register={register("nome", { required: "Nome obrigatório" })}
        error={errors.nome?.message}
        readOnly={!isEditing}
      />
      <Input
        label="Sobrenome"
        type="text"
        register={register("sobrenome", {
          required: "Sobrenome obrigatório",
        })}
        error={errors.sobrenome?.message}
        readOnly={!isEditing}
      />
      <Input
        label="Email"
        type="email"
        register={register("email", {
          required: "Email obrigatório",
        })}
        error={errors.email?.message}
        readOnly={!isEditing}
      />

      {isEditing ? (
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="w-full mt-2 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
      ) : null}
    </FormWrapper>
  );
}

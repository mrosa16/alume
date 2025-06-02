// src/components/simulation/SimulationForm.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";

import { api } from "../../services/api";
import type { SimulationFormValues } from "./simulationTypes";
import FormWrapper from "../../components/shared/formWrapper/formWrapper";
import Input from "../../components/shared/Input/Input";

export default function SimulationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SimulationFormValues>();

  const [loading, setLoading] = useState(false);

  const valor_total = watch("valor_total") || 0;
  const parcelas = watch("quantidade_parcelas") || 1;
  const taxaJuros = watch("juros_ao_mes") || 0;

  const calcularParcela = () => {
    const i = taxaJuros / 100;
    const parcela =
      (valor_total * (i * Math.pow(1 + i, parcelas))) /
      (Math.pow(1 + i, parcelas) - 1);
    return parcela.toFixed(2);
  };

  const onSubmit = async (data: SimulationFormValues) => {
    try {
      setLoading(true);
      const response = await api.post("/me", data);
      if (response.status === 201) {
        window.location.replace("/simulationhistory");
      }
    } catch (error) {
      console.error("Erro ao salvar simulação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper
      title="Nova Simulação"
      description="Preencha os dados para calcular sua parcela mensal."
      onSubmit={handleSubmit(onSubmit)}
      buttonLabel={loading ? "Salvando..." : "Salvar Simulação"}
    >
      <Input
        label="Valor Total"
        type="number"
        min="0"
        placeholder="Ex: 20000"
        register={register("valor_total", {
          required: "Valor total é obrigatorio",
          valueAsNumber: true,
        })}
        error={errors.valor_total?.message}
      />

      <Input
        label="Quantidade de parcelas"
        type="number"
        min="0"
        placeholder="Ex: 24"
        register={register("quantidade_parcelas", {
          required: "Quantidade de parcelas é obrigatorio",
          valueAsNumber: true,
        })}
        error={errors.quantidade_parcelas?.message}
      />

      <Input
        label="Taxa de Juros (%)"
        type="number"
        step="0.01"
        placeholder="Ex: 2.5"
        register={register("juros_ao_mes", {
          required: "Taxa de juros é Obrigatório",
          valueAsNumber: true,
        })}
        error={errors.juros_ao_mes?.message}
      />

      <div className="text-sm text-gray-700">
        <strong>Estimativa de Valor da Parcela:</strong>{" "}
        {valor_total > 0 && parcelas > 0 && taxaJuros > 0
          ? `R$ ${calcularParcela()}`
          : "Preencha os campos corretamente"}
      </div>
    </FormWrapper>
  );
}

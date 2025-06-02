// src/components/simulation/SimulationTable.tsx
import { useEffect, useState } from "react";

import type { Simulation, TableProps } from "./tabletypes";
import { api } from "../../../services/api";

export default function SimulationTable({ limit }: TableProps) {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [filteredSimulations, setFilteredSimulations] = useState<Simulation[]>(
    []
  );
  const [parcelasFiltro, setParcelasFiltro] = useState("");
  const [valorMinFiltro, setValorMinFiltro] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");

  useEffect(() => {
    async function fetchSimulations() {
      try {
        const response = await api.get("/me");
        setSimulations(response.data);
        setFilteredSimulations(response.data);
      } catch (error) {
        console.error("Erro ao buscar simulações", error);
      }
    }

    fetchSimulations();
  }, []);

  const filtrar = () => {
    let filtrado = simulations;

    if (parcelasFiltro) {
      filtrado = filtrado.filter(
        (sim) => sim.quantidade_parcelas === parseInt(parcelasFiltro)
      );
    }

    if (valorMinFiltro) {
      filtrado = filtrado.filter(
        (sim) => sim.valor_total >= parseFloat(valorMinFiltro)
      );
    }

    if (dataFiltro) {
      filtrado = filtrado.filter((sim) => {
        return sim.data_criacao.slice(0, 10) === dataFiltro;
      });
    }

    setFilteredSimulations(filtrado);
  };

  const simToShow = limit
    ? filteredSimulations.slice(0, limit)
    : filteredSimulations;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <input
          type="number"
          min="0"
          placeholder="Parcelas"
          value={parcelasFiltro}
          onChange={(e) => setParcelasFiltro(e.target.value)}
          className="border rounded-md px-3 py-1 text-sm"
        />
        <input
          type="number"
          min="0"
          placeholder="Valor mínimo (R$)"
          value={valorMinFiltro}
          onChange={(e) => setValorMinFiltro(e.target.value)}
          className="border rounded-md px-3 py-1 text-sm"
        />
        <input
          type="date"
          placeholder="Data"
          value={dataFiltro}
          onChange={(e) => setDataFiltro(e.target.value)}
          className="border rounded-md px-3 py-1 text-sm"
        />
        <button
          onClick={filtrar}
          className="bg-teal text-white px-4 py-1 rounded-md text-sm"
        >
          Filtrar
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Valor Total</th>
              <th className="px-4 py-2">Parcelas</th>
              <th className="px-4 py-2">Juros (%)</th>
              <th className="px-4 py-2">Parcela</th>
            </tr>
          </thead>
          <tbody>
            {simToShow.map((sim) => (
              <tr key={sim.id} className="border-t">
                <td className="px-4 py-2">
                  {new Date(sim.data_criacao).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-2">
                  {sim.valor_total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="px-4 py-2">{sim.quantidade_parcelas}</td>
                <td className="px-4 py-2">{sim.juros_ao_mes}%</td>
                <td className="px-4 py-2">
                  {sim.valor_parcela_mensal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

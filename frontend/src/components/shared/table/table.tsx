// src/components/simulation/SimulationTable.tsx
import { useEffect, useState } from "react";
import type { Simulation, TableProps } from "./tabletypes";
import { api } from "../../../services/api";

export default function SimulationTable({ limit }: TableProps) {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [filteredSimulations, setFilteredSimulations] = useState<Simulation[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      filtrado = filtrado.filter(
        (sim) => sim.data_criacao.slice(0, 10) === dataFiltro
      );
    }

    setFilteredSimulations(filtrado);
    setCurrentPage(1);
  };

  const paginatedSimulations = !limit
    ? filteredSimulations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredSimulations.slice(0, limit);

  const totalPages = Math.ceil(filteredSimulations.length / itemsPerPage);

  return (
    <div className="space-y-4">
      {!limit && (
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
      )}

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
            {paginatedSimulations.map((sim) => (
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

      {!limit && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-4 py-2 font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import SimulationTable from "../../components/shared/table/table";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import type { Simulation } from "../../components/shared/table/tabletypes";
import { api } from "../../services/api";
import { CiCirclePlus } from "react-icons/ci";
import SimulationChart from "../../components/shared/simulation/simulationChart";
import { FaRegUserCircle } from "react-icons/fa";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const navigate = useNavigate();
  const total = simulations.length;

  const media =
    simulations.reduce((acc, sim) => acc + sim.valor_parcela_mensal, 0) / total;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/me");
        setSimulations(response.data);
      } catch (error) {
        console.error("Erro ao carregar simulações", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-end-safe items-center gap-2 mb-4">
        <h1 className="text-2xl font-semibold">
          Olá, {user?.nome} {user?.sobrenome}! Bem-vindo(a) 👋
        </h1>
        <button
          onClick={() => navigate("/profile")}
          className="bg-teal hover:bg-highlight text-white py-2 px-4 rounded-full transition w-full sm:w-auto"
        >
          <div className="flex items-center justify-center gap-2">
            <FaRegUserCircle size={24} className="text-white" />
            <p className="text-white text-sm sm:text-base">Meu Perfil</p>
          </div>
        </button>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition"
        >
          Sair
        </button>
      </div>
      <button
        onClick={() => navigate("/simulation")}
        className="bg-teal hover:bg-highlight text-white py-2 px-4 rounded-full transition mt-9"
      >
        <div className="flex gap-2 ">
          <CiCirclePlus size={32} className="font-bold text-white" />
          <p className="text-white text-center mt-1">Criar nova Simulação</p>
        </div>
      </button>
      <h1 className="text-2xl font-semibold mb-4">Resumo das Simulações</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-gray-500 text-sm">Total de Simulações</h2>
          <p className="text-xl font-bold text-teal">{total}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-gray-500 text-sm">Valor Médio das Parcelas</h2>
          <p className="text-xl font-bold text-teal">
            {media > 0
              ? media.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "R$ 0,00"}
          </p>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">
          Confira aqui suas últimas simulações
        </h1>
        <SimulationChart />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">
          Confira aqui suas últimas simulações
        </h1>

        <SimulationTable limit={5} />

        {simulations.length > 5 && (
          <div className="text-right mt-2">
            <button
              onClick={() => navigate("/simulationhistory")}
              className="text-sm text-blue-600 hover:underline"
            >
              Ver mais →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

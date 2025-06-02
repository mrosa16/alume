import { useNavigate } from "react-router-dom";
import SimulationTable from "../../components/shared/table/table";
import { useAuth } from "../../hooks/useAuth";

function SimulationHistoryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold"></h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition"
        >
          Voltar
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        Histórico de simulações de {user?.nome} {user?.sobrenome}
      </h1>

      <SimulationTable />
    </div>
  );
}

export default SimulationHistoryPage;

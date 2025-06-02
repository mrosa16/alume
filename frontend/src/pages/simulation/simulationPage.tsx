import { useNavigate } from "react-router-dom";
import SimulationForm from "../../features/simulation/simulationForm";

function NewSimulationPage() {
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
        Nova Simulação de Financiamento
      </h1>
      <SimulationForm />
    </div>
  );
}
export default NewSimulationPage;

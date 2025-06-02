import { useAuth } from "../../hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          Olá, {user?.nome}! Bem-vindo(a) 👋
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition"
        >
          Sair
        </button>
      </div>
      <h1 className="text-2xl font-semibold mb-4">Resumo das Simulações</h1>

      {/* Cards resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-gray-500 text-sm">Total de Simulações</h2>
          <p className="text-xl font-bold text-teal">25</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-gray-500 text-sm">Valor Médio das Parcelas</h2>
          <p className="text-xl font-bold text-teal">R$ 4.000,00</p>
        </div>
      </div>
    </div>
  );
}

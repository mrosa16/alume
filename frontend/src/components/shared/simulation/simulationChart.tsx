import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { Simulation } from "../table/tabletypes";
import { api } from "../../../services/api";
import type { ApexOptions } from "apexcharts";

export default function SimulationChart() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/me");
      setSimulations(response.data);
    }
    fetchData();
  }, []);

  const data = simulations
    .sort(
      (a, b) =>
        new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime()
    )
    .map((sim) => ({
      x: new Date(sim.data_criacao).toLocaleDateString("pt-BR"),
      y: sim.valor_parcela_mensal,
    }));

  const chartOptions: ApexOptions = {
    chart: {
      id: "simulation-bar-chart",
      toolbar: { show: false },
    },
    xaxis: {
      type: "category",
      title: { text: "Data" },
    },
    yaxis: {
      title: { text: "Valor da Parcela (R$)" },
      labels: {
        formatter: (value: number) =>
          value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) =>
          value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
      },
    },
    colors: ["#007681"],
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <Chart
        options={chartOptions}
        series={[{ name: "Parcela", data }]}
        type="bar"
        height={300}
      />
    </div>
  );
}

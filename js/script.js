// Toggle Tema Claro/Escuro
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    toggleBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";

    atualizarTemaGrafico();
});

// -------------------- Gráfico --------------------
const ctx = document.getElementById('graficoFII').getContext('2d');
const grafico = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Preço do FII (R$)',
      data: [],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      borderWidth: 2,
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: body.classList.contains("dark") ? "#fff" : "#000"
        }
      }
    },
    scales: {
      x: { 
        title: { display: true, text: 'Tempo', color: body.classList.contains("dark") ? "#fff" : "#000" },
        ticks: { color: body.classList.contains("dark") ? "#fff" : "#000" },
        grid: { color: body.classList.contains("dark") ? "#444" : "#ccc" }
      },
      y: { 
        title: { display: true, text: 'Preço (R$)', color: body.classList.contains("dark") ? "#fff" : "#000" },
        ticks: { color: body.classList.contains("dark") ? "#fff" : "#000" },
        grid: { color: body.classList.contains("dark") ? "#444" : "#ccc" }
      }
    }
  },
  plugins: [{
    id: 'customBackground',
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      ctx.save();
      ctx.fillStyle = body.classList.contains("dark") ? "#111827" : "#ffffff"; 
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    }
  }]
});

// -------------------- Atualizar cores do gráfico --------------------
function atualizarTemaGrafico() {
  const dark = body.classList.contains("dark");

  grafico.options.plugins.legend.labels.color = dark ? "#fff" : "#000";
  grafico.options.scales.x.title.color = dark ? "#fff" : "#000";
  grafico.options.scales.x.ticks.color = dark ? "#fff" : "#000";
  grafico.options.scales.x.grid.color = dark ? "#444" : "#ccc";

  grafico.options.scales.y.title.color = dark ? "#fff" : "#000";
  grafico.options.scales.y.ticks.color = dark ? "#fff" : "#000";
  grafico.options.scales.y.grid.color = dark ? "#444" : "#ccc";

  grafico.update();
}

// -------------------- Atualização em tempo real --------------------
function atualizarGrafico() {
  const agora = new Date().toLocaleTimeString();
  const valor = (100 + Math.random() * 10).toFixed(2);

  grafico.data.labels.push(agora);
  grafico.data.datasets[0].data.push(valor);

  if (grafico.data.labels.length > 10) {
    grafico.data.labels.shift();
    grafico.data.datasets[0].data.shift();
  }

  grafico.update();
}

setInterval(atualizarGrafico, 2000);

// Toggle Tema Claro/Escuro
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    toggleBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

// Gráfico inicial do site
const ctx = document.getElementById('graficoFII').getContext('2d');
const grafico = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Preço do FII (R$)',
      data: [],
      borderColor: '#0078ff',
      backgroundColor: 'rgba(0, 120, 255, 0.2)',
      borderWidth: 2,
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Tempo' } },
      y: { title: { display: true, text: 'Preço (R$)' } }
    }
  }
});

// Atualização do gráfico
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

// Enviar mensagem para backend Flask
async function enviarMensagem() {
    const input = document.getElementById("mensagem");
    const mensagem = input.value;

    if (!mensagem) return;

    // Mostrar mensagem do usuário
    const mensagensContainer = document.getElementById("messages");
    mensagensContainer.innerHTML += `<p><strong>Você:</strong> ${mensagem}</p>`;

    try {
        const resposta = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensagem })
        });

        const data = await resposta.json();

        // Mostrar resposta da IA
        mensagensContainer.innerHTML += `<p><strong>IA:</strong> ${data.resposta}</p>`;
    } catch (error) {
        console.error("Erro ao conectar com a IA:", error);
        mensagensContainer.innerHTML += `<p><strong>Erro:</strong> Não foi possível conectar com o servidor.</p>`;
    }

    input.value = "";
}

// Exemplo de uso
(async () => {
    const respostaInicial = await enviarMensagem("Qual o melhor FII agora?");
    console.log("IA respondeu:", respostaInicial);
})();

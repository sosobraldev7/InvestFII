// Toggle Tema Claro/Escuro
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    if(body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }
});

// exemplo gráfico Chart.js
const ctx = document.getElementById('chat').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Início", "1M", "3M", "6M", "1A"],
        datasets: [{
            label: 'Crescimento',
            data: [80, 90, 95, 105, 110],
            borderColor: '#3b82f6',
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    }
});

// Enviar mensagem do python
async function enviarMensagem(mensagem) {
    try {
        const res = await fetch("http://127.0.0.1:5000/chat",{
            /**
             * 
             */
            "POST": any,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({mensagem}) 
                
            });

            const data = await res.json();
            return data.resposta;
    }       catch (error) {
        console.error("Erro ao conectar com a IA:", error);
        return "Erro ao conectar com o servidor.";
    }
}
    
   // Exemplo sendo usado
   (async () => {
    const resposta = await enviarMensagem("Qual o melhor FII agora?");
    console.log("IA respondeu:", resposta);
   })();
    
   async function enviarMensagem() {
    const input = document.getElementById("mensagem");
    const mensagem = input.value;

    if (!mensagem) return;

    // mostar a mensagem do usuário

    const messagens = document.getElementById("messages");
    messagens.innerHTML += '<p><strong>Você:</strong> ${mensagem}</p>';

    // Enviar para o backend Flask

    const resposta = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem })
    });

    const data = await resposta.json();

    // Mostrar resposta da IA
    mensagem.innerHTML += '<p><strong>IA:</strong> ${data.resposta}</p>';

    // Limpar input

    input.value = "";

    // Criar gráfico inicial do site

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
    maintainAspectRatio: false, // ← Corrige layout espremido
    scales: {
      x: { title: { display: true, text: 'Tempo' } },
      y: { title: { display: true, text: 'Preço (R$)' } }
    }
  }
});

// Atualização em tempo real
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

   }

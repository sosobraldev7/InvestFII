// -------------------- Tema Claro/Escuro --------------------
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    toggleBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
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

// -------------------- Atualização automática --------------------
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
  atualizarCards();
}

setInterval(atualizarGrafico, 2000);

// -------------------- Filtros de Período --------------------
const botoesFiltro = document.querySelectorAll(".filtro-btn");

botoesFiltro.forEach(btn => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");

    const periodo = btn.dataset.periodo;
    aplicarFiltro(periodo);
  });
});

function aplicarFiltro(periodo) {
  let pontos = 10; // default

  if (periodo.toLowerCase() === "1d") pontos = 10;
  if (periodo.toLowerCase() === "1w") pontos = 30;
  if (periodo.toLowerCase() === "1m") pontos = 60;
  if (periodo.toLowerCase() === "1y") pontos = 120;

  grafico.data.labels = [];
  grafico.data.datasets[0].data = [];

  for (let i = 0; i < pontos; i++) {
    grafico.data.labels.push(`T${i+1}`);
    grafico.data.datasets[0].data.push((100 + Math.random() * 10).toFixed(2));
  }

  grafico.update();
  atualizarCards();
}

// -------------------- Cards de Resumo --------------------
function atualizarCards() {
  const dados = grafico.data.datasets[0].data.map(Number);
  if (dados.length === 0) return;

  const atual = dados[dados.length - 1];
  const max = Math.max(...dados);
  const min = Math.min(...dados);
  const media = (dados.reduce((a,b) => a+b, 0) / dados.length).toFixed(2);

  document.getElementById("card-atual").innerHTML = `<p>Atual</p><strong>R$ ${atual}</strong>`;
  document.getElementById("card-max").innerHTML = `<p>Máximo</p><strong>R$ ${max}</strong>`;
  document.getElementById("card-min").innerHTML = `<p>Mínimo</p><strong>R$ ${min}</strong>`;
  document.getElementById("card-media").innerHTML = `<p>Média</p><strong>R$ ${media}</strong>`;
}

// -------------------- Chat IA --------------------
const bubble = document.getElementById("chat-bubble");
const chatWindow = document.getElementById("chat-window");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

// Toggle abrir/fechar
bubble.addEventListener("click", () => {
  chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
});

// Enviar mensagem
chatInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const mensagem = chatInput.value.trim();
    if (!mensagem) return;

    chatMessages.innerHTML += `<p><strong>Você:</strong> ${mensagem}</p>`;
    chatInput.value = "";

    try {
      const resposta = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem })
      });

      const data = await resposta.json();
      chatMessages.innerHTML += `<p><strong>IA:</strong> ${data.resposta}</p>`;
    } catch (error) {
      console.error("Erro ao conectar com a IA:", error);
      chatMessages.innerHTML += `<p><strong>Erro:</strong> Não foi possível conectar com o servidor.</p>`;
    }

    // Scroll para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

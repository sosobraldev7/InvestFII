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
            "POST",
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
    

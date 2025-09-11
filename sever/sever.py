from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# respostas de exemplo (é uma simulação da IA)
respostas = [
    "FII FLEUR tem mostrado forte crescimento no setor de logística.",
    "MXRF11 tem mostrado ser uma boa opção.",
    "FII HGRE11 está em destaque no setor residencial.",
    "FII FDONE tem mostrado atraído investidores pelo seu crescimento."
]

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    pergunta = data.get("mensagem", "")

    # Aqui no futuro vai ser conectado com a IA de verdade (OpenAI)
    resposta = random.choice(respostas)

    return jsonify({"resposta": resposta})  # retorna a resposta em JSON

if __name__ == "__main__":
    app.run(debug=True)

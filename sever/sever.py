from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

app = Flask(__name__)
CORS(app)

# Inicializa o cliente da OpenAI com a chave do ambiente
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def gerar_resposta_ia(mensagem):
    if not mensagem:
        return "Por favor, envie uma mensagem válida."
    if not client.api_key:
        return "Erro: OPENAI_API_KEY não definida no servidor."

    try:
        resposta = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": mensagem}],
            max_tokens=150
        )
        return resposta.choices[0].message.content.strip()
    except Exception as e:
        print("Erro OpenAI:", type(e), e)
        return f"Erro ao gerar resposta da IA: {str(e)}"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True)
    print("Body recebido:", data)
    if not data or "mensagem" not in data:
        return jsonify({"erro": "Mensagem não recebida. Envie JSON com chave 'mensagem' e header Content-Type: application/json"}), 400

    pergunta = data["mensagem"]
    resposta = gerar_resposta_ia(pergunta)
    return jsonify({"resposta": resposta})

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai # type: ignore

app = Flask(__name__)
CORS(app)

# Configurar chave da OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

def gerar_resposta_ia(mensagem):
    """
    Função que envia a mensagem para OpenAI GPT e retorna a resposta.
    """
    if not mensagem:
        return "Por favor, envie uma mensagem válida."
    
    try:
        resposta = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": mensagem}],
            max_tokens=150
        )
        return resposta.choices[0].message.content.strip()
    except Exception as e:
        print("Erro na OpenAI:", e)
        return "Erro ao gerar resposta da IA."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    if not data or "mensagem" not in data:
        return jsonify({"resposta": "Mensagem não recebida."}), 400

    pergunta = data["mensagem"]
    resposta = gerar_resposta_ia(pergunta)
    return jsonify({"resposta": resposta})

if __name__ == "__main__":
    app.run(debug=True)

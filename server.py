import string
from flask import Flask
from flask import request
from flask import jsonify
import datetime
import os
import openai
import json
from flask_cors import CORS


x = datetime.datetime.now()
i = 0
content = ""
history = []
# Initializing flask app
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/post', methods=['POST'])
def add_question():
    question = request.get_json()

    f = open("demofile2.txt", "a")
    print(question['body'])
    f.write(question['body'])
    f.close

    return 'Done', 201


@app.route('/add', methods=['POST'])
def add_history():
    history.append(request.get_json())

    f = open("demofile1.txt", "a")
    f.write(str(history))
    f.close

    return 'Done', 201

# Route for seeing a data


@app.route('/data')
def get_data():

    f = open("demofile2.txt", "r")
    prompt = f.read(20)
    f.close()
    f = open("demofile2.txt", "w")
    f.close()

    openai.api_key = "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"
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        temperature=0.1,
        max_tokens=100,
        top_p=1,
        frequency_penalty=0.5,
        presence_penalty=0)
    print(response.choices[0].text)
    f = open("demofile2.txt", "w")
    f.write(response.choices[0].text)
    return response.choices[0].text


if __name__ == '__main__':
    app.run(debug=True)


# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from flask_socketio import SocketIO, emit
# import openai

# app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
# app.config['SECRET_KEY'] = 'mysecret'
# socketio = SocketIO(app)

# openai.api_key = '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'


# @app.route('/chat', methods=['POST'])
# def chat():
#     message = request.json['message']
#     response = openai.Completion.create(
#         engine="davinci",
#         prompt=message,
#         max_tokens=60
#     ).choices[0].text.strip()
#     emit('response', {'message': response})
#     return jsonify({'status': 'ok'})


# if __name__ == '__main__':
#     socketio.run(app, cors_allowed_origins='*')

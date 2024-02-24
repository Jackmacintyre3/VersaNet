
from flask import Flask, render_template, request
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/speak', methods=['POST'])
def speak():
    text = request.form['text']
    os.system(f'espeak "{text}"')
    return "OK"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

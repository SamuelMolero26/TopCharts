#server set up so data can be transformed to json and thus
# be pull into the extension

from flask import Flask , jsonify

from fetch import get_genres

app = Flask(__name__)

@app.route('/data&scripts', methods =['GET'])
def get_data():
    data = get_genres()
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=5000)
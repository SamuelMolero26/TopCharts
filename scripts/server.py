#server set up so data can be transformed to json and thus
# be pull into the extension

from flask import Flask , jsonify
from flask_cors import CORS
from fetch import get_genres
from fetch import get_genres

app = Flask(__name__)
CORS(app)


@app.route('/scripts', methods =['GET'])
def get_data():
    print('Getting data')
    data = get_genres()
    # data = {"message": "Hello, world!"}
    return jsonify(data)

if __name__ == '__main__':
    print('Server running')
    app.run(host='127.0.0.1', port=5000, debug=True)
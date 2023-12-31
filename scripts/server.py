# server set up so data can be transformed to json and thus
# be pull into the extension

from flask import Flask, jsonify
from flask_cors import CORS
from fetch import artist_id, artist_tracks
from api import get_token, get_market

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/artist/<artist_name>', methods=['GET'])
def get_data(artist_name):
    print('Getting data')
    print('Received request for artist:', artist_name)
    token = get_token()
    markets = get_market(token)
    id = artist_id(token, artist_name)
    data = []
    for market in markets:
        tracks = artist_tracks(token, id, market)
        data.append(tracks)
    data.append(tracks)
    
    # Return the data as JSON
    return jsonify(data)

if __name__ == '__main__':
    print('Server running')

    app.run(host='127.0.0.1', port=5000, debug=True)
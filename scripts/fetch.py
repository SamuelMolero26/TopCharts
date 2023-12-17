import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from api import get_token

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

#fetch the genres

def get_genres():
    token = get_token()

    if token:
        client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
        sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

        #list of genres
        genres = sp.recommendation_genre_seeds()["genres"]
        
        for genre in genres:
            results = sp.recommendations(seed_genres=[genre], limit=100)

            #populate the tracks by popularity
            tracks = sorted(results['tracks'], key=lambda track: track['popularity'], reverse=True)

            top_track = tracks[0]
            print(f"Top track for {genre}: {top_track['name']} by {top_track['artists'][0]['name']}")
    
get_genres()








from api import get_token, get_market, get_auth_header
from requests import post, get
import json

token = get_token()
# genres = get_genre(token)

markets = get_market(token) #markets


def artist_id(token,artist_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    query = f"?q={artist_name}&type=artist&limit=1"
    query_url = url + query

    response  = get(query_url, headers = headers)
    print(f"Response status code: {response.status_code}")
    json_response = json.loads(response.content)

    id = json_response ['artists']['items'][0]['id']

    return id



#gather top tracks based on the artist and market
def artist_tracks(token, artist, market):
    url = f"https://api.spotify.com/v1/artists/{artist}/top-tracks?market={market}"
    headers = get_auth_header(token)
    response = get(url, headers=headers)
    json_response = json.loads(response.content)
    tracks = json_response["tracks"][:5]  # Retrieve only the first 5 tracks
    
    track_library = []  # Create an empty list to store track information
    
    for track in tracks:
        track_name = track["name"]
        track_popularity = track["popularity"]
        album_name = track["album"]["name"]  # Retrieve the album name
        album_cover_image = track["album"]["images"][0]["url"]  # Retrieve the album cover image
        track_info = {
            "Track Name": track_name,
            "Popularity": track_popularity,
            "Album Name": album_name,  # Add album name to track information
        }
        track_library.append(track_info)  # Append the track information to the library
    
    return track_library




# id = artist_id(token,"Rawayana")
# print("id : ", id)

# print(artist_tracks(token,id,"TN"))












from api import get_token, get_genre, get_auth_header
from requests import post, get
import json

token = get_token()
genres = get_genre(token)


def top_artist_genre(token, genre):
    url = f"https://api.spotify.com/v1/search"
    header = get_auth_header(token)
    query = f"?q={genre}&type=artist&limit=1"

    query_url = url + query
    result = get(query_url, headers=header)
    json_result = json.loads(result.content)

    artists = json_result.get("artist",{}).get("items", [])

    if artists:
        artist = artists[0]
        artist_name = artist.get("name", "")
        artist_genres = artist.get("genres", [])
        return {"name": artist_name, "genres": artist_genres}

    else:
        print(f"No artists found for genre: {genre}")
        return None

    
print(top_artist_genre(token,genres))


     

    












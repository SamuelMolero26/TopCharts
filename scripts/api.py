from  dotenv import load_dotenv
import os
import base64
from requests import post, get
import json


load_dotenv() #only loads if "envoriment" file is .env

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

# print(client_id,client_secret)

#token confimation
def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8") 
    auth_base64 = str(base64.b64encode(auth_bytes),"utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization":"Basic " + auth_base64,
        "Content-Type":"application/x-www-form-urlencoded",
    }

    data ={"grant_type":"client_credentials"}
    result = post(url,headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token

#Needed authentication

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}



#gather the genere I needss, pulls from given url -- all genres in spotify
# def get_genre(token):
#     url = "https://api.spotify.com/v1/recommendations/available-genre-seeds"
#     headers = get_auth_header(token)
#     response = get(url, headers=headers)
#     json_response = json.loads(response.content)
#     genres = json_response["genres"]

#     return genres

def get_market(token):
    url = "https://api.spotify.com/v1/markets"
    headers = get_auth_header(token)
    response = get(url, headers=headers)
    json_response = json.loads(response.content)
    markets = json_response["markets"]

    return markets

# tokens = get_token()
# print(get_market(tokens))

# print(tokens)
# print(get_auth_header(tokens))
# # print(get_genre(tokens))

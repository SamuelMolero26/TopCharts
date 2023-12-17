from  dotenv import load_dotenv
import os

load_dotenv() #only loads if "envoriment" file is .env

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

# print(client_id,client_secret)
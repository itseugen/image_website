#!/usr/bin/env python3

import cgi
import json
import requests
import os
import sys
import urllib.parse

# Load the API key from a config file outside the document root
def load_api_key():
	with open("/workspaces/Webserv/secret.json") as f:
		config = json.load(f)
		return config["GIPHY_API_KEY"]

def get_gifs(query):
	api_key = load_api_key()
	url = f"https://api.giphy.com/v1/gifs/search?api_key={api_key}&q={query}&limit=6&lang=en"
	try:
		response = requests.get(url)
		response.raise_for_status()  # Raise an error for bad responses
		return response.json()['data']
	except requests.RequestException as e:
		print("HTTP/1.1 500 Internal Server Error")  # Set appropriate HTTP status code
		print("Content-Type: application/json")
		print("")  # End of headers
		print(json.dumps({"error": f"Error fetching GIFs: {str(e)}"}))

# Get the query from the request
query = os.environ['QUERY_STRING']
# Fetch GIFs based on the query
gifs = get_gifs(query)

# Prepare the response JSON
response_json = json.dumps(gifs)

# Print the HTTP headers
print("HTTP/1.1 200 OK\r")
print("Content-Type: application/json\r")
print(f"Content-Length: {len(response_json)}\r\n\r")

# Print the JSON response
print(response_json)
sys.exit(0)
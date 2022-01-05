"""Basic Images API service"""
import os
import uuid
from flask import Flask, request, json, jsonify
from dotenv import load_dotenv

from pymongo import MongoClient

MONGODB_HOST = "localhost"
MONGODB_PORT = 27017
DB_NAME = "wikiDB"
COLLECTION_NAME = "articles"

mongo_client = MongoClient(MONGODB_HOST, MONGODB_PORT)
db = mongo_client.wikiDB
articles_collection = db.articles

load_dotenv(dotenv_path="./.env.local")

DEBUG = bool(os.environ.get("DEBUG", True))
app = Flask(__name__)

app.config["DEBUG"] = DEBUG


@app.route("/articles", methods=["GET", "POST"])
def new_article():
    # read articles from the database
    if request.method == "GET":
        articles = articles_collection.find({})
        return jsonify([art for art in articles])

    if request.method == "POST":
        # save article in the database
        json.loads(request.data)
        article = request.get_json()
        uniqueid = uuid.uuid1()
        article["_id"] = uniqueid.hex
        result = articles_collection.insert_one(article)
        return {"inserted_id": result.inserted_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)

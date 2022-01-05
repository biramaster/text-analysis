"""Basic Images API service"""
import os
import uuid
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS

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
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/article", methods=["GET"])
# read article from the database
def article():
    title = request.args.get("query")
    art = articles_collection.find_one({"title": title})
    return jsonify(art)


@app.route("/articles", methods=["GET", "POST"])
# route for insert and select many
def new_article():
    # read articles from the database
    if request.method == "GET":
        articles = articles_collection.find({})
        return jsonify([art for art in articles])

    if request.method == "POST":
        # save article in the database
        art = request.get_json()
        uniqueid = uuid.uuid1()
        art["_id"] = uniqueid.hex
        result = articles_collection.insert_one(art)
        return {"inserted_id": result.inserted_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)

import time
from flask import Flask, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/update_my_itinerary', methods=["POST"])
def update_my_itinerary():
    # get request
    # update the database
    # return status
    return {'time': time.time()}


@app.route('/get_my_itinerary', methods=["GET"])
def get_my_itinerary():
    result = [{"dayName": "Day 1",
              "places": [{"id": 1,
                          "name": "Amsterdam",
                          "sleeping": False,
                          "position": {"lat": 43.7102, "lng": 7.262},
                          "day": "Day 1",
                          "description": "football match",
                          "media": "https://www.chamonix.com/img/sitra/fiche/151128-0-ot-vallee-de-chamonix-salome-abrial-0857.jpg",
                          "web": "https://www.chamonix.com/chamonix-mont-blanc,0,en.html"}]},
              {"dayName": "Day 2",
               "places": [{"id": 2,
                           "name": "Rotterdam",
                           "sleeping": False,
                           "position": {"lat": 53.7002, "lng": 5.362},
                           "day": "Day 2",
                           "description": "architecture",
                           "media": "https://www.chamonix.com/img/sitra/fiche/151128-0-ot-vallee-de-chamonix-salome-abrial-0857.jpg",
                           "web": "https://www.chamonix.com/chamonix-mont-blanc,0,en.html"}]}
              ]
    return jsonify(result)
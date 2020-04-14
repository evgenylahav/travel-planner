from flask import Blueprint, jsonify, request
from .extensions import mongo
import time
from bson.json_util import dumps, loads

main = Blueprint('main', __name__)


@main.route('/')
def index():
    user_collections = mongo.db.users
    user_collections.insert({'name': 'Kodon'})
    return '<h1>Added a user<h1>'


@main.route('/time')
def get_current_time():
    return {'time': time.time()}


@main.route('/update_my_itinerary', methods=["POST"])
def update_my_itinerary():
    # get request
    # update the database
    # return status
    req_data = request.get_json()

    my_itinerary = mongo.db.my_itinerary
    my_itinerary.remove()
    my_itinerary.insert(req_data)

    return {'message': "succeeded"}


@main.route('/get_my_itinerary', methods=["GET"])
def get_my_itinerary():
    my_itinerary = mongo.db.my_itinerary
    l = my_itinerary.find()
    response = dumps(l)
    return response

    # return jsonify(response)

    # result = [{"dayName": "Day 1",
    #           "places": [{"id": 1,
    #                       "name": "Amsterdam",
    #                       "sleeping": False,
    #                       "position": {"lat": 43.7102, "lng": 7.262},
    #                       "day": "Day 1",
    #                       "description": "football match",
    #                       "media": "https://www.chamonix.com/img/sitra/fiche/151128-0-ot-vallee-de-chamonix-salome-abrial-0857.jpg",
    #                       "web": "https://www.chamonix.com/chamonix-mont-blanc,0,en.html"}]},
    #           {"dayName": "Day 2",
    #            "places": [{"id": 2,
    #                        "name": "Rotterdam",
    #                        "sleeping": False,
    #                        "position": {"lat": 53.7002, "lng": 5.362},
    #                        "day": "Day 2",
    #                        "description": "architecture",
    #                        "media": "https://www.chamonix.com/img/sitra/fiche/151128-0-ot-vallee-de-chamonix-salome-abrial-0857.jpg",
    #                        "web": "https://www.chamonix.com/chamonix-mont-blanc,0,en.html"}]}
    #           ]

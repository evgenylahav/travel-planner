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
    req_data = request.get_json()

    my_itinerary = mongo.db.my_itinerary
    my_itinerary.remove()
    my_itinerary.insert(req_data)

    return {'message': "succeeded"}


@main.route('/get_my_itinerary', methods=["GET"])
def get_my_itinerary():
    my_itinerary = mongo.db.my_itinerary
    l = my_itinerary.find({}, {'_id': False})
    response = dumps(l)
    return response

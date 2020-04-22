from flask import Blueprint, jsonify, request
from .extensions import mongo
from bson.json_util import dumps, loads

main = Blueprint('main', __name__)


@main.route('/')
def index():
    user_collections = mongo.db.users
    user_collections.insert({'name': 'Kodon'})
    return '<h1>Added a user<h1>'


@main.route('/update_my_itinerary', methods=["POST"])
def update_my_itinerary():
    try:
        req_data = request.get_json()
        print(type(req_data))

        for key, value in req_data.items():
            print(key, value)

        trip_name = req_data['tripName']
        print(trip_name)

        my_itinerary = mongo.db.my_itinerary
        my_itinerary.replace_one({'tripName': trip_name}, req_data)

        return {'message': "success"}
    except:
        return {'message': "error"}


@main.route('/create_new_trip', methods=["POST"])
def create_new_trip():
    req_data = request.get_json()
    trip_name = req_data['tripName']

    my_itinerary = mongo.db.my_itinerary
    my_itinerary.delete_one({'tripName': trip_name})
    my_itinerary.insert(req_data)

    return {'message': "succeeded"}


@main.route('/load_last_trip', methods=["GET"])
def load_last_trip():
    db = mongo.db.my_itinerary
    cursor = db.find()

    timestamps = []
    for doc in cursor:
        timestamps.append(doc['timestamp'])

    last_trip_timestamp = max(timestamps)

    response = db.find_one({"timestamp": last_trip_timestamp})
    del response["_id"]
    return dumps(response)


@main.route('/get_all_trip_names', methods=["GET"])
def get_all_trip_names():
    db = mongo.db.my_itinerary
    cursor = db.find()

    trip_names = []
    for doc in cursor:
        trip_names.append(doc['tripName'])

    print(trip_names)
    all_trips = {"tripNames": trip_names}

    return dumps(all_trips)


@main.route('/load_itinerary', methods=["POST"])
def load_itinerary():
    req_data = request.get_json()
    trip_name = req_data['tripName']

    db = mongo.db.my_itinerary

    response = db.find_one({'tripName': trip_name})
    del response["_id"]
    return dumps(response)

from flask import Blueprint, jsonify, request
from .extensions import mongo
from passlib.hash import sha256_crypt
from bson.json_util import dumps, loads

main = Blueprint('main', __name__)

# generate data
@main.route('/update_my_itinerary', methods=["POST"])
def update_my_itinerary():
    try:
        req_data = request.get_json()

        user = req_data['user']
        trip_name = req_data['tripName']

        collection = mongo.db.users

        user_db = mongo.db.users.find_one({"email": user['email']})

        my_trips = user_db["my_trips"]

        data = {"timestamp": req_data["timestamp"], "tripName": trip_name, "itinerary": req_data["itinerary"]}

        new_my_trips = []

        for trip in my_trips:
            found = False
            for key, value in trip.items():
                if key == "tripName" and value == trip_name:
                    new_my_trips.append(data)
                    found = True

            if not found:
                new_my_trips.append(trip)

        user_db["my_trips"] = new_my_trips

        collection.replace_one({"email": user["email"]}, user_db)

        return {'message': "success"}
    except:
        return {'message': "error"}


@main.route('/create_new_trip', methods=["POST"])
def create_new_trip():
    req_data = request.get_json()

    user = req_data['user']
    trip_name = req_data['tripName']

    collection = mongo.db.users

    user_db = mongo.db.users.find_one({"email": user['email']})

    my_trips = user_db["my_trips"]
    data = {"timestamp": req_data["timestamp"], "tripName": trip_name, "itinerary": req_data["itinerary"]}

    # insert handle if the trip exists
    found = False
    for trip in my_trips:
        for key, value in trip.items():
            if key == "tripName" and value == trip_name:
                found = True

    if not found:
        my_trips.append(data)
        user_db["my_trips"] = my_trips
        collection.replace_one({"email": user["email"]}, user_db)
        return {'message': "succeeded"}
    else:
        return {'message': "failed"}


# load data
@main.route('/load_last_trip', methods=["POST"])
def load_last_trip():
    req_data = request.get_json()

    user = req_data['user']

    user_db = mongo.db.users.find_one({"email": user['email']})

    my_trips = user_db["my_trips"]

    timestamps = []
    for trip in my_trips:
        timestamps.append(trip['timestamp'])

    last_trip_timestamp = max(timestamps)

    response = None
    for trip in my_trips:
        if trip['timestamp'] == last_trip_timestamp:
            response = trip
            break

    return dumps(response)


@main.route('/get_all_trip_names', methods=["POST"])
def get_all_trip_names():
    req_data = request.get_json()

    user = req_data['user']

    user_db = mongo.db.users.find_one({"email": user['email']})

    my_trips = user_db["my_trips"]

    trip_names = []
    for trip in my_trips:
        trip_names.append(trip['tripName'])

    all_trips = {"tripNames": trip_names}

    return dumps(all_trips)


@main.route('/load_itinerary', methods=["POST"])
def load_itinerary():
    req_data = request.get_json()

    user = req_data['user']
    trip_name = req_data['tripName']

    user_db = mongo.db.users.find_one({"email": user['email']})

    my_trips = user_db["my_trips"]

    response = None
    for trip in my_trips:
        if trip['tripName'] == trip_name:
            response = trip
            break

    return dumps(response)


# authentication
@main.route('/register', methods=['POST'])
def register():

    users = mongo.db.users

    req_data = request.get_json()
    first_name = req_data['firstName']
    last_name = req_data['lastName']
    password = req_data['password']
    email = req_data['email']

    existing_user = users.find_one({'email': email})

    if existing_user is None:
        password = sha256_crypt.encrypt(password)
        users.insert({'firstName': first_name,
                      'lastName': last_name,
                      'password': password,
                      'email': email,
                      "my_trips": []})
        print("returning status success")
        return {"status": True,
                "user": {"firstName": first_name,
                         "lastName": last_name,
                         "email": email},
                "message": "Signup completed successfully"}

    print("returning status failure")
    return {"status": False, "user": None, "message": "There is already an account for this email"}


@main.route('/login_to', methods=['POST'])
def login_to():
    users = mongo.db.users

    req_data = request.get_json()
    password = req_data['password']
    email = req_data['email']

    login_user = users.find_one({'email': email})

    if login_user:
        if sha256_crypt.verify(password, login_user['password']):
            return {"status": True,
                    "user": {"firstName": login_user['firstName'],
                             "lastName": login_user['lastName'],
                             "email": login_user['email']},
                    "message": "login completed successfully"}

    return {"status": False,
            "user": None,
            "message": "login failed as password doesnt match the email"}

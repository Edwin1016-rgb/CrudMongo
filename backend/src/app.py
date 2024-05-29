from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo, ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/crudDB"
mongo = PyMongo(app)
CORS(app)
db = mongo.db.users


@app.route('/users', methods=['POST'])
def createUser():
    result = db.insert_one({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    })
    return jsonify(str(ObjectId(result.inserted_id)))


@app.route('/users', methods=['GET'])
def getUsers():
    # page = request.args.get('page', default=1, type=int)
    # limit = request.args.get('limit', default=10, type=int)
    # skips = limit * (page - 1)

    userslist = []
    for doc in db.find():  # .skip(skips).limit(limit):
        userslist.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })

    total_users = db.count_documents({})

    return jsonify({
        'users': userslist,
        'total': total_users,
        # 'page': page,
        # 'limit': limit
    })


@app.route('/users/<id>', methods=['GET'])
def getUser(id):
    myUser = db.find_one({'_id': ObjectId(id)})
    print(myUser)
    return jsonify({
        '_id': str(ObjectId(myUser['_id'])),
        'name': myUser['name'],
        'email': myUser['email'],
        'password': myUser['password']
    })


@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    }})
    return jsonify({'message': 'User ' + id + ' was updated'})


@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'User ' + id + ' was deleted'})


@app.route('/search', methods=['GET'])
def searchUsers():
    name_query = request.args.get('name')
    email_query = request.args.get('email')

    if not name_query and not email_query:
        return jsonify({'message': 'Faltan parámetros de búsqueda'}), 400

    query = {}
    if name_query:
        query['name'] = {'$regex': name_query, '$options': 'i'}
    if email_query:
        query['email'] = {'$regex': email_query, '$options': 'i'}

    users = db.find(query)

    search_results = []
    for user in users:
        search_results.append({
            '_id': str(ObjectId(user['_id'])),
            'name': user['name'],
            'email': user['email'],
            'password': user['password']
        })

    return jsonify({'users': search_results}), 200


if __name__ == "__main__":
    app.run(debug=True)

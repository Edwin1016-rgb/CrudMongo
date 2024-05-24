from flask import Flask , request , jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask (__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/crudDB"
mongo = PyMongo(app)
CORS(app)
db= mongo.db.users

@app.route('/users', methods=['POST'])
def createUser():
    result = db.insert_one({
            'name':request.json['name'],
            'email':request.json['email'],
            'password':request.json['password']
    })
    return jsonify(str(ObjectId(result.inserted_id)))


@app.route('/users', methods=['GET'])
def getUsers():
    userslist=[]
    for doc in db.find():
        userslist.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'email':doc['email'],
            'password':doc['password']
        })
    return jsonify(userslist)

@app.route('/users/<id>', methods=['GET'])
def getUser(id):
    myUser = db.find_one({'_id':ObjectId(id)})
    print(myUser)
    return jsonify({
        '_id':str(ObjectId(myUser['_id'])),
        'name':myUser['name'],
        'email':myUser['email'],
        'password':myUser['password']
    })

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id':ObjectId(id)})
    return jsonify({'message':'User '+id+' was deleted'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id':ObjectId(id)},{'$set':{
        'name':request.json['name'],
        'email':request.json['email'],
        'password':request.json['password']
    }})
    return jsonify({'message':'User '+id+' was updated'})


if __name__ == "__main__": 
    app.run(debug=True)






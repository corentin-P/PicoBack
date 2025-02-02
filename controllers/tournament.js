const Db = require('./db.js')
const User = require('./user.js')

class Tournament {
    static async getAllTournament(request, response) {
        let collection = Db.getDb().collection('tournament')
        let values = await collection.find({}).toArray()
        response.status(200)
        response.setHeader('Access-Control-Allow-Origin', "http://localhost:5173")
        response.send(values)
        return
    }

    static async getNextTournament(request, response) {
        let collection = Db.getDb().collection('tournament')
        let values = await collection.find({}).toArray()
        let dateNow = new Date(Date.now())
        let nextTournament
        for (let i = 0; i < values.length; i++) {
            let currentDate = new Date(values[i]["date"])
            if (currentDate.getTime() > dateNow.getTime()) {
                if (!nextTournament) {
                    nextTournament = values[i]
                } else {
                    let dateNextTournament = new Date(nextTournament["date"])
                    if (currentDate.getTime() < dateNextTournament.getTime()) {
                        nextTournament = values[i]
                    }
                }
            }
        }
        if (nextTournament) {
            response.status(200)
            response.send(nextTournament)
            return
        }
        response.status(200)
        response.send({"message": "There are no futur tournament"})
        return
    }

    static async getLastTournament(request, response) {
        let collection = Db.getDb().collection('tournament')
        let values = await collection.find({}).toArray()
        let dateNow = new Date(Date.now())
        let nextTournament
        for (let i = 0; i < values.length; i++) {
            let currentDate = new Date(values[i]["date"])
            if (currentDate.getTime() < dateNow.getTime()) {
                if (!nextTournament) {
                    nextTournament = values[i]
                } else {
                    let dateNextTournament = new Date(nextTournament["date"])
                    if (currentDate.getTime() > dateNextTournament.getTime()) {
                        nextTournament = values[i]
                    }
                }
            }
        }
        if (nextTournament) {
            response.status(200)
            response.send(nextTournament)
            return
        }
        response.status(200)
        response.send({"message": "There are no passed tournament"})
        return
    }

    static async createNewTournament(request, response) {
        if (!request.body['admin-email'] || !request.body['admin-password'] || !request.body.title || !request.body.date || !request.body.location) {
            response.status(404)
            response.send({"error": "One or more parameter is/are missing."})
            return
        }
        if (await User.connection(request.body['admin-email'], request.body['admin-password'])) {
            Db.getDb().collection('tournament').insertOne({
                "title": request.body.title,
                "date": request.body.date,
                "location": request.body.location,
                "result": request.body.result ?? ""
            })
            response.status(200)
            response.send({"message": "Tournament added"})
            return
        }
        response.status(404)
        response.send({"error": "User not authorized to access this service."})
        return
    }
    
    static async modifyTournament(request, response) {
        if (!request.body['admin-email'] || !request.body['admin-password'] || !request.body['tournament-id']) {
            response.status(404)
            response.send({"error": "One or more parameter is/are missing."})
            return
        }
        
    }
}

module.exports = Tournament
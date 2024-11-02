const Db = require('./db.js')

class User {
    static async connectUser(request, response) {
        // if a parameter is forgotten
        if (!request.body.email || !request.body.password) {
            response.status(404)
            response.send({"error": "You forgot to enter your email or your password."})
            return
        }

        if (await User.connection(request.body.email, request.body.password)) {
            response.status(200)
            response.send({"token": "", "message": "Connection successful."})
            return
        }

        response.status(403)
        response.send({"error": "Connection failed, you're email or password is incorrect. Please, try again."});
    }
    
    static async createNewUser(request, response) {
        if (!request.body['admin-email'] || !request.body['admin-password'] || !request.body['new-admin-email'] || !request.body['new-admin-password']) {
            response.status(404)
            response.send({"error": "One or more parameter is/are missing."})
            return
        }
        
        if (await User.connection(request.body['admin-email'], request.body['admin-password'])) {
            if (await User.userExists(request.body['new-admin-email'])) {
                response.status(403)
                response.send({"error": "New user already exists."})
                return
            }
            
            try {
                Db.getDb().collection('login').insertOne({
                    "email": request.body['new-admin-email'],
                    "password": request.body['new-admin-password']
                })
                response.status(200)
                response.send({"message": "User added"})
                return
            } catch (e) {
                response.status(404)
                response.send({"error": "Failed to add user : " + e})
                return
            }
        }
        
        response.status(404)
        response.send({"error": "User not authorized to access this service."})
        return
    }

    /**
    * @param {string} email 
    * @param {string} password 
    * @returns true if it's right email & password, else false
    */
    static async connection(email, password) {
        let collection = Db.getDb().collection('login');
        let values = await collection.find({"email": email, "password": password}).toArray();

        if (values.length > 0) {
            return true;
        }
        return false;
    }
    
    static async userExists(email) {
        let collection = Db.getDb().collection('login');
        let values = await collection.find({"email": email}).toArray();
    
        if (values.length > 0) {
            return true;
        }
        return false;
    }
}

module.exports = User
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
}

module.exports = User
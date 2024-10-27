const DB = require('mongodb');
const env = require('dotenv').config().parsed;

class Db {
    /** 
     * Connection to mongodb 
     */
    static database;
    client;
    constructor() {
        try {
            let url = env.DB_URL.replace('<db_username>', encodeURIComponent(env.DB_USER)).replace('<db_password>', encodeURIComponent(env.DB_PASSWORD));
            let client = new DB.MongoClient(url);
            this.client = client.db(env.DB_NAME);
            if (!this.database instanceof Promise) { // voir https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://stackoverflow.com/questions/30539183/how-do-you-check-if-the-client-for-a-mongodb-instance-is-valid&ved=2ahUKEwjgyfXWy6aHAxWxRqQEHReNDJoQFnoECB8QAQ&usg=AOvVaw2_cg5jO5o6MV15pc0H5l6r
                this.client = {"error": "Connection to database failed"};
            }
            
        } catch (error) {
            this.client = {"error": "Connection to database failed : " + error};
        }
    }

    static getDb() {
        if (!this.database) {
            this.database = new Db();
        } 

        return this.database.client;
    }

    static connectionStatus(request, response) {
        // on arrive à avoir un client sans connection à internet !!! Attention 
        let client = Db.getDb()
        if (client['error']) {
            response.status(409);
            response.send({"status": "Down", "error": client['error']});
            return;
        }
        response.status(200);
        response.send({"status": "Running"});
    }
}
module.exports = Db
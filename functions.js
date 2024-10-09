const DB = require('mongodb');
const env = require('dotenv').config().parsed;

/** 
 * Connection to the database 
 * @return the database object (from mongodb)
 * */
async function connect() {
    try {
        let url = env.DB_URL.replace('<user>', encodeURIComponent(env.DB_USER)).replace('<password>', encodeURIComponent(env.DB_PASSWORD));
        let client = new DB.MongoClient(url);
        console.log(client);
        let database = client.db(env.DB_NAME);
        if (!database instanceof Promise) { // voir https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://stackoverflow.com/questions/30539183/how-do-you-check-if-the-client-for-a-mongodb-instance-is-valid&ved=2ahUKEwjgyfXWy6aHAxWxRqQEHReNDJoQFnoECB8QAQ&usg=AOvVaw2_cg5jO5o6MV15pc0H5l6r
            //new Exception
        }
        return database;
    } catch (error) {
        return {"error": "Connection to database failed : " + error};
    }
}

function get() {
    console.log('get');
}

module.exports = {
    connect: connect,
    get: get
}

/**
 * const movies = database.collection('login');
    // Query for a movie that has the title 'Back to the Future'
    const query = { "_id": 0 };
    const movie = await movies.findOne(query);
    console.log(movie);
 */
import app from "./server.js";
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

async function main(){

    dotenv.config() // we load in the environment variable

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URL
    ) //we create an instance of MongoClient and pass in the database url
    const port = process.env.PORT || 8000

    try{
        //connect to the MongoDB cluster
        await client.connect();
        await MoviesDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)

        app.listen(port,()=>{
            console.log('server is running on port: ' + port)
        })
    }catch (e){
        console.log(e);
        process.exit(1)
    }
}

main().catch(console.error);
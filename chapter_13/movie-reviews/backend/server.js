import express from 'express'; //import express
import cors from 'cors'; //import cors middleware

import movies from './api/movies.route.js'; 

const app = express(); //we create the server

app.use(cors()); //tell express to use cors as middleware 
app.use(express.json());// tell express to use express.json as middleware

app.use("/api/v1/movies", movies); // we specify the initial routes
app.use("*",(req,res) => {
    res.status(404).json({error:"not found"})

})

export default app;
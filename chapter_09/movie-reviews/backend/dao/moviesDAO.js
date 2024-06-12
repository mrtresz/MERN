let movies; // Declare a variable to hold the reference to the movies collection

export default class MoviesDAO {
    // Define the MoviesDAO class with static methods

    static async injectDB(conn) {
        // Define an async static method to inject the database connection
        if (movies) {
            // If the movies collection is already initialized, do nothing
            return;
        }
        try {
            // Try to get the movies collection from the database connection
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
            // 'process.env.MOVIEREVIEWS_NS' is the name of the database, and 'movies' is the name of the collection
        } catch (e) {
            // If there's an error, log it to the console
            console.error(`unable to connect in MoviesDAO: ${e}`);
        }
    }

    static async getMovies({
        // Define an async static method to get movies with optional filters, pagination, and limit
        filters = null, // Default value for filters is null
        page = 0,       // Default value for page is 0 (first page)
        moviesPerPage = 20 // Default value for moviesPerPage is 20
    } = {}) {
        // Function parameters are destructured from an object, and the object itself has a default value of an empty object
        let query; // Declare a variable to hold the query object
        if (filters) {
            // If filters are provided
            if ("title" in filters && filters['title']) {
                // If the filters object has a "title" key
                query = { $text: { $search: filters['title'] } };
                // Create a text search query for the title
            } else if ("rated" in filters) {
                // If the filters object has a "rated" key
                query = { "rated": { $eq: filters['rated'] } };
                // Create a query to match the exact rating
            }
        }

        let cursor; // Declare a variable to hold the cursor for the query results
        try {
            // Try to execute the query and handle pagination
            cursor = await movies.find(query) // Execute the query on the movies collection
                .limit(moviesPerPage) // Limit the number of results per page
                .skip(moviesPerPage * page); // Skip the results based on the current page

            const moviesList = await cursor.toArray(); // Convert the cursor to an array of movies
            const totalNumMovies = await movies.countDocuments(query); // Get the total number of documents that match the query

            // Return an object containing the movies list and the total number of movies
            return { moviesList, totalNumMovies };
        } catch (e) {
            // If there's an error, log it to the console and return an empty result
            console.error(`Unable to issue find command, ${e}`);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }
}

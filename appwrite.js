import { Client, Databases, ID, Query } from "appwrite"

const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID
const collection_id = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(project_id);
const database = new Databases(client);


export const updateSearchCount = async (searchterm,movie) =>{
//    1. use appwrite sdk to check if searchTerm exists in the database
try{
    const result = await database.listDocuments(database_id,collection_id,[Query.equal("searchterm",searchterm)])
   //    2. if it exists, update the count by 1 and add movie to the list of movies

    if(result.total>0){
        const doc = result.documents[0];
        await database.updateDocument(database_id,collection_id,doc.$id,{
            count: doc.count + 1,
        })
    }
    //    3. if it doesn't exist, create a new entry with count 1 and the movie in the list
    else{
        await database.createDocument(database_id,collection_id,ID.unique(),{
            searchterm: searchterm,
            count: 1,
            movieid:movie.id,
            posterurl:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })
    }
}catch(err){
    console.log(err)
}



}

export const getTrendingMovies = async () =>{
    try{
        const res = await database.listDocuments(database_id,collection_id,[Query.orderDesc("count"),Query.limit(10)])
        return res.documents
    }catch(err){
        console.log(err)
    }
}
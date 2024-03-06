import { connectDB } from "@/util/database";

export default async function handler(request,response){
    if(request.method=='POST'){

        const client= await connectDB;
        const db=client.db("forum")
        let result = await db.collection('feedback').insertOne(request.body)
        response.status(200).redirect('/student')
    }
    
}
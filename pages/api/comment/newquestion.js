import { connectDB } from "@/util/database";

export default async function handler(request,response){
    if(request.method=='POST'){
        if (request.body.title==''){
            return response.status(500).json('메세지를 쓰세요')
        }
        const client= await connectDB;
        const db=client.db("forum")
        let result = await db.collection('question').insertOne(request.body)
        return response.status(200).redirect('/student')
    }
    
}
import { connectDB } from "@/util/database"

export default async function handler(request,response){
    const db=(await connectDB).db('forum')
    let result = await db.collection('question').find().toArray()
    response.status(200).json(result)
    

}
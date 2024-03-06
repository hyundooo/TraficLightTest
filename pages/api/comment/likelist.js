import { connectDB } from "@/util/database"

export default async function handler(request,response){
    const db=(await connectDB).db('forum')
    let intCounts=[]
    let hardCounts=[]

    //counts=[] 
    const currentTime = new Date();
    const tenMinuteAgo = new Date(currentTime.getTime() - 600000);
    let result = await db.collection('feedback').find({time: { $gte: tenMinuteAgo.toISOString(), $lte: currentTime.toISOString() }}).toArray()
    response.status(200).json(result)
    

}
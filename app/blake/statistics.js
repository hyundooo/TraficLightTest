'use client'

import { useEffect, useState } from "react"

export default function Statistics(props){
    let [alert, setAlert] = useState(true)
    let [a,setA]=useState([])
    let [counts,setCounts]=useState({});
    let [iCounts,setICounts]=useState([0,0,0,0,0,0,0,0,0,0,0]);
    let [hCounts,setHCounts]=useState([0,0,0,0,0,0,0,0,0,0,0]);
    let [questions,setQuestions]=useState([]);
    useEffect(()=>{
        let timer=setTimeout(()=>{ setAlert(!alert) }, 10000)
       

        fetch('/api/comment/likelist').then(r=>r.json()).then((result)=>{
            setA(result)
        })
        const icountstmp = [0,0,0,0,0,0,0,0,0,0,0];
        const hcountstmp = [0,0,0,0,0,0,0,0,0,0,0];
        const currentTime=new Date();
        a.forEach(item => {
        const time = new Date(item.time);
        const differenceInMinutes = Math.floor((currentTime - time) / (1000 * 60));
        if (item.msg === 'hard') {
            hcountstmp[differenceInMinutes]++;
        }
        if (item.msg === 'interesting') {
            icountstmp[differenceInMinutes]++;
        }
   
        // const minute = time.getMinutes();
        // const key = `${time.getHours()}_${minute < 10 ? '0' : ''}${minute}`;
        
        // if (!countstmp[key]) {
        //     countstmp[key] = { hard: 0, interesting: 0 };
        // }

        // if (item.msg === 'hard') {
        //     countstmp[key].hard++;
        // } else if (item.msg === 'interesting') {
        //     countstmp[key].interesting++;
        // }
        });
        //setCounts({...countstmp})
        setICounts([...icountstmp])
        setHCounts([...hcountstmp])
        
        fetch('/api/comment/questionlist').then(r=>r.json()).then((result)=>{
            setQuestions([...result])
        })
        
        return ()=>{
            clearTimeout(timer)
        }
    },[alert])

    return(
        <div>
            
            <table>
                <tr>
                <td>재밌어요</td>
                    {iCounts.map((item)=>
                        <td>{item.toString()}</td>
                    )}
                </tr>
                <tr>
                <td>어려워요</td>
                    {hCounts.map((item)=>
                        <td>{item.toString()}</td>
                    )}
                </tr>
           </table>
            {questions.map((item,i)=>
                <p>{item.content}</p>
            )}

        </div>
    )
}

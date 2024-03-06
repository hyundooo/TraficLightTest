'use client'

export default function Feedback(){
    const handleClick = async (type) => {
        console.log('dd')
        await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            time: new Date().toISOString(),//new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }), // 현재 시간
            msg: type, // 'interesting' 또는 'hard'
          }),
        });
    }
    return(

        <div>
            <button onClick={() => handleClick('interesting')}><img src="/interesting.png"/></button>
            <button onClick={() => handleClick('hard')}><img src="/hard.png"/></button>
            <h4>질문하기</h4>
            <form action="/api/comment/newquestion" method="POST">
                <input name="content" placeholder="질문을 작성해 주세요"/>
                <button type="submit"> 제출하기 </button>
            </form>
        </div>
    )
}
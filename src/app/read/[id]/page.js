




export default async function Read({params}){
    /*
    const {id} = await params;
    const resp = await fetch(`http://localhost:9999/topics/${id}`);
    const topic = await resp.json();
  


    return(
        <>
            <h2>{topic.title}</h2>
            {topic.body}
            
        </>
    )
        */
     try {
        const {id} = await params;
        
        const resp = await fetch(`http://localhost:9999/topics/${id}`);
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        
        const topic = await resp.json();
        
        return (
            <>
                <h2>{topic.title}</h2>
                {topic.body}
            </>
        );
    }
     catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        return <div>오류가 발생했습니다.</div>;
    }
   
}

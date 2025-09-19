




export default async function Read({params}){
    const {id} = await params; //params를 먼저 await로 풀어주기
    const resp = await fetch(`http://localhost:9999/topics/${id}`);
    const topic = await resp.json();
  
  


    return(
        <>
            <h2>{topic.title}</h2>
            {topic.body}
            
        </>
    )
}

"use client"

import { useRouter } from "next/navigation";

export default function Create(){
    const router = useRouter();
    return(
        <form onSubmit={async (e)=>{
            e.preventDefault();

            const title = e.target.title.value;
            const body = e.target.body.value;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, body})
            }

            // fetch 요청이 완료될 때까지 기다립니다.
            const resp = await fetch('http://localhost:9999/topics', options);
            const result = await resp.json();
            
            console.log(result);
            const lastid = result.id;
            
            // 데이터가 완전히 생성된 것을 확인한 후 캐시를 수동으로 재검증합니다.
            // ✅ API Route를 호출하여 서버 컴포넌트의 캐시를 무효화합니다.
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: '/' })
            });

            // ✅ 이제 페이지를 이동하여 최신 데이터를 가져옵니다.
            router.push(`/read/${lastid}`);
        }}>
        <p>
            <input type="text" name="title" placeholder="title"/>
        </p>
        <p>
            <textarea name="body" placeholder="body"/>
        </p>
        <p>
            <input type="submit" value="create"/>
        </p>
        </form>
    )
}

//고양이 리스트를 불러오는 API
//async await문법을 활용하여 가독성을 높였다.
//onClick해서 넘어온 nodeId를 받아 API를 호출

const API_ENDPOINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async(nodeId) => {
    try {
        const result = await fetch(`${API_ENDPOINT}/${nodeId ? nodeId : ""}`);

        if(result.status < 300) return result.json();
        else if (result.status < 400) throw new Error(`${result.status} : Redirection 애러!`)
        else if (result.status < 500) throw new Error(`${result.status} : Client 애러!`)
        else if (result.status < 600) throw new Error(`${result.status} : Server 애러!`)
    } catch(error){
        throw new Error(`${error.message}`)
    }
}

const api = {
    //Root 내용 전용 api
    fetchRoot(){
        return request();
    },
    //Directory 전용 api
    fetchDirectory(nodeId){
        return request(nodeId);
    }
}
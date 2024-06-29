import axios from "axios"

const baseUrl=""
export const ApiService= {
    async getData(url){
        const res = await axios({
            method:"GET",
            url:baseUrl+url
        })
    }
}

import axios from "axios"

type Publisher = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};
const axiosClient=axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_developerurl}&page=1&page_size=25`,
    headers:{
        Accept:'application/json'
    }
})
export async function getDevelopers(){
      let result:Publisher[]=await (await axiosClient.get('')).data.results;
      //console.log('result-->',result);
      return result;
}
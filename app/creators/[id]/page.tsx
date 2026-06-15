import axios from "axios";
import Image from "next/image";

const axiosClient=axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_creatordetailurl}`,
      headers:{
        Accept:'application/json'
      }
})
type position={
    id:number,
    name:string,
    slug:string
}
type Creator={
    id:number,
    name:string,
    image:string,
    image_background:string,
    description:string
    positions:position[]
}
export default async function GetCreatorDetails({params}:{
  params:Promise<{id:string}>;
}){
    let {id}=await params;
    const creatorId=parseInt(id);
    const creator:Creator=(await axiosClient.get(`/${creatorId}?key=${process.env.NEXT_PUBLIC_api_key}`)).data;
    
    return(
          <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-80 w-full">
            <Image
              src={creator.image}
              alt={creator.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{creator.name}</h1>

            {/* Positions */}
            <div className="flex flex-wrap gap-3 mb-6">
              {creator.positions.map((position) => (
                <span
                  key={position.id}
                  className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium capitalize"
                >
                  {position.name}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none text-gray-300">
              <div
                dangerouslySetInnerHTML={{
                  __html: creator.description,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    
}
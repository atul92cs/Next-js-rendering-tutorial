import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const axiosClient=axios.create({
      baseURL:`${process.env.NEXT_PUBLIC_baseurl}&pages=1&page_size=21`,
      headers:{
        Accept:'application/json'
      }
});

 type game={
    id:number,
    name:string,
    released:string,
    tba:boolean,
    background_image:string,
    rating:number
}

export default async function Home() {
  const Games:game[]=(await axiosClient.get('')).data.results;
  
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-5 px-5">
  {Games.map((game) => (
    <div
      key={game.id}
      className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      <img
        src={game.background_image}
        alt={game.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800">
         Name:- {game.name}
        </h2>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Released:</span>{" "}
            {game.released}
          </p>

          <p>
            <span className="font-semibold">TBA:</span>{" "}
           {game.tba ? "Yes" : "No"}
          </p>

          <p>
            <span className="font-semibold">Rating:</span>{" "}
           ⭐ {game.rating}
          </p>
          <p>
            <Link href={`/game/${game.id}`}>More Info</Link>
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
  );
}

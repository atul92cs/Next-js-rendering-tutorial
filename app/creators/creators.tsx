import axios from "axios";
import Image from "next/image";
import Link from "next/link";
const axiosClient=axios.create({
      baseURL:`${process.env.NEXT_PUBLIC_creatorurl}&pages=1&page_size=21`,
      headers:{
        Accept:'application/json'
      }
});
type position={
    id:number,
    name:string,
    slug:string
}

type game={
    id:number,
    name:string,
    slug:string,
    added:number
}

type creator={
    id:number,
    name:string,
    image:string,
    games_count:number,
    positions:position[],
    games:game[]
}

export default async function Creators(){
    const creators:creator[]=(await axiosClient.get('')).data.results;
    
    return(
        <>
        <div className="min-h-screen bg-slate-950 p-6">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Game Creators
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="overflow-hidden rounded-xl bg-slate-900 border border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500"
          >
            {/* Creator Image */}
            <div className="relative h-56 w-full">
              <Image
                src={creator.image}
                alt={creator.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="truncate text-lg font-bold text-white">
                {creator.name}
              </h2>

              {/* Roles */}
              <div className="mt-2 flex flex-wrap gap-1">
                {creator.positions.map((position) => (
                  <span
                    key={position.id}
                    className="rounded-full bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300"
                  >
                    {position.name}
                  </span>
                ))}
              </div>

              {/* Games Count */}
              <div className="mt-3">
                <p className="text-xs text-slate-400">
                  Games Worked On
                </p>

                <p className="text-xl font-bold text-white">
                  {creator.games_count}
                </p>
              </div>

              {/* Popular Games */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold text-slate-300">
                  Popular Games
                </p>

                <div className="space-y-1">
                  {creator.games.slice(0, 3).map((game) => (
                    <div
                      key={game.id}
                      className="truncate text-sm text-slate-400"
                    >
                      🎮 {game.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          <div className="px-5 mb-2">
            <Link href={`/creators/${creator.id}`}>MoreInfo</Link>
          </div>
          </div>
          
        ))}
      </div>
    </div>

        </>
    );

}

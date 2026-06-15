
import axios from "axios";
import Image from "next/image";
import { use } from "react";
import { Suspense } from "react";
type platform={
  platform:number,
  name:string,
  slug:string
}
 type metacriticPlatform={
  metascore:number,
  url:string,
  platform:platform

 }
 type GameDetails={
    id:number,
    name:string,
    website:string,
    rating:number,
    description_raw:string,
    metacritic:number,
    background_image:string,
    metacritic_platforms:metacriticPlatform[]
    released:string,
    rating_top:number
    alternative_names:string[]
}

const axiosClient=axios.create({
      baseURL:`${process.env.NEXT_PUBLIC_detailurl}`,
      headers:{
        Accept:'application/json'
      }
});

export default async function gameDetails({params}:{
  params:Promise<{id:string}>;
}){
  let {id}=await params;
  const  gameid=parseInt(id);
  const Game:GameDetails=(await axiosClient.get(`/${gameid}?key=${process.env.NEXT_PUBLIC_api_key}`)).data;
  
  return(
    <Suspense fallback={<div>Loading...</div>}>
     <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src={Game.background_image}
          alt={Game.name}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/70 to-black/30" />

        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl font-bold">{Game.name}</h1>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold">
              ⭐ Rating: {Game.rating}
            </span>

            <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold">
              🎯 Metacritic: {Game.metacritic}
            </span>

            <span className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold">
              📅 {Game.released}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="rounded-2xl bg-gray-900 p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold">
                About the Game
              </h2>

              <p className="leading-8 text-gray-300">
                {Game.description_raw}
              </p>
            </div>

            {/* Alternative Names */}
            {Game.alternative_names.length > 0 && (
              <div className="rounded-2xl bg-gray-900 p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold">
                  Alternative Names
                </h2>

                <div className="flex flex-wrap gap-3">
                  {Game.alternative_names.map((name, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-800 px-4 py-2 text-sm"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Platforms */}
            <div className="rounded-2xl bg-gray-900 p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold">
                Metacritic Scores
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {Game.metacritic_platforms.map((item) => (
                  <a
                    key={item.platform.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-800 p-4 transition hover:border-green-500 hover:bg-gray-700"
                  >
                    <div>
                      <p className="font-semibold">
                        {item.platform.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {item.platform.slug}
                      </p>
                    </div>

                    <div
                      className={`rounded-lg px-3 py-2 font-bold ${
                        item.metascore >= 80
                          ? "bg-green-600"
                          : item.metascore >= 60
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.metascore}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-gray-900 p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">
                Game Stats
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Game ID</p>
                  <p>{Game.id}</p>
                </div>

                <div>
                  <p className="text-gray-400">User Rating</p>
                  <p>
                    {Game.rating} / {Game.rating_top}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Metacritic</p>
                  <p>{Game.metacritic}</p>
                </div>

                <div>
                  <p className="text-gray-400">Release Date</p>
                  <p>{Game.released}</p>
                </div>
              </div>
            </div>

            {Game.website && (
              <div className="rounded-2xl bg-gray-900 p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                  Official Website
                </h2>

                <a
                  href={Game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold transition hover:bg-indigo-700"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  )
}

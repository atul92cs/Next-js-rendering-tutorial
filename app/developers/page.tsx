'use client'
import { getDevelopers } from "./_utils/developer-service";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Developers(){
  type Publisher = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};  
const [devs, setDevs] = useState<Publisher[]>([]);
useEffect(()=>{
    async function loadDevelopers() {
      const data = await getDevelopers();
      setDevs(data);
    }

    loadDevelopers();
},[]);

    return(
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Game Publishers</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {devs.map((dev) => (
          <div
            key={dev.id}
            className="overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-52 w-full">
              <Image
                src={dev.image_background}
                alt={dev.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 25vw"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-white mb-2">
                {dev.name}
              </h2>

              <p className="text-sm text-zinc-400 mb-3">
                Slug: {dev.slug}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-zinc-300 text-sm">
                  Games Published
                </span>

                <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                  {dev.games_count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )
}
'use client';
import getGraveyard from '@/getGraveyard';
import { useQuery } from '@tanstack/react-query';

export default function Graveyard() {
  const { data: flippies } = useQuery({
    queryKey: ['graveyard'],
    queryFn: getGraveyard,
  });

  if (!flippies) return null;

  const conjugation = flippies?.length === 1 ? 'at' : 'ant';

  return (
    <div className="flex flex-col space-y-4 items-center">
      <h1>Requiesc{conjugation} in pace</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        {flippies.map((flippy) => (
          <div
            key={flippy.tokenId}
            className="rounded-lg flex flex-col items-center overflow-hidden bg-neutral-700"
          >
            <img
              src={flippy.image.pngUrl}
              alt={`Our dearly departed ${flippy.name}`}
              className="h-[16rem] w-[16rem]"
            />
            <span className="py-2">{flippy.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

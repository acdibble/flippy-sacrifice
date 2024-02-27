'use client';
import Rain from '@/Rain';
import getGraveyard from '@/getGraveyard';
import { useQuery } from '@tanstack/react-query';

const dob = new Date('Oct-25-2021 09:12:21 UTC');

export default function Graveyard() {
  const { data: flippies } = useQuery({
    queryKey: ['graveyard'],
    queryFn: getGraveyard,
  });

  if (!flippies) return null;

  const conjugation = flippies?.length === 1 ? '' : 'n';

  return (
    <div className="flex flex-col space-y-4 items-center">
      <Rain />
      <h1>Requiesca{conjugation}t in pace</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        {flippies
          .slice()
          .reverse()
          .map((flippy) => {
            const timestamp = flippy.acquiredAt?.blockTimestamp;

            return (
              <div
                key={flippy.tokenId}
                className="rounded-lg flex flex-col items-center overflow-hidden bg-neutral-700"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flippy.image.pngUrl}
                  alt={`Our dearly departed ${flippy.name}`}
                  className="h-[16rem] w-[16rem]"
                />
                <div className="flex flex-col gap-y-2 py-2 items-center">
                  <span className="text-white text-xl font-bold">{flippy.name}</span>
                  {timestamp && (
                    <span>
                      {dob.toLocaleDateString()} - {new Date(timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

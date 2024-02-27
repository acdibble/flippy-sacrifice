'use client';
import { useEffect, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { toast } from 'sonner';
import { FLIPPY_NFT_CONTRACT, STATE_CHAIN_GATEWAY } from '@/consts';

const abi = [
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export default function Home() {
  const account = useAccount();
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const { writeContract, error } = useWriteContract();

  useEffect(() => {
    if (checked) {
      window.open('https://youtu.be/O-fyNgHdmLI?si=EA5spTjUxqp-WnMU&t=20', '_blank');
    }
  }, [checked]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center">
      {account.isConnected ? (
        <div className="text-xl bg-neutral-900 py-2 px-3 rounded-lg flex flex-col gap-y-2">
          <div className="flex items-center gap-x-4 justify-center">
            <input
              type="checkbox"
              id="mood"
              checked={checked}
              onChange={() => {
                setChecked(true);
              }}
            />
            <label htmlFor="mood" className="text-center">
              Set the mood
            </label>
          </div>
          <form
            className="flex flex-col gap-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              writeContract({
                address: FLIPPY_NFT_CONTRACT,
                functionName: 'transferFrom',
                abi,
                args: [account.address, STATE_CHAIN_GATEWAY, input],
              });
            }}
          >
            <input
              placeholder="Enter your Flippy #"
              className="bg-neutral-800 rounded-lg px-2"
              pattern="[0-9]*"
              value={input}
              onChange={(e) => {
                try {
                  setInput(BigInt(e.target.value).toString());
                } catch {}
              }}
            ></input>
            <button
              type="submit"
              className="bg-neutral-800 rounded-lg transition hover:bg-red-700 hover:text-red-100"
            >
              Sacrifice
            </button>
          </form>
        </div>
      ) : (
        <>Connect your wallet to start sacrificing</>
      )}
    </div>
  );
}

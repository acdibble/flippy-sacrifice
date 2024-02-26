'use client';
import { getContract } from 'viem';
import { useEffect, useMemo, useState } from 'react';
import { useAccount, useWalletClient, useWriteContract } from 'wagmi';
import { toast } from 'sonner';

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
  const { writeContract, error, data } = useWriteContract();

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
              onClick={() => {
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
                address: '0x68D5d4ff0274dD95760E300ef16b81C5eED09842', // flippy nft
                functionName: 'transferFrom',
                abi,
                args: [
                  account.address,
                  '0x6995Ab7c4D7F4B03f467Cf4c8E920427d9621DBd', // sc gateway
                  input,
                ],
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

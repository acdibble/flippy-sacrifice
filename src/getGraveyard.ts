import { FLIPPY_NFT_CONTRACT, STATE_CHAIN_GATEWAY } from '@/consts';
import { Network, Alchemy, NftOrdering } from 'alchemy-sdk';

export default async function getGraveyard() {
  const alchemy = new Alchemy({
    network: Network.ETH_MAINNET,
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  });

  const res = await alchemy.nft.getNftsForOwner(STATE_CHAIN_GATEWAY, {
    contractAddresses: [FLIPPY_NFT_CONTRACT],
    orderBy: NftOrdering.TRANSFERTIME,
  });

  return res.ownedNfts;
}

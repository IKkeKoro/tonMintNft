import { Address, beginCell, toNano } from '@ton/core';
import { NftMint } from '../wrappers/NftMint';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { contractAddress } from './address';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();
    const nftMint = provider.open(NftMint.fromAddress(contractAddress));

    let data = await nftMint.getData();
    ui.clearActionPrompt();
    console.log('Collection address:', contractAddress)
    console.log('next index:',data.next_index.toString());
    console.log('owner: ',data.owner.toString());
    console.log('royalty to: ',data.royalty_destination.toString());
    console.log('royalty fee: ',data.royaltyFee.toString());
    console.log('____________________________________');
    console.log('maximum NFTs to mint: ',data.maxMint.toString());
    console.log('____________________________________');
    console.log('public sale price: ',data.publicPrice.toString());
    console.log('whitelist price: ',data.wlPrice.toString());
    console.log('____________________________________');
    console.log('public sale time: ',data.publicSaleTime.toString());
    console.log('whitelist sale time: ',data.wlSaleTime.toString());
    console.log('Time now:', Math.floor(Date.now() / 100))
}

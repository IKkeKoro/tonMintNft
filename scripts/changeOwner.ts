import { Address, beginCell, toNano } from '@ton/core';
import { NftMint } from '../wrappers/NftMint';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { contractAddress } from './address';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();
    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('New Owner address'));
     const nftMint = provider.open(NftMint.fromAddress(contractAddress));

     await nftMint.send(
        provider.sender(),
        {
            value:  toNano('0.01'),
        },
        {
            $$type: 'ChangeOwner',
            owner: address
        }
    );
}

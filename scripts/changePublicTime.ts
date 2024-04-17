import { Address, beginCell, toNano } from '@ton/core';
import { NftMint } from '../wrappers/NftMint';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { contractAddress } from './address';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = contractAddress;
    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }
    const publicTime = BigInt(100); // <-- time in seconds 
    const nftMint = provider.open(NftMint.fromAddress(address));
    await nftMint.send(
        provider.sender(),
        {
            value: toNano('0.01'),
        },
        {
            $$type: 'ChangePublicTime',
            publicSaleTime: publicTime
        }
    );

}

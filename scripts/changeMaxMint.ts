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
    const mintAmount = BigInt(4)
    const nftMint = provider.open(NftMint.fromAddress(address));
    let index = await nftMint.getNextIndex();
    let itemAddress = await nftMint.getGetNftAddressByIndex(index);

    await nftMint.send(
        provider.sender(),
        {
            value:  toNano('0.01'),
        },
        {
            $$type: 'ChangeMaxMint',
            maxMint: mintAmount
        }
    );

    ui.write('Waiting for counter to increase...');



    ui.clearActionPrompt();
    ui.write(itemAddress.toString());
}

import { Address, Dictionary, beginCell, toNano } from '@ton/core';
import { NftMint } from '../wrappers/NftMint';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { contractAddress } from './address';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = contractAddress;

    const seqno = BigInt('2233421')
    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }
    const nftMint = provider.open(NftMint.fromAddress(address));
    await nftMint.send(
        provider.sender(),
        {
            value:  toNano('0.01'),
        },
        {
            $$type: 'ChangeSeqno',
            seqno: seqno
        }
    );

}

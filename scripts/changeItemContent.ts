import { Address, beginCell, toNano } from '@ton/core';
import { NftMint } from '../wrappers/NftMint';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { contractAddress } from './address';
import { NftItem } from '../build/NftMint/tact_NftItem';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();
    const JSON = 'https://harlequin-neat-alligator-564.mypinata.cloud/ipfs/QmSSNUsQtpVsJQK1wRKhweD569VjQGDi5HE8THZKa7Hgr6' // <- put Json here
    const NFTaddress = Address.parse(args.length > 0 ? args[0] : await ui.input('NFT address'));
    if (!(await provider.isContractDeployed(NFTaddress))) {
        ui.write(`Error: Contract at address ${NFTaddress} is not deployed!`);
        return;
    }
    const nftItem = provider.open(NftItem.fromAddress(NFTaddress));
    await nftItem.send(
        provider.sender(),
        {
            value:  toNano('0.01'),
        },
        {
            $$type: 'ChangeContent',
            content: beginCell().storeInt(1,8).storeStringRefTail(JSON).endCell()
        }
    );

}

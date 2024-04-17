

import { Address, Cell, Dictionary, beginCell, toNano } from '@ton/core';
import { NftMint } from '../wrappers/NftMint';
import { NetworkProvider, sleep } from '@ton/blueprint';
import { contractAddress, seqno } from './address';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = contractAddress;

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const JSONs = [
        'https://raw.githubusercontent.com/optus-fi/nft/master/scripts/sbt-bug-collection/items/json/39.json',
        'https://harlequin-neat-alligator-564.mypinata.cloud/ipfs/QmSSNUsQtpVsJQK1wRKhweD569VjQGDi5HE8THZKa7Hgr6',
        'https://harlequin-neat-alligator-564.mypinata.cloud/ipfs/QmSSNUsQtpVsJQK1wRKhweD569VjQGDi5HE8THZKa7Hgr6'
    ]     // <- put Jsons here

    const contentMap = Dictionary.empty<bigint, Cell>();
    const amountOfNft = BigInt(JSONs.length)
    const nftDeployFee = toNano('0.05')
    JSONs.map((k,i) => {
        contentMap.set(BigInt(i),beginCell().storeInt(1,8).storeStringRefTail(k).endCell())
    }) 

    const nftMint = provider.open(NftMint.fromAddress(address));
    let index = await nftMint.getNextIndex();
    let itemAddress = await nftMint.getGetNftAddressByIndex(index);
    await nftMint.send(
        provider.sender(),
        {
            value: ((nftDeployFee + toNano('0.02')) * amountOfNft),
        },
        {
            $$type: 'BatchNftDeploy',
            index: index,
            amount: nftDeployFee,
            nftAmount: amountOfNft,
            owner: provider.sender().address!!,
            contents: contentMap,
            seqno: seqno
        }
    );

    ui.clearActionPrompt();
    ui.write(itemAddress.toString());
}

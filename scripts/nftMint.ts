import { Address, beginCell, toNano } from '@ton/core';
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
    const JSON = 'https://raw.githubusercontent.com/optus-fi/nft/master/scripts/sbt-bug-collection/items/json/39.json' // <- put Json here
    const nftMint = provider.open(NftMint.fromAddress(address));
    let data = await nftMint.getData();
    let wl = await nftMint.getWlAddress(provider.sender().address!!)
    let index = await nftMint.getNextIndex();
    let itemAddress = await nftMint.getGetNftAddressByIndex(index);
    let price = wl ? data.wlPrice : data.publicPrice
    await nftMint.send(
        provider.sender(),
        {
            value: price + toNano('0.07'),
        },
        {
            $$type: 'RequestNftDeploy',
            index: index,
            amount: toNano('0.05'),
            owner: provider.sender().address!!,
            content: beginCell().storeInt(1,8).storeStringRefTail(JSON).endCell(),
            seqno: seqno
        }
    );


    console.log('Nft address: ', await nftMint.getGetNftAddressByIndex(index))
}

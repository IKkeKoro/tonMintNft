import { Address, beginCell, toNano } from '@ton/core';
import { NftMint } from '../wrappers/NftMint';
import { NetworkProvider } from '@ton/blueprint';
import {seqno} from './address'

export async function run(provider: NetworkProvider) {
    const address = provider.sender().address!!
    const content = beginCell().storeInt(1,8).storeStringRefTail('https://raw.githubusercontent.com/optus-fi/nft/master/scripts/sbt-bug-collection/collection_mdata.json').endCell()

    const numerator = BigInt(30)  //        30 / 1000 * 100% = 3.0% royalty fee
    const denominator = BigInt(1000); //    30 / 1000 * 100% = 3.0% royalty fee

    const wlPrice = toNano('0.2'); 
    const publicPrice = toNano('0.3')

    const publicSaleTime =BigInt('5'); //seconds 
    const wlSaleTime = BigInt('10000');

    const maxMint = BigInt('5')

    const nftMint = provider.open(await NftMint.fromInit(address,content,address,numerator,denominator,publicPrice,wlPrice,publicSaleTime,wlSaleTime,maxMint,seqno));

    await nftMint.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(nftMint.address);

    let data = await nftMint.getData();

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

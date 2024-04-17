import "@stdlib/deploy";
import "./nft_item";

struct CollectionData {
    next_index: Int;
    content: Cell;
    owner: Address;
}

struct Data {
    next_index: Int;
    owner: Address;
    royalty_destination: Address;
    maxMint: Int as uint16;
    publicSaleTime: Int as uint256;
    wlSaleTime: Int as uint256;
    wlPrice: Int as coins;
    publicPrice: Int as coins;
    royaltyFee: Int as uint16;
}

contract NftMint with Deployable, NftRoyalty {
    owner: Address;
    next_index: Int as uint256 = 0;
    content: Cell;
    royalty_destination: Address;
    numerator: Int as uint16;
    denominator: Int as uint16;
    seqno: Int as uint256;


    maxMint: Int as uint16;

    publicSaleTime: Int as uint256;
    wlSaleTime: Int as uint256;

    wlPrice: Int as coins;
    publicPrice: Int as coins;

    mintedByWallet: map<Address, Int>;
    wlAddress: map<Address, Bool>;
//______________________________________________________//
    init
    (
        owner: Address, content: Cell, royalty_destination: Address, numerator: Int, denominator: Int,
        publicPrice: Int, wlPrice: Int, publicSaleTime: Int, wlSaleTime: Int, maxMint: Int,
        seqno: Int
    ) {
        self.owner = owner;
        self.content = content;
        self.royalty_destination = royalty_destination;
        self.numerator = numerator;
        self.denominator = denominator;
        self.seqno = seqno;
        self.mintedByWallet = emptyMap();
        self.wlAddress = emptyMap();
        self.maxMint = maxMint;

        self.publicSaleTime = now() + publicSaleTime;
        self.wlSaleTime = now() + wlSaleTime;

        self.publicPrice = publicPrice;
        self.wlPrice = wlPrice;
    }
//User__________________________________________________//
    receive(msg: RequestNftDeploy) {
        require(msg.seqno == self.seqno, "Invalid message");
        require(msg.index <= self.next_index, "Invalid Index");
        if(sender() != self.owner) {
            let wl: Bool = false;
            if (self.wlAddress.get(sender()) != null){
                wl = self.wlAddress.get(sender())!!;
            }
            let mintedAmount: Int = 0;
            if (self.mintedByWallet.get(sender()) != null){
                mintedAmount = self.mintedByWallet.get(sender())!!;
            }
            let nftPrice: Int = self.publicPrice;
            let startTime:   Int = self.publicSaleTime; 
            if(wl == true) {
                nftPrice = self.wlPrice;
                startTime   = self.wlSaleTime;
            }
            require(context().value >= nftPrice + min_balance, "wrong amount of tons");
            require(now() >= startTime, "You can't mint now");
            require(mintedAmount < self.maxMint, "You can't mint more");
            self.mintedByWallet.set(sender(), (mintedAmount + 1));


            send(SendParameters{
                to: self.owner,
                value: nftPrice,
                mode: SendPayGasSeparately
            });

        }


        let nft_init: StateInit = initOf NftItem(myAddress(), msg.index);
        let nft_address: Address = contractAddress(nft_init);
        send(SendParameters{
            to: nft_address,
            value: msg.amount,
            mode: SendPayGasSeparately,
            bounce: false,
            data: nft_init.data,
            code: nft_init.code,
            body: NftDeploy{
                index: msg.index,
                owner: msg.owner,
                editor: self.owner,
                content: msg.content,
                royalty_destination: self.royalty_destination,
                numerator: self.numerator,
                denominator: self.denominator
            }.toCell()
        });

        if(msg.index == self.next_index) {
            self.next_index = self.next_index + 1;
        }
    }

    receive(msg: BatchNftDeploy) {
        require(msg.seqno == self.seqno, "Invalid message");
        require(msg.index == self.next_index, "Invalid Index");
        if(sender() != self.owner) {
            let wl: Bool = false;
            if (self.wlAddress.get(sender()) != null){
                wl = self.wlAddress.get(sender())!!;
            }
            let mintedAmount: Int = 0;
            if (self.mintedByWallet.get(sender()) != null){
                mintedAmount = self.mintedByWallet.get(sender())!!;
            }
            let nftPrice: Int = self.publicPrice;
            let startTime:   Int = self.publicSaleTime; 
            if(wl == true) {
                nftPrice = self.wlPrice;
                startTime   = self.wlSaleTime;
            }
            require(context().value >= (nftPrice + min_balance) * msg.nftAmount, "wrong amount of tons");
            require(now() >= startTime, "You can't mint now");
            require(mintedAmount + msg.nftAmount <= self.maxMint, "You can't mint more");
            self.mintedByWallet.set(sender(), (mintedAmount + msg.nftAmount));

            send(SendParameters{
                to: self.owner,
                value: nftPrice * msg.nftAmount,
                mode: SendPayGasSeparately
            });

        }

        let nft_init: StateInit = initOf NftItem(myAddress(), msg.index);
        let nft_address: Address = contractAddress(nft_init);
        let counter: Int = 0;
        repeat(msg.nftAmount){
            nft_init = initOf NftItem(myAddress(), msg.index + counter);
            nft_address = contractAddress(nft_init);
            send(SendParameters{
                to: nft_address,
                value: msg.amount,
                mode: SendPayGasSeparately,
                bounce: false,
                data: nft_init.data,
                code: nft_init.code,
                body: NftDeploy{
                    index: msg.index + counter,
                    owner: msg.owner,
                    editor: self.owner,
                    content: msg.contents.get(counter)!!,
                    royalty_destination: self.royalty_destination,
                    numerator: self.numerator,
                    denominator: self.denominator
                }.toCell()
            });
            counter += 1;   
        }

        self.next_index = self.next_index + msg.nftAmount;
    }    
//Owner_________________________________________________//
    receive(msg: ChangeOwner) {
        require(self.owner == sender(), "Invalid sender");
        self.owner = msg.owner;
    }

    receive(msg: ChangeWlPrice) {
        require(self.owner == sender(), "Invalid sender");
        self.wlPrice = msg.wlPrice;
    }

    receive(msg: ChangeMaxMint) {
        require(self.owner == sender(), "Invalid sender");
        self.maxMint = msg.maxMint;
    }

    receive(msg: ChangePublicPrice) {
        require(self.owner == sender(), "Invalid sender");
        self.publicPrice = msg.publicPrice;
    }

    receive(msg: ChangeWlTime) {
        require(self.owner == sender(), "Invalid sender");
        self.wlSaleTime = now() + msg.wlSaleTime;
    }

    receive(msg: ChangePublicTime) {
        require(self.owner == sender(), "Invalid sender");
        self.publicSaleTime = msg.publicSaleTime;
    }

    receive(msg: ChangeWl) {
        require(self.owner == sender(), "Invalid sender");
        self.wlAddress.set(msg.wallet, msg.bool);
    }

    receive(msg: ChangeSeqno) {
        require(self.owner == sender(), "Invalid sender");
        self.seqno = msg.seqno;
    }
//View__________________________________________________//
    get fun get_collection_data(): CollectionData {
        return CollectionData{next_index: self.next_index, content: self.content, owner: self.owner};
    }

    get fun data(): Data {
        let royaltyFee: Int = self.numerator * 100 / self.denominator;
        return Data {
            next_index: self.next_index,
            owner: self.owner,
            royalty_destination: self.royalty_destination,
            maxMint: self.maxMint,
            publicSaleTime: self.publicSaleTime,
            wlSaleTime: self.wlSaleTime,
            wlPrice: self.wlPrice,
            publicPrice: self.publicPrice,
            royaltyFee: royaltyFee
        };
    }

    get fun get_nft_address_by_index(index: Int): Address {
        return contractAddress(initOf NftItem(myAddress(), index));
    }
    get fun get_nft_content(index: Int, individual_content: Cell): Cell { 
        let b: StringBuilder = beginString();
        let ic: String = individual_content.asSlice().asString();
        b.append(ic);
        return b.toCell();
    }

    get fun wlPrice(): Int {
        return self.wlPrice;
    }

    get fun publicPrice(): Int {
        return self.publicPrice;
    }

    get fun wlSaleTime(): Int {
        return self.wlSaleTime;
    }

    get fun publicSaleTime(): Int {
        return self.publicSaleTime;
    }

    get fun nextIndex(): Int {
        return self.next_index;
    }

    get fun owner(): Address {
        return self.owner;
    }

    get fun wlAddress(wallet: Address): Bool {
        if(self.wlAddress.get(wallet) != null){
            if(self.wlAddress.get(wallet)!!){
                return true;
            }
        }
        return false;
    }

    get fun canMint(wallet: Address): Bool {
        let time: Int = self.publicSaleTime;
        if(self.mintedByWallet.get(wallet) != null){
            if(self.mintedByWallet.get(wallet)!! >= self.maxMint) {
                return false;
            }
        }
        if(self.wlAddress.get(wallet) != null){
            if(self.wlAddress.get(wallet)!!){
                time = self.wlSaleTime;
            }
        }
        if (now() >= time){
            return true;
        } 
        return false;
    }
}
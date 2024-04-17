message(0x5fcc3d14) NftTransfer {
    query_id: Int as uint64;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message(0x05138d91) NftOwnershipAssigned {
    query_id: Int as uint64;
    prev_owner: Address;
    forward_payload: Slice as remaining;
}

message(0x6f89f5e3) NftExcesses {
    query_id: Int as uint64;
}

message(0x2fcb26a2) NftGetStaticData {
    query_id: Int as uint64;
}

message(0x8b771735) NftReportStaticData {
    query_id: Int as uint64;
    index: Int as uint256;
    collection: Address;
}

message(0x693d3950) NftGetRoyaltyParams {
    query_id: Int as uint64;
}

message(0xa8cb00ad) NftReportRoyaltyParams {
    query_id: Int as uint64;
    numerator: Int as uint16;
    denominator: Int as uint16;
    destination: Address;
}

message(0x1f04537a) NftDestroy {
    query_id: Int as uint64;
}

message NftDeploy {
    index: Int as uint256;
    owner: Address;
    editor: Address;
    content: Cell;
    royalty_destination: Address;
    numerator: Int as uint16;
    denominator: Int as uint16;
}

message RequestNftDeploy {
    index: Int as uint256;
    amount: Int as coins;
    owner: Address;
    content: Cell;
    seqno: Int as uint256;
}

message BatchNftDeploy {
    index: Int as uint256;
    amount: Int as coins;
    owner: Address;
    nftAmount: Int as uint16;
    seqno: Int as uint256;
    contents: map<Int,Cell>;
}

message ChangeOwner {
    owner: Address;
}

message ChangeWlPrice {
    wlPrice: Int as coins;
}

message ChangePublicPrice {
    publicPrice: Int as coins;
}

message ChangeWlTime {
    wlSaleTime: Int;
}

message ChangePublicTime {
    publicSaleTime: Int;
}

message ChangeWl{
    wallet: Address;
    bool: Bool;
}

message ChangeEditor {
    editor: Address;
}

message ChangeContent{
    content: Cell;
}

message ChangeMaxMint{
    maxMint: Int as uint16;
}
message ChangeSeqno{
    seqno: Int as uint256;
}



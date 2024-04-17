# TACT Compilation Report
Contract: NftCollection
BOC Size: 2534 bytes

# Types
Total Types: 28

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## NftData
TLB: `_ deployed:bool index:int257 collection:address owner:address content:^cell = NftData`
Signature: `NftData{deployed:bool,index:int257,collection:address,owner:address,content:^cell}`

## NftRoyaltyParams
TLB: `_ numerator:int257 denominator:int257 royalty_destination:address = NftRoyaltyParams`
Signature: `NftRoyaltyParams{numerator:int257,denominator:int257,royalty_destination:address}`

## NftTransfer
TLB: `nft_transfer#5fcc3d14 query_id:uint64 new_owner:address response_destination:address custom_payload:Maybe ^cell forward_amount:coins forward_payload:remainder<slice> = NftTransfer`
Signature: `NftTransfer{query_id:uint64,new_owner:address,response_destination:address,custom_payload:Maybe ^cell,forward_amount:coins,forward_payload:remainder<slice>}`

## NftOwnershipAssigned
TLB: `nft_ownership_assigned#05138d91 query_id:uint64 prev_owner:address forward_payload:remainder<slice> = NftOwnershipAssigned`
Signature: `NftOwnershipAssigned{query_id:uint64,prev_owner:address,forward_payload:remainder<slice>}`

## NftExcesses
TLB: `nft_excesses#6f89f5e3 query_id:uint64 = NftExcesses`
Signature: `NftExcesses{query_id:uint64}`

## NftGetStaticData
TLB: `nft_get_static_data#2fcb26a2 query_id:uint64 = NftGetStaticData`
Signature: `NftGetStaticData{query_id:uint64}`

## NftReportStaticData
TLB: `nft_report_static_data#8b771735 query_id:uint64 index:uint256 collection:address = NftReportStaticData`
Signature: `NftReportStaticData{query_id:uint64,index:uint256,collection:address}`

## NftGetRoyaltyParams
TLB: `nft_get_royalty_params#693d3950 query_id:uint64 = NftGetRoyaltyParams`
Signature: `NftGetRoyaltyParams{query_id:uint64}`

## NftReportRoyaltyParams
TLB: `nft_report_royalty_params#a8cb00ad query_id:uint64 numerator:uint16 denominator:uint16 destination:address = NftReportRoyaltyParams`
Signature: `NftReportRoyaltyParams{query_id:uint64,numerator:uint16,denominator:uint16,destination:address}`

## NftDestroy
TLB: `nft_destroy#1f04537a query_id:uint64 = NftDestroy`
Signature: `NftDestroy{query_id:uint64}`

## NftDeploy
TLB: `nft_deploy#585963b5 index:uint256 owner:address editor:address content:^cell royalty_destination:address numerator:uint16 denominator:uint16 = NftDeploy`
Signature: `NftDeploy{index:uint256,owner:address,editor:address,content:^cell,royalty_destination:address,numerator:uint16,denominator:uint16}`

## RequestNftDeploy
TLB: `request_nft_deploy#6e439a3d index:uint256 amount:coins owner:address content:^cell seqno:uint256 = RequestNftDeploy`
Signature: `RequestNftDeploy{index:uint256,amount:coins,owner:address,content:^cell,seqno:uint256}`

## ChangeOwner
TLB: `change_owner#85a24005 owner:address = ChangeOwner`
Signature: `ChangeOwner{owner:address}`

## ChangeWlPrice
TLB: `change_wl_price#db59e2fe wlPrice:coins = ChangeWlPrice`
Signature: `ChangeWlPrice{wlPrice:coins}`

## ChangePublicPrice
TLB: `change_public_price#887e4e5a publicPrice:coins = ChangePublicPrice`
Signature: `ChangePublicPrice{publicPrice:coins}`

## ChangeWlTime
TLB: `change_wl_time#dd951cda wlSaleTime:int257 = ChangeWlTime`
Signature: `ChangeWlTime{wlSaleTime:int257}`

## ChangePublicTime
TLB: `change_public_time#8a77cb50 publicSaleTime:int257 = ChangePublicTime`
Signature: `ChangePublicTime{publicSaleTime:int257}`

## ChangeWl
TLB: `change_wl#b19a1a03 wallet:address bool:bool = ChangeWl`
Signature: `ChangeWl{wallet:address,bool:bool}`

## ChangeEditor
TLB: `change_editor#b1aa563e editor:address = ChangeEditor`
Signature: `ChangeEditor{editor:address}`

## ChangeContent
TLB: `change_content#b5289a58 content:^cell = ChangeContent`
Signature: `ChangeContent{content:^cell}`

## ChangeMaxMint
TLB: `change_max_mint#58bcf30b maxMint:uint16 = ChangeMaxMint`
Signature: `ChangeMaxMint{maxMint:uint16}`

## CollectionData
TLB: `_ next_index:int257 content:^cell owner:address = CollectionData`
Signature: `CollectionData{next_index:int257,content:^cell,owner:address}`

# Get Methods
Total Get Methods: 10

## get_collection_data

## get_nft_address_by_index
Argument: index

## get_nft_content
Argument: index
Argument: individual_content

## wlPrice

## publicPrice

## wlSaleTime

## publicSaleTime

## owner

## wlAddress
Argument: wallet

## royalty_params

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
4429: Invalid sender
10047: You can't mint now
11850: Not Deployed
13257: Invalid message
22415: You can't mint more
23263: Invalid Sender
30404: Invalid Amount
42491: Invalid Owner
44083: Invalid Index
50324: Already Deployed
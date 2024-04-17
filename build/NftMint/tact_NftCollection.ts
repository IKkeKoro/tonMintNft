import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type NftData = {
    $$type: 'NftData';
    deployed: boolean;
    index: bigint;
    collection: Address;
    owner: Address;
    content: Cell;
}

export function storeNftData(src: NftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.deployed);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadNftData(slice: Slice) {
    let sc_0 = slice;
    let _deployed = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function loadTupleNftData(source: TupleReader) {
    let _deployed = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function storeTupleNftData(source: NftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.deployed);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserNftData(): DictionaryValue<NftData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftData(src)).endCell());
        },
        parse: (src) => {
            return loadNftData(src.loadRef().beginParse());
        }
    }
}

export type NftRoyaltyParams = {
    $$type: 'NftRoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    royalty_destination: Address;
}

export function storeNftRoyaltyParams(src: NftRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.royalty_destination);
    };
}

export function loadNftRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _royalty_destination = sc_0.loadAddress();
    return { $$type: 'NftRoyaltyParams' as const, numerator: _numerator, denominator: _denominator, royalty_destination: _royalty_destination };
}

function loadTupleNftRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _royalty_destination = source.readAddress();
    return { $$type: 'NftRoyaltyParams' as const, numerator: _numerator, denominator: _denominator, royalty_destination: _royalty_destination };
}

function storeTupleNftRoyaltyParams(source: NftRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.royalty_destination);
    return builder.build();
}

function dictValueParserNftRoyaltyParams(): DictionaryValue<NftRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftTransfer = {
    $$type: 'NftTransfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeNftTransfer(src: NftTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadNftTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleNftTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleNftTransfer(source: NftTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserNftTransfer(): DictionaryValue<NftTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadNftTransfer(src.loadRef().beginParse());
        }
    }
}

export type NftOwnershipAssigned = {
    $$type: 'NftOwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
}

export function storeNftOwnershipAssigned(src: NftOwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadNftOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleNftOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleNftOwnershipAssigned(source: NftOwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserNftOwnershipAssigned(): DictionaryValue<NftOwnershipAssigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadNftOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type NftExcesses = {
    $$type: 'NftExcesses';
    query_id: bigint;
}

export function storeNftExcesses(src: NftExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1871312355, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1871312355) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function loadTupleNftExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function storeTupleNftExcesses(source: NftExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftExcesses(): DictionaryValue<NftExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadNftExcesses(src.loadRef().beginParse());
        }
    }
}

export type NftGetStaticData = {
    $$type: 'NftGetStaticData';
    query_id: bigint;
}

export function storeNftGetStaticData(src: NftGetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function loadTupleNftGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function storeTupleNftGetStaticData(source: NftGetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftGetStaticData(): DictionaryValue<NftGetStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadNftGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type NftReportStaticData = {
    $$type: 'NftReportStaticData';
    query_id: bigint;
    index: bigint;
    collection: Address;
}

export function storeNftReportStaticData(src: NftReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collection);
    };
}

export function loadNftReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index = sc_0.loadUintBig(256);
    let _collection = sc_0.loadAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function loadTupleNftReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function storeTupleNftReportStaticData(source: NftReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserNftReportStaticData(): DictionaryValue<NftReportStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadNftReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type NftGetRoyaltyParams = {
    $$type: 'NftGetRoyaltyParams';
    query_id: bigint;
}

export function storeNftGetRoyaltyParams(src: NftGetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleNftGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleNftGetRoyaltyParams(source: NftGetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftGetRoyaltyParams(): DictionaryValue<NftGetRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftReportRoyaltyParams = {
    $$type: 'NftReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeNftReportRoyaltyParams(src: NftReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadNftReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleNftReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleNftReportRoyaltyParams(source: NftReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserNftReportRoyaltyParams(): DictionaryValue<NftReportRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftDestroy = {
    $$type: 'NftDestroy';
    query_id: bigint;
}

export function storeNftDestroy(src: NftDestroy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(520377210, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftDestroy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 520377210) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function loadTupleNftDestroy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function storeTupleNftDestroy(source: NftDestroy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftDestroy(): DictionaryValue<NftDestroy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftDestroy(src)).endCell());
        },
        parse: (src) => {
            return loadNftDestroy(src.loadRef().beginParse());
        }
    }
}

export type NftDeploy = {
    $$type: 'NftDeploy';
    index: bigint;
    owner: Address;
    editor: Address;
    content: Cell;
    royalty_destination: Address;
    numerator: bigint;
    denominator: bigint;
}

export function storeNftDeploy(src: NftDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1482253237, 32);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.editor);
        b_0.storeRef(src.content);
        let b_1 = new Builder();
        b_1.storeAddress(src.royalty_destination);
        b_1.storeUint(src.numerator, 16);
        b_1.storeUint(src.denominator, 16);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadNftDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1482253237) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadUintBig(256);
    let _owner = sc_0.loadAddress();
    let _editor = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let sc_1 = sc_0.loadRef().beginParse();
    let _royalty_destination = sc_1.loadAddress();
    let _numerator = sc_1.loadUintBig(16);
    let _denominator = sc_1.loadUintBig(16);
    return { $$type: 'NftDeploy' as const, index: _index, owner: _owner, editor: _editor, content: _content, royalty_destination: _royalty_destination, numerator: _numerator, denominator: _denominator };
}

function loadTupleNftDeploy(source: TupleReader) {
    let _index = source.readBigNumber();
    let _owner = source.readAddress();
    let _editor = source.readAddress();
    let _content = source.readCell();
    let _royalty_destination = source.readAddress();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    return { $$type: 'NftDeploy' as const, index: _index, owner: _owner, editor: _editor, content: _content, royalty_destination: _royalty_destination, numerator: _numerator, denominator: _denominator };
}

function storeTupleNftDeploy(source: NftDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.editor);
    builder.writeCell(source.content);
    builder.writeAddress(source.royalty_destination);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    return builder.build();
}

function dictValueParserNftDeploy(): DictionaryValue<NftDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadNftDeploy(src.loadRef().beginParse());
        }
    }
}

export type RequestNftDeploy = {
    $$type: 'RequestNftDeploy';
    index: bigint;
    amount: bigint;
    owner: Address;
    content: Cell;
    seqno: bigint;
}

export function storeRequestNftDeploy(src: RequestNftDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1849924157, 32);
        b_0.storeUint(src.index, 256);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeUint(src.seqno, 256);
    };
}

export function loadRequestNftDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1849924157) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _seqno = sc_0.loadUintBig(256);
    return { $$type: 'RequestNftDeploy' as const, index: _index, amount: _amount, owner: _owner, content: _content, seqno: _seqno };
}

function loadTupleRequestNftDeploy(source: TupleReader) {
    let _index = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _seqno = source.readBigNumber();
    return { $$type: 'RequestNftDeploy' as const, index: _index, amount: _amount, owner: _owner, content: _content, seqno: _seqno };
}

function storeTupleRequestNftDeploy(source: RequestNftDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserRequestNftDeploy(): DictionaryValue<RequestNftDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRequestNftDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadRequestNftDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    owner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2242002949, 32);
        b_0.storeAddress(src.owner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2242002949) { throw Error('Invalid prefix'); }
    let _owner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, owner: _owner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _owner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, owner: _owner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeWlPrice = {
    $$type: 'ChangeWlPrice';
    wlPrice: bigint;
}

export function storeChangeWlPrice(src: ChangeWlPrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3680101118, 32);
        b_0.storeCoins(src.wlPrice);
    };
}

export function loadChangeWlPrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3680101118) { throw Error('Invalid prefix'); }
    let _wlPrice = sc_0.loadCoins();
    return { $$type: 'ChangeWlPrice' as const, wlPrice: _wlPrice };
}

function loadTupleChangeWlPrice(source: TupleReader) {
    let _wlPrice = source.readBigNumber();
    return { $$type: 'ChangeWlPrice' as const, wlPrice: _wlPrice };
}

function storeTupleChangeWlPrice(source: ChangeWlPrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.wlPrice);
    return builder.build();
}

function dictValueParserChangeWlPrice(): DictionaryValue<ChangeWlPrice> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeWlPrice(src)).endCell());
        },
        parse: (src) => {
            return loadChangeWlPrice(src.loadRef().beginParse());
        }
    }
}

export type ChangePublicPrice = {
    $$type: 'ChangePublicPrice';
    publicPrice: bigint;
}

export function storeChangePublicPrice(src: ChangePublicPrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2289978970, 32);
        b_0.storeCoins(src.publicPrice);
    };
}

export function loadChangePublicPrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2289978970) { throw Error('Invalid prefix'); }
    let _publicPrice = sc_0.loadCoins();
    return { $$type: 'ChangePublicPrice' as const, publicPrice: _publicPrice };
}

function loadTupleChangePublicPrice(source: TupleReader) {
    let _publicPrice = source.readBigNumber();
    return { $$type: 'ChangePublicPrice' as const, publicPrice: _publicPrice };
}

function storeTupleChangePublicPrice(source: ChangePublicPrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.publicPrice);
    return builder.build();
}

function dictValueParserChangePublicPrice(): DictionaryValue<ChangePublicPrice> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangePublicPrice(src)).endCell());
        },
        parse: (src) => {
            return loadChangePublicPrice(src.loadRef().beginParse());
        }
    }
}

export type ChangeWlTime = {
    $$type: 'ChangeWlTime';
    wlSaleTime: bigint;
}

export function storeChangeWlTime(src: ChangeWlTime) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3717536986, 32);
        b_0.storeInt(src.wlSaleTime, 257);
    };
}

export function loadChangeWlTime(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3717536986) { throw Error('Invalid prefix'); }
    let _wlSaleTime = sc_0.loadIntBig(257);
    return { $$type: 'ChangeWlTime' as const, wlSaleTime: _wlSaleTime };
}

function loadTupleChangeWlTime(source: TupleReader) {
    let _wlSaleTime = source.readBigNumber();
    return { $$type: 'ChangeWlTime' as const, wlSaleTime: _wlSaleTime };
}

function storeTupleChangeWlTime(source: ChangeWlTime) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.wlSaleTime);
    return builder.build();
}

function dictValueParserChangeWlTime(): DictionaryValue<ChangeWlTime> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeWlTime(src)).endCell());
        },
        parse: (src) => {
            return loadChangeWlTime(src.loadRef().beginParse());
        }
    }
}

export type ChangePublicTime = {
    $$type: 'ChangePublicTime';
    publicSaleTime: bigint;
}

export function storeChangePublicTime(src: ChangePublicTime) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2323106640, 32);
        b_0.storeInt(src.publicSaleTime, 257);
    };
}

export function loadChangePublicTime(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2323106640) { throw Error('Invalid prefix'); }
    let _publicSaleTime = sc_0.loadIntBig(257);
    return { $$type: 'ChangePublicTime' as const, publicSaleTime: _publicSaleTime };
}

function loadTupleChangePublicTime(source: TupleReader) {
    let _publicSaleTime = source.readBigNumber();
    return { $$type: 'ChangePublicTime' as const, publicSaleTime: _publicSaleTime };
}

function storeTupleChangePublicTime(source: ChangePublicTime) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.publicSaleTime);
    return builder.build();
}

function dictValueParserChangePublicTime(): DictionaryValue<ChangePublicTime> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangePublicTime(src)).endCell());
        },
        parse: (src) => {
            return loadChangePublicTime(src.loadRef().beginParse());
        }
    }
}

export type ChangeWl = {
    $$type: 'ChangeWl';
    wallet: Address;
    bool: boolean;
}

export function storeChangeWl(src: ChangeWl) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2979666435, 32);
        b_0.storeAddress(src.wallet);
        b_0.storeBit(src.bool);
    };
}

export function loadChangeWl(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2979666435) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    let _bool = sc_0.loadBit();
    return { $$type: 'ChangeWl' as const, wallet: _wallet, bool: _bool };
}

function loadTupleChangeWl(source: TupleReader) {
    let _wallet = source.readAddress();
    let _bool = source.readBoolean();
    return { $$type: 'ChangeWl' as const, wallet: _wallet, bool: _bool };
}

function storeTupleChangeWl(source: ChangeWl) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    builder.writeBoolean(source.bool);
    return builder.build();
}

function dictValueParserChangeWl(): DictionaryValue<ChangeWl> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeWl(src)).endCell());
        },
        parse: (src) => {
            return loadChangeWl(src.loadRef().beginParse());
        }
    }
}

export type ChangeEditor = {
    $$type: 'ChangeEditor';
    editor: Address;
}

export function storeChangeEditor(src: ChangeEditor) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2980730430, 32);
        b_0.storeAddress(src.editor);
    };
}

export function loadChangeEditor(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2980730430) { throw Error('Invalid prefix'); }
    let _editor = sc_0.loadAddress();
    return { $$type: 'ChangeEditor' as const, editor: _editor };
}

function loadTupleChangeEditor(source: TupleReader) {
    let _editor = source.readAddress();
    return { $$type: 'ChangeEditor' as const, editor: _editor };
}

function storeTupleChangeEditor(source: ChangeEditor) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.editor);
    return builder.build();
}

function dictValueParserChangeEditor(): DictionaryValue<ChangeEditor> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeEditor(src)).endCell());
        },
        parse: (src) => {
            return loadChangeEditor(src.loadRef().beginParse());
        }
    }
}

export type ChangeContent = {
    $$type: 'ChangeContent';
    content: Cell;
}

export function storeChangeContent(src: ChangeContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3039337048, 32);
        b_0.storeRef(src.content);
    };
}

export function loadChangeContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3039337048) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadRef();
    return { $$type: 'ChangeContent' as const, content: _content };
}

function loadTupleChangeContent(source: TupleReader) {
    let _content = source.readCell();
    return { $$type: 'ChangeContent' as const, content: _content };
}

function storeTupleChangeContent(source: ChangeContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserChangeContent(): DictionaryValue<ChangeContent> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeContent(src)).endCell());
        },
        parse: (src) => {
            return loadChangeContent(src.loadRef().beginParse());
        }
    }
}

export type ChangeMaxMint = {
    $$type: 'ChangeMaxMint';
    maxMint: bigint;
}

export function storeChangeMaxMint(src: ChangeMaxMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1488777995, 32);
        b_0.storeUint(src.maxMint, 16);
    };
}

export function loadChangeMaxMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1488777995) { throw Error('Invalid prefix'); }
    let _maxMint = sc_0.loadUintBig(16);
    return { $$type: 'ChangeMaxMint' as const, maxMint: _maxMint };
}

function loadTupleChangeMaxMint(source: TupleReader) {
    let _maxMint = source.readBigNumber();
    return { $$type: 'ChangeMaxMint' as const, maxMint: _maxMint };
}

function storeTupleChangeMaxMint(source: ChangeMaxMint) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.maxMint);
    return builder.build();
}

function dictValueParserChangeMaxMint(): DictionaryValue<ChangeMaxMint> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeMaxMint(src)).endCell());
        },
        parse: (src) => {
            return loadChangeMaxMint(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_index: bigint;
    content: Cell;
    owner: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_index, 257);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.owner);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_index = sc_0.loadIntBig(257);
    let _content = sc_0.loadRef();
    let _owner = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_index: _next_index, content: _content, owner: _owner };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_index = source.readBigNumber();
    let _content = source.readCell();
    let _owner = source.readAddress();
    return { $$type: 'CollectionData' as const, next_index: _next_index, content: _content, owner: _owner };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_index);
    builder.writeCell(source.content);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

 type NftCollection_init_args = {
    $$type: 'NftCollection_init_args';
    owner: Address;
    content: Cell;
    royalty_destination: Address;
    numerator: bigint;
    denominator: bigint;
    publicPrice: bigint;
    wlPrice: bigint;
    publicSaleTime: bigint;
    wlSaleTime: bigint;
    maxMint: bigint;
    seqno: bigint;
}

function initNftCollection_init_args(src: NftCollection_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.royalty_destination);
        b_0.storeInt(src.numerator, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.denominator, 257);
        b_1.storeInt(src.publicPrice, 257);
        b_1.storeInt(src.wlPrice, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.publicSaleTime, 257);
        b_2.storeInt(src.wlSaleTime, 257);
        b_2.storeInt(src.maxMint, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.seqno, 257);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function NftCollection_init(owner: Address, content: Cell, royalty_destination: Address, numerator: bigint, denominator: bigint, publicPrice: bigint, wlPrice: bigint, publicSaleTime: bigint, wlSaleTime: bigint, maxMint: bigint, seqno: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftCollection_init_args({ $$type: 'NftCollection_init_args', owner, content, royalty_destination, numerator, denominator, publicPrice, wlPrice, publicSaleTime, wlSaleTime, maxMint, seqno })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftCollection_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    10047: { message: `You can't mint now` },
    11850: { message: `Not Deployed` },
    13257: { message: `Invalid message` },
    22415: { message: `You can't mint more` },
    23263: { message: `Invalid Sender` },
    30404: { message: `Invalid Amount` },
    42491: { message: `Invalid Owner` },
    44083: { message: `Invalid Index` },
    50324: { message: `Already Deployed` },
}

const NftCollection_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftData","header":null,"fields":[{"name":"deployed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"NftRoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"royalty_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftTransfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"NftOwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"NftExcesses","header":1871312355,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftGetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftGetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftDestroy","header":520377210,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftDeploy","header":1482253237,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"editor","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"royalty_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"RequestNftDeploy","header":1849924157,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ChangeOwner","header":2242002949,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeWlPrice","header":3680101118,"fields":[{"name":"wlPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ChangePublicPrice","header":2289978970,"fields":[{"name":"publicPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ChangeWlTime","header":3717536986,"fields":[{"name":"wlSaleTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ChangePublicTime","header":2323106640,"fields":[{"name":"publicSaleTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ChangeWl","header":2979666435,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"bool","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ChangeEditor","header":2980730430,"fields":[{"name":"editor","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeContent","header":3039337048,"fields":[{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ChangeMaxMint","header":1488777995,"fields":[{"name":"maxMint","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const NftCollection_getters: ABIGetter[] = [
    {"name":"get_collection_data","arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_nft_address_by_index","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_nft_content","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"wlPrice","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"publicPrice","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"wlSaleTime","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"publicSaleTime","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"wlAddress","arguments":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"royalty_params","arguments":[],"returnType":{"kind":"simple","type":"NftRoyaltyParams","optional":false}},
]

const NftCollection_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"RequestNftDeploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeWlPrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeMaxMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangePublicPrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeWlTime"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangePublicTime"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeWl"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NftGetRoyaltyParams"}},
]

export class NftCollection implements Contract {
    
    static async init(owner: Address, content: Cell, royalty_destination: Address, numerator: bigint, denominator: bigint, publicPrice: bigint, wlPrice: bigint, publicSaleTime: bigint, wlSaleTime: bigint, maxMint: bigint, seqno: bigint) {
        return await NftCollection_init(owner, content, royalty_destination, numerator, denominator, publicPrice, wlPrice, publicSaleTime, wlSaleTime, maxMint, seqno);
    }
    
    static async fromInit(owner: Address, content: Cell, royalty_destination: Address, numerator: bigint, denominator: bigint, publicPrice: bigint, wlPrice: bigint, publicSaleTime: bigint, wlSaleTime: bigint, maxMint: bigint, seqno: bigint) {
        const init = await NftCollection_init(owner, content, royalty_destination, numerator, denominator, publicPrice, wlPrice, publicSaleTime, wlSaleTime, maxMint, seqno);
        const address = contractAddress(0, init);
        return new NftCollection(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftCollection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NftCollection_types,
        getters: NftCollection_getters,
        receivers: NftCollection_receivers,
        errors: NftCollection_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: RequestNftDeploy | ChangeOwner | ChangeWlPrice | ChangeMaxMint | ChangePublicPrice | ChangeWlTime | ChangePublicTime | ChangeWl | Deploy | NftGetRoyaltyParams) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RequestNftDeploy') {
            body = beginCell().store(storeRequestNftDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeWlPrice') {
            body = beginCell().store(storeChangeWlPrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeMaxMint') {
            body = beginCell().store(storeChangeMaxMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangePublicPrice') {
            body = beginCell().store(storeChangePublicPrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeWlTime') {
            body = beginCell().store(storeChangeWlTime(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangePublicTime') {
            body = beginCell().store(storeChangePublicTime(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeWl') {
            body = beginCell().store(storeChangeWl(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftGetRoyaltyParams') {
            body = beginCell().store(storeNftGetRoyaltyParams(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getWlPrice(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('wlPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getPublicPrice(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('publicPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getWlSaleTime(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('wlSaleTime', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getPublicSaleTime(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('publicSaleTime', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getWlAddress(provider: ContractProvider, wallet: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(wallet);
        let source = (await provider.get('wlAddress', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadTupleNftRoyaltyParams(source);
        return result;
    }
    
}
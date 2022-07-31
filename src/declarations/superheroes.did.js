export const idlFactory = ({ IDL }) => {
  const Errors = IDL.Variant({
    'Unauthorized' : IDL.Null,
    'TokenNotExist' : IDL.Null,
    'InvalidOperator' : IDL.Null,
  });
  const TxReceipt = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : Errors });
  const TokenMetadata = IDL.Record({ 'tokenUri' : IDL.Text });
  const MintResult = IDL.Variant({
    'Ok' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'Err' : Errors,
  });
  const Time = IDL.Int;
  const Address = IDL.Text;
  const UserInfo = IDL.Record({
    'dob' : IDL.Text,
    'alias' : IDL.Text,
    'createTime' : Time,
    'user_address' : IDL.Text,
    'address' : Address,
    'gender' : IDL.Bool,
    'first_name' : IDL.Text,
    'last_name' : IDL.Text,
    'phone_number' : IDL.Text,
    'avatar' : IDL.Text,
  });
  const TokenMetadata__1 = IDL.Record({ 'tokenUri' : IDL.Text });
  const TokenInfoExt = IDL.Record({
    'owner' : IDL.Principal,
    'metadata' : IDL.Opt(TokenMetadata__1),
    'operator' : IDL.Opt(IDL.Principal),
    'timestamp' : Time,
    'index' : IDL.Nat,
  });
  const Operation = IDL.Variant({
    'transferFrom' : IDL.Null,
    'burn' : IDL.Null,
    'approveAll' : IDL.Null,
    'mint' : IDL.Opt(TokenMetadata__1),
    'approve' : IDL.Null,
    'createOrder' : IDL.Null,
    'setMetadata' : IDL.Null,
    'transfer' : IDL.Null,
    'revokeAll' : IDL.Null,
  });
  const Record = IDL.Variant({
    'metadata' : IDL.Opt(TokenMetadata__1),
    'user' : IDL.Principal,
  });
  const TxRecord = IDL.Record({
    'op' : Operation,
    'to' : Record,
    'tokenIndex' : IDL.Opt(IDL.Nat),
    'from' : Record,
    'timestamp' : Time,
    'caller' : IDL.Principal,
    'index' : IDL.Nat,
  });
  const UserInfoExt = IDL.Record({
    'allowedTokens' : IDL.Vec(IDL.Nat),
    'tokens' : IDL.Vec(IDL.Nat),
    'operators' : IDL.Vec(IDL.Principal),
    'allowedBy' : IDL.Vec(IDL.Principal),
  });
  const NFTSale = IDL.Service({
    'approve' : IDL.Func([IDL.Nat, IDL.Principal], [TxReceipt], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'batchMint' : IDL.Func(
        [IDL.Principal, IDL.Vec(IDL.Opt(TokenMetadata))],
        [MintResult],
        [],
      ),
    'batchSetTokenMetadata' : IDL.Func(
        [IDL.Vec(IDL.Tuple(IDL.Nat, TokenMetadata))],
        [TxReceipt],
        [],
      ),
    'batchTransferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Vec(IDL.Nat)],
        [TxReceipt],
        [],
      ),
    'burn' : IDL.Func([IDL.Nat], [TxReceipt], []),
    'createAccount' : IDL.Func(
        [IDL.Principal, UserInfo],
        [IDL.Vec(UserInfo)],
        [],
      ),
    'deleteAccount' : IDL.Func([IDL.Principal], [IDL.Opt(UserInfo)], []),
    'getAll' : IDL.Func([], [IDL.Vec(UserInfo)], []),
    'getAllTokens' : IDL.Func([], [IDL.Vec(TokenInfoExt)], ['query']),
    'getOperator' : IDL.Func([IDL.Nat], [IDL.Principal], ['query']),
    'getTokenInfo' : IDL.Func([IDL.Nat], [TokenInfoExt], ['query']),
    'getTransaction' : IDL.Func([IDL.Nat], [TxRecord], ['query']),
    'getTransactions' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'getUserInfo' : IDL.Func([IDL.Principal], [UserInfoExt], ['query']),
    'getUserTokens' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(TokenInfoExt)],
        ['query'],
      ),
    'getUserTransactionAmount' : IDL.Func(
        [IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'getUserTransactions' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Nat],
        [IDL.Vec(TxRecord)],
        ['query'],
      ),
    'historySize' : IDL.Func([], [IDL.Nat], ['query']),
    'isApprovedForAll' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        ['query'],
      ),
    'mint' : IDL.Func(
        [IDL.Principal, IDL.Opt(TokenMetadata)],
        [MintResult],
        [],
      ),
    'ownerOf' : IDL.Func([IDL.Nat], [IDL.Principal], ['query']),
    'setApprovalForAll' : IDL.Func([IDL.Principal, IDL.Bool], [TxReceipt], []),
    'setOwner' : IDL.Func([IDL.Principal], [IDL.Principal], []),
    'setTokenMetadata' : IDL.Func([IDL.Nat, TokenMetadata], [TxReceipt], []),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [TxReceipt], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [TxReceipt],
        [],
      ),
    'updateAccount' : IDL.Func(
        [IDL.Principal, UserInfo],
        [IDL.Opt(UserInfo)],
        [],
      ),
  });
  return NFTSale;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };

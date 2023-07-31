const fetchTokenBalanceQuery = `query CurrentTokenBalances($_eq: Identity, $_eq1: Address, $_eq2: TokenType, $blockchain: TokenBlockchain!, $lastUpdatedTimestamp: OrderBy) {
  Ethereum: TokenBalances(
    input: {filter: {owner: {_eq: $_eq}, tokenAddress: {_eq: $_eq1}, tokenType: {_eq: $_eq2}}, blockchain: $blockchain, order: {lastUpdatedTimestamp: $lastUpdatedTimestamp}}
  ) {
    TokenBalance {
      tokenType
      tokenAddress
      tokenNfts {
        metaData {
          attributes {
            trait_type
            value
          }
        }
        tokenId
      }
    }
  }
}`

export default fetchTokenBalanceQuery;
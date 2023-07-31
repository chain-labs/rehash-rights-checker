import { init, fetchQuery } from '@airstack/airstack-react';
import fetchTokenBalanceQuery from '../query/fetchTokenBalances.query';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import * as ethers from "ethers";

init(import.meta.env.VITE_AIRSTACK_KEY);

const generateRights = (
  voteRights: boolean,
  voteTokenIds: Array<string>,
  proposeRights: boolean,
  proposeTokenIds: Array<string>,
  noneRights: boolean,
  noneTokenIds: Array<string>,
) => [
  {
    right: 'Vote',
    status: voteRights,
    description: "If you this right, you can vote on proposals.",
    tokens: voteTokenIds,
  },
  {
    right: 'Propose',
    status: proposeRights,
    description: "If you this right, you can propose or nominate guests.",
    tokens: proposeTokenIds,
  },
  {
    right: 'None',
    status: noneRights,
    description: "You can neither vote on proposals nor propose/nominate guests.",
    tokens: noneTokenIds,
  },
];

const getTokenIdsFromArray = (tokenData: any) => tokenData.map((data: any) => data.tokenId);

export default function RightsTable({
  ownerAddress,
  contractAddress,
  blockchain,
}: {
  ownerAddress: string;
  contractAddress: string;
  blockchain: string;
}) {
  const [rightsLoading, setRightsLoading] = useState(false);
  const [rightsLoaded, setRightsLoaded] = useState(false);
  const [rights, setRights] = useState<any>();

  async function hydrateRightsTable(queryAddress: string) {
    setRights(undefined);
  const args = {
    _eq: queryAddress,
    _eq1: contractAddress,
    _eq2: "ERC1155",
    blockchain,
  }
    const { data, error } = await fetchQuery(fetchTokenBalanceQuery, args, {});
    if (error !== null) {
      console.log('Error, please check the query');
      console.log(error);
      return;
    }
    console.log(data);
    const tokens = data.Ethereum.TokenBalance;
    const sortedTokensByRights: any = {
      Vote_Propose: [],
      Propose: [],
      None: [],
    };
    console.log(tokens);
    for (const token in tokens) {
      const attributes: any = {};
      for (const attribute in tokens[token].tokenNfts.metaData.attributes) {
        attributes[tokens[token].tokenNfts.metaData.attributes[attribute].trait_type] =
          tokens[token].tokenNfts.metaData.attributes[attribute].value;
      }
      const tokenData = {
        tokenId: tokens[token].tokenNfts.tokenId,
        attributes: attributes,
      };
      if (attributes.Governance.toLowerCase() === 'propose') {
        sortedTokensByRights['Propose'].push(tokenData);
      } else if (attributes.Governance.toLowerCase() === 'none') {
        sortedTokensByRights['None'].push(tokenData);
      } else {
        sortedTokensByRights['Vote_Propose'].push(tokenData);
      }
    }
    let newRights;
    if (sortedTokensByRights['Vote_Propose'].length > 0) {
      newRights = generateRights(
        true,
        getTokenIdsFromArray(sortedTokensByRights['Vote_Propose']),
        true,
        [
          ...getTokenIdsFromArray(sortedTokensByRights['Vote_Propose']),
          ...getTokenIdsFromArray(sortedTokensByRights['Propose']),
        ],
        false,
        getTokenIdsFromArray(sortedTokensByRights['None']),
      );
    } else if (sortedTokensByRights['Propose'].length > 0) {
      newRights = generateRights(
        false,
        getTokenIdsFromArray(sortedTokensByRights['Vote_Propose']),
        true,
        [
          ...getTokenIdsFromArray(sortedTokensByRights['Vote_Propose']),
          ...getTokenIdsFromArray(sortedTokensByRights['Propose']),
        ],
        false,
        getTokenIdsFromArray(sortedTokensByRights['None']),
      );
    } else {
      newRights = generateRights(
        false,
        getTokenIdsFromArray(sortedTokensByRights['Vote_Propose']),
        false,
        [
          ...getTokenIdsFromArray(sortedTokensByRights['Vote_Propose']),
          ...getTokenIdsFromArray(sortedTokensByRights['Propose']),
        ],
        true,
        getTokenIdsFromArray(sortedTokensByRights['None']),
      );
    }
    setRights(newRights);
  }

  async function handleCheckMyRights() {
    const provider = ethers.getDefaultProvider("mainnet",{alchemy: import.meta.env.VITE_ALCHEMY_KEY})

    let queryAddress: string | null = ownerAddress;
    if(ownerAddress.includes(".eth")) {
      queryAddress = await provider.resolveName(ownerAddress);
      if(queryAddress === null) {
        alert("Incorrect ENS name. Please enter correct ENS name");
        return;
      }
      console.log(queryAddress);
    }
    if(!ethers.utils.isAddress(queryAddress)) {
      alert("Enter valid Ethereum address");
      return;
    }
    setRightsLoading(true);
    setRightsLoaded(false);
    await hydrateRightsTable(queryAddress);
    setRightsLoading(false);
    setRightsLoaded(true);
  }

  return (
    <>
    <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <button
            type="button"
            onClick={handleCheckMyRights}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {rightsLoading ? "Checking my Rights..." : "Check My Rights"}
          </button>
        </div>
      </div>
    {
      rightsLoaded ? 
    <ul role="list" className="divide-y divide-gray-100">
      {rights.map((right: any) => (
        <li key={right.right} className="flex justify-between gap-x-6 py-5">
          <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="mt-1 truncate text-base leading-5 text-gray-500">{right.right}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                  {right.description}
              </p>
              {
                right.status ? 
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Tokens that give you this rights: {right.tokens.toString()}
                </p>:<></>
              }
            </div>
          </div>
          <div className="sm:flex sm:flex-col sm:items-end">
            {right.status ? (
              <>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  <CheckCircleIcon className="h-6 w-6 text-blue-500" />
                </p>
              </>
            ) : (
              <p className="text-xs leading-5 text-gray-500">
                <XCircleIcon className="h-6 w-6 text-red-500" />
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
     : 
    <></>
     }
    </> )
}

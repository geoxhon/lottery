// useMetaMask.js
import React from 'react';
import { useState } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
const useMetaMask = () => {
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  let contract: any;
  const [contractOwner, setContractOwner] = useState(undefined);
  const [isOwner, setIsOwner] = useState(false);
  const [items, setItems] = useState([]);
  const [winners, setWinners] = useState([]);
  const contractAddress = "0x01d48A560b4fB634C4cA49d5750484b7dd0A2B6D";
  let web3Ref: any; 
  const web3Exists = () =>{
    return web3 !== 'undefined';
  }

  const getWeb3 = () =>{
    if(web3Ref){
        return web3Ref;
    }
    if(window.ethereum !== 'undefined'){
        web3Ref = new Web3(window.ethereum);
        return web3Ref;
    }
  }
  const checkMetaMaskConnection = async () => {
    if (typeof window.ethereum != 'undefined') {
        const web3 = getWeb3();
        const accounts = await web3.eth.getAccounts();
        setIsMetaMaskConnected(accounts.length > 0);
        await getOwner();
        await getItems();
        await getWinners();
    }
  };

  const enableEth = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = getWeb3();
        checkMetaMaskConnection();
        return true;
      } catch (error) {
        console.error('Error enabling Ethereum:', error);
        return false;
      }
    }
    return false;
  };
  const connectToContract =  () => {
    if(contract){
        return contract;
    }
    if (web3Exists()) {
        const contractABI = [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_itemId",
                        "type": "uint256"
                    }
                ],
                "name": "bid",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "destroy",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "payable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "itemName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "itemPic",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "itemId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "bidders",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "bool",
                                "name": "hasWinner",
                                "type": "bool"
                            }
                        ],
                        "indexed": false,
                        "internalType": "struct ULottery.AItem",
                        "name": "biddingItem",
                        "type": "tuple"
                    }
                ],
                "name": "JustBidded",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_newNumberOfItems",
                        "type": "uint256"
                    }
                ],
                "name": "reset",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "revealWinners",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address payable",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transfer",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "winner",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "itemName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "itemPic",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "itemId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "bidders",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "bool",
                                "name": "hasWinner",
                                "type": "bool"
                            }
                        ],
                        "indexed": false,
                        "internalType": "struct ULottery.AItem",
                        "name": "biddingItem",
                        "type": "tuple"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "lotteryCount",
                        "type": "uint256"
                    }
                ],
                "name": "Winner",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "addressToPlayer",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "personId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getItems",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "itemName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "itemPic",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "itemId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "bidders",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "bool",
                                "name": "hasWinner",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct ULottery.AItem[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getWinners",
                "outputs": [
                    {
                        "components": [
                            {
                                "components": [
                                    {
                                        "internalType": "uint256",
                                        "name": "personId",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "address",
                                        "name": "addr",
                                        "type": "address"
                                    }
                                ],
                                "internalType": "struct ULottery.APerson",
                                "name": "winner",
                                "type": "tuple"
                            },
                            {
                                "components": [
                                    {
                                        "internalType": "string",
                                        "name": "itemName",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "string",
                                        "name": "itemPic",
                                        "type": "string"
                                    },
                                    {
                                        "internalType": "uint256",
                                        "name": "itemId",
                                        "type": "uint256"
                                    },
                                    {
                                        "internalType": "uint256[]",
                                        "name": "bidders",
                                        "type": "uint256[]"
                                    },
                                    {
                                        "internalType": "bool",
                                        "name": "hasWinner",
                                        "type": "bool"
                                    }
                                ],
                                "internalType": "struct ULottery.AItem",
                                "name": "winningItem",
                                "type": "tuple"
                            }
                        ],
                        "internalType": "struct ULottery.AWinner[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "items",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "itemName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "itemPic",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "itemId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "hasWinner",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "lotteryCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "numItems",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "players",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "personId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "REGISTRATION_FEE",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "winners",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "personId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "addr",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ULottery.APerson",
                        "name": "winner",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "itemName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "itemPic",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "itemId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256[]",
                                "name": "bidders",
                                "type": "uint256[]"
                            },
                            {
                                "internalType": "bool",
                                "name": "hasWinner",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct ULottery.AItem",
                        "name": "winningItem",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        try{
            const web3 = getWeb3();
            contract = new web3!.eth.Contract(contractABI, contractAddress);
            return contract;
        }catch{
            
        }
        
    }
  };
  const getOwner = async () => {
        try{
            if(connectToContract()){
                const owner = await contract.methods.owner().call();
                setContractOwner(owner.substring(0, 10));
                const web3 = getWeb3();
                const accounts = await web3!.eth.getAccounts();
                setIsOwner(owner == accounts[0]);
            }
        }catch{

        }
        
    }
    const getItems = async () => {
        try{
            if(connectToContract()){
                setItems((await contract.methods.getItems().call()));
            }
        }catch{
            
        }
    }
    const getWinners = async () => {
        try{
            const contract = connectToContract();
            setWinners((await contract.methods.getWinners().call()));
        }catch{

        }
    }
    React.useEffect(() => {
        console.log("flop");
        checkMetaMaskConnection();
        return () => {
        };
      }, []);
  return { contractAddress, isMetaMaskConnected, enableEth, checkMetaMaskConnection, contract, connectToContract, getWeb3, items, contractOwner, getItems, getOwner, winners, getWinners, isOwner };
};

export default useMetaMask;

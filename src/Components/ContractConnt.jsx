import React, {useState} from 'react'
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Authereum from "authereum";
import WalletConnectProvider from "@walletconnect/web3-provider";


const providerOptions = {
  /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
  theme: "dark" // optional
});

const provider = await web3Modal.connect();

const web3 = new Web3(provider)

const ContractConnt = () => {
    const [loading, setLoading] = useState(false);
return ({
            get web3Loading() {
            return loading
            },
            async getweb3() {
            setLoading(true);
            let web3Modal;
            let provider;
            let web3;
            let providerOptions;
            providerOptions = {
                metamask: {
                id: "injected",
                name: "MetaMask",
                type: "injected",
                check: "isMetaMask"
                },
                walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                infuraId: "INFURA_ID", // Required
                network: "rinkeby",
                qrcodeModalOptions: {
                mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar"
                ]
                }
                }
                },
                authereum: {
                package: Authereum // required
                },
            };
            web3Modal = new Web3Modal({
                network: "rinkeby",
                cacheProvider: true,
                providerOptions
                });
            provider = await web3Modal.connect();
            provider.on('error', e => console.error('WS Error', e));
            provider.on('end', e => console.error('WS End', e));

            provider.on("disconnect", (error) => {
            console.log(error);
            });
            provider.on("connect", (info) => {
            console.log(info);
            });
            web3 = new Web3(provider);
            setLoading(false);
            return web3;
            }
});

}

export default ContractConnt

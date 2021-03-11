import config from '../config';
import TokenArtifact from '../abi/BaseToken.json';

export default {
  data () {
    return {
      legacy: false,
      web3: null,
      web3Provider: null,
      metamask: {
        installed: false,
        netId: null,
      },
      network: {
        default: config.defaultNetwork,
        current: null,
        map: {
          1007: 'NewChainTestNet',
          1012: 'NewChainMainNet',
          1002: "NewChainDevNet"
        },
        list: {
          NewChainTestNet: {
            web3Provider: 'https://rpc1.newchain.newtonproject.org/new2021',
            etherscanLink: 'http://explorer.newb.club',
            id: '1007',
            name: 'NewChainTestNet',
          },
          NewChainMainNet: {
            web3Provider: 'https://cn.rpc.mainnet.diynova.com',
            etherscanLink: 'https://explorer.newtonproject.org',
            id: '1012',
            name: 'NewChainMainNet',
          },
          NewChainDevNet: {
            web3Provider: 'https://devnet.newchain.cloud.diynova.com',
            etherscanLink: 'http://explorer.newtonproject.dev.diynova.com/',
            id: '1002',
            name: 'NewChainDevNet',
          },
        },
      },
      contracts: {
        token: null,
      },
    };
  },
  methods: {
    initWeb3 (network, checkWeb3) {
      if (!this.network.list.hasOwnProperty(network)) { // eslint-disable-line no-prototype-builtins
        throw new Error(
          `Failed initializing network ${network}. Allowed values are ${Object.keys(this.network.list)}.`,
        );
      }

      return new Promise((resolve) => {
        if (checkWeb3 && (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined')) {
          if (window.ethereum) {
            console.log('injected web3'); // eslint-disable-line no-console
            this.web3Provider = window.ethereum;
          } else {
            console.log('injected web3 (legacy)'); // eslint-disable-line no-console
            this.web3Provider = window.web3.currentProvider;
            this.legacy = true;
          }

          this.web3 = new Web3(this.web3Provider);
          this.metamask.installed = true;
          this.web3.version.getNetwork(async (err, netId) => {
            if (err) {
              console.log(err); // eslint-disable-line no-console
            }
            this.metamask.netId = netId;
            if (parseInt(netId) !== parseInt(this.network.list[network].id)) {
              this.network.current = this.network.list[this.network.map[netId]];
              await this.initWeb3(network, false);
            }
            resolve();
          });
        } else {
          console.log('provided web3'); // eslint-disable-line no-console
          this.network.current = this.network.list[network];
          this.web3Provider = new Web3.providers.HttpProvider(this.network.list[network].web3Provider);
          this.web3 = new Web3(this.web3Provider);

          resolve();
        }
      });
    },
    initToken () {
      this.contracts.token = this.web3.eth.contract(TokenArtifact.abi);
      this.contracts.token.contractName = TokenArtifact.contractName;
      this.contracts.token.compiler = TokenArtifact.compiler;
      this.contracts.token.bytecode = TokenArtifact.bytecode;
      this.contracts.token.devdoc = TokenArtifact.devdoc;
      this.contracts.token.stringifiedAbi = JSON.stringify(TokenArtifact.abi);
    },
  },
};

const Nft = artifacts.require("NFT");

module.exports = function (deployer) {
  deployer.deploy(Nft);
};

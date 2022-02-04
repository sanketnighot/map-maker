const Mint = artifacts.require("NFT");
var sha256 = require("js-sha256").sha256;
const salt = "1234";

contract("Minting", (accounts) => {
  const acc = accounts[1];
  let contract;

  before(async () => {
    contract = await Mint.deployed();
  });

  describe("minting", async () => {
    it("Mints a new asset", async () => {
      var hash = sha256.create();
      const hashVal = hash.update("45" + salt).hex();
      console.log(hashVal);
      const result = await contract.mint("0x" + hashVal, "", { value: 45 });
      console.log(result.logs[0].args);
    });

    it("Should transfer land", async () => {
      var hash = sha256.create();
      const hashVal = hash.update("45" + salt).hex();
      await contract.mint("0x" + hashVal, "", { value: 45 });
      const result = await contract.transferFrom(accounts[0], acc, 1);
      console.log(result);
    });
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract NFT is ERC721,ERC721URIStorage{
    uint256 public totalNFT=0;
    uint256 public landNFT=0;
    uint256 public lordNFT=0;
    address adminNft;
    event Breach(address);
    event lordMinted(uint256);
    event landMinted(uint256);
    string private salt="1234";
    
    constructor() ERC721("ProperT","PRT"){
        adminNft = msg.sender;
    }

    function deposit(uint256 amount) public payable{}

    function mint(bytes32 hashVal, string memory _tokenURI, bool lord) public payable {
        bytes memory  preHash = bytes(abi.encodePacked(Strings.toString(msg.value),salt));
        bytes32 expectedHash = sha256(preHash);
        if(expectedHash != hashVal){
            emit Breach(msg.sender);
            revert("Invalid hash");
        }
        deposit(msg.value);
        totalNFT+=1;
        _mint(msg.sender, totalNFT);
        _setTokenURI(totalNFT,_tokenURI);
        if(lord) emit lordMinted(totalNFT);
        else emit landMinted(totalNFT);
    }

    function _burn(uint256 tokenId) internal override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage,ERC721)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function getTotalSupply() public view returns(uint256){
        return totalNFT;
    }

    function updateTokenURI(uint256 tokenId, string memory _newURI) public{
        require(msg.sender==ownerOf(tokenId),"not allowed");
        _setTokenURI(tokenId, _newURI);
    }


    function setSalt(string memory newSalt) private {
        require(msg.sender==adminNft);
        salt=newSalt;
    }

}
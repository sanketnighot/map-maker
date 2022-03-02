// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract NFT is ERC721,ERC721URIStorage{
    uint256 totalSupply=0;
    address adminNft;
    event Breach(address user);
    event lordMinted(uint256 tokenId);
    event landMinted(uint256 tokenId);
    string private salt="1234";
    
    constructor() ERC721("ProperT","PRT"){
        adminNft = msg.sender;
    }

    function deposit(uint256 amount) public payable{}

    function mint(bytes32 hashVal, uint256 tokenId, string memory _tokenURI, bool lord) public payable {
        bytes memory  preHash = bytes(abi.encodePacked(Strings.toString(msg.value),salt));
        bytes32 expectedHash = sha256(preHash);
        if(expectedHash != hashVal){
            emit Breach(msg.sender);
            revert("Invalid hash");
        }
        deposit(msg.value);
        totalSupply+=1;
        _mint(msg.sender, tokenId);
        totalSupply+=1;
        _setTokenURI(tokenId,_tokenURI);
        if(lord) emit lordMinted(tokenId);
        else emit landMinted(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
        totalSupply-=1;
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
        return totalSupply;
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
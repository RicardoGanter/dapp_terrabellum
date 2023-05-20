// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./InnomicNFT.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract PoolNFT is ERC721Holder {

    mapping(uint256 => address) private _owners;

    InnomicNFT public immutable token;

    constructor(InnomicNFT _token){
        token = _token;
    }

    function guardar(uint256 tokenId, address owner) external virtual {
        _owners[tokenId] = owner;
    }

    function sacar(uint256 tokenId, address owner) external virtual {
        require(_owners[tokenId] == owner, "los token no te pertenecen");
        token._safeTransferPool(owner, tokenId);
        if (abi.encodePacked(_owners[tokenId]).length != 0) {
            delete _owners[tokenId];
        }
    }
}
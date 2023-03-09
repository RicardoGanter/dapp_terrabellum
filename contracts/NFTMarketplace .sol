// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace {
    
    ERC721 public nft;

    struct Sale {
        address seller;
        uint256 tokenId;
        uint256 price;
        bool sold;
    }

    Sale[] public sales;
    mapping(uint256 => Sale) public tokenIdToSale;

    event SaleCreated(address indexed seller, uint256 indexed tokenId, uint256 price);
    event SaleCancelled(uint256 indexed tokenId);
    event SaleSuccessful(address indexed buyer, uint256 indexed tokenId, uint256 price);

    uint256 public feePercentage = 5;

    constructor(address _nftAddress) {
        nft = ERC721(_nftAddress);
    }

    function createSale(uint256 _tokenId, uint256 _price) external {
        require(nft.ownerOf(_tokenId) == msg.sender, "You do not own this NFT");

        Sale memory sale = Sale(msg.sender, _tokenId, _price, false);
        sales.push(sale);
        tokenIdToSale[_tokenId] = sale;

        emit SaleCreated(msg.sender, _tokenId, _price);
    }

    function cancelSale(uint256 _tokenId) external {
        require(tokenIdToSale[_tokenId].seller == msg.sender, "You are not the seller of this NFT");
        require(!tokenIdToSale[_tokenId].sold, "This NFT has already been sold");

        delete tokenIdToSale[_tokenId];

        for (uint256 i = 0; i < sales.length; i++) {
            if (sales[i].tokenId == _tokenId) {
                sales[i].sold = true;
            }
        }

        emit SaleCancelled(_tokenId);
    }
        function getPrice(uint256 _tokenId) public view returns (uint256) {
        Sale memory sale = tokenIdToSale[_tokenId];
        require(sale.seller != address(0), "This NFT is not for sale");
        return sale.price;
    }

     function buy(uint256 _tokenId) external payable {
        Sale storage sale = tokenIdToSale[_tokenId];

        require(sale.seller != address(0), "This NFT is not for sale");
        require(!sale.sold, "This NFT has already been sold");
        require(msg.value == sale.price, "Incorrect amount of ETH sent");
        require(nft.isApprovedForAll(sale.seller, address(this)), "Contract is not approved to transfer this NFT");
    
        nft.safeTransferFrom(sale.seller, msg.sender, _tokenId);

        delete tokenIdToSale[_tokenId];

        for (uint256 i = 0; i < sales.length; i++) {
            if (sales[i].tokenId == _tokenId) {
                sales[i].sold = true;
            }
        }

    uint256 fee = (msg.value * feePercentage) / 100;
    payable(owner()).transfer(fee);
    payable(sale.seller).transfer(msg.value - fee);

    emit SaleSuccessful(msg.sender, _tokenId, sale.price);
}

    function setFeePercentage(uint256 _feePercentage) external {
        require(msg.sender == owner(), "Only the contract owner can set the fee percentage");
        feePercentage = _feePercentage;
    }

    function owner() public view returns (address) {
        return address(this);
    }

    function getSales() public view returns (Sale[] memory) {
        return sales;
    }
}

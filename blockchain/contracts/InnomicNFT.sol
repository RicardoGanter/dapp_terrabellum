// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./PoolNFT.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract InnomicNFT is ERC721Enumerable {

    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;

    // Actual URL base for the URI
    string private baseURI;

    // Actual token count
    uint256 private tokenCount;

    // Limit token mint
    uint256 public limite = 100;

    // Mapping from token ID to allowance to earn rewards
    mapping(uint256 => bool) private _allowToEarn;

    // Mapping from token ID to token level
    mapping(uint256 => uint8) private _lvl;

    // Mapping from token ID to the number of representation of his class
    mapping(uint256 => uint256) private _numClase;

    mapping(uint256 => uint256[3]) private _parents;

    mapping(uint256 => bool) private _blocked;

    mapping(uint256 => uint8) private _unFusioned;
    
    address private poolNFTaddress;

    PoolNFT public poolNFT;

    address marketplaceContract;

    /////////////////////////////////MARKET//////////////////////////////////
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 impuesto = 20;
    /////////////////////////////////////////////////////////////////////////

    constructor(string memory name_, string memory symbol_,
                string memory newBaseURI) ERC721(name_, symbol_) {
        baseURI = newBaseURI;
        /////////////////////////////////MARKET//////////////////////////////////
        owner = payable(msg.sender);
        /////////////////////////////////////////////////////////////////////////
    }

    function getAllNFTs() public view returns (uint256[] memory) {
        uint256[] memory tokenList = new uint256[](tokenCount);
        uint256 validTokenCount = 0;

        for (uint256 tokenId = 0; tokenId < tokenCount; tokenId++) {
            if (_exists(tokenId + 1)) {
                tokenList[tokenId] = tokenId + 1;
                validTokenCount++;
            }
        }

        // Redimensionar la matriz para eliminar los espacios no utilizados
        assembly {
            mstore(tokenList, validTokenCount)
        }

        return tokenList;
    }

    /////////////////////////////////MARKET//////////////////////////////////
    struct MarketItem {
        uint256 itemId;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event MarketItemSold(
        uint256 indexed itemId,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    function createMarketItem(
        uint256 tokenId,
        uint256 price
    ) public payable {
        require(price > 0, "ERR_PR");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            tokenId,
            payable(msg.sender),
            payable(poolNFTaddress),
            price,
            false
        );

        _safeTransfer(msg.sender, poolNFTaddress, tokenId, "");

        poolNFT.guardar(tokenId, msg.sender);

        emit MarketItemCreated(
            itemId,
            tokenId,
            msg.sender,
            poolNFTaddress,
            price,
            false
        );
    }

    function unListMarketItem(uint256 itemId) public payable
    {

        require(msg.sender == idToMarketItem[itemId].seller, "ERR_SEL");
        uint tokenId = idToMarketItem[itemId].tokenId;
        idToMarketItem[itemId].owner = payable(msg.sender);
        poolNFT.sacar(tokenId, msg.sender);
    }

    function createMarketSale(uint256 itemId)
        public
        payable
    {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;

        require(msg.value == price, "ERR_DIF_PR");

        owner.transfer(msg.value / impuesto);
        idToMarketItem[itemId].seller.transfer(msg.value - msg.value / impuesto);
        poolNFT.guardar(tokenId, msg.sender);
        poolNFT.sacar(tokenId, msg.sender);
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();

        emit MarketItemSold(
            itemId,
            tokenId,
            idToMarketItem[itemId].seller,
            msg.sender,
            price
        );
    }

    function fetchUnSoldMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = 0;
        uint itemId = 0;

        for (uint i = 0; i < itemCount; i++) {
          if (!idToMarketItem[i + 1].sold && idToMarketItem[i + 1].owner == poolNFTaddress) {
            unsoldItemCount += 1;
          }
        }

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
          uint currentId = i + 1;
          if (!idToMarketItem[currentId].sold && idToMarketItem[currentId].owner == poolNFTaddress) {
            MarketItem storage currentItem = idToMarketItem[currentId];
            items[itemId] = currentItem;
            itemId += 1;
          }
        }
        return items;
    }
    /////////////////////////////////////////////////////////////////////////

    /**
     * @dev Returns the number of tokens minted.
     */
    function balance() public view virtual returns (uint256) {
        return tokenCount;
    }

    function isAllowedToEarn(uint256 tokenId) public view virtual returns (bool) {
        _requireMinted(tokenId);

        bool _isAllowed = _allowToEarn[tokenId];
        return _isAllowed;
    }

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory _tokenURI = string(abi.encodePacked(_baseURI(), _tokenURIs[tokenId]));
        return _tokenURI;
    }

    /**
     * @dev Sets `_tokenURI` as the tokenURI of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERR_UNEXIST");
        _tokenURIs[tokenId] = _tokenURI;
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function _setBaseURI(string memory newBaseURI) public virtual {
        baseURI = newBaseURI;
    }

    function claseToken(uint256 tokenId) public view virtual returns (uint256) {
        uint256 nC = _numClase[tokenId];
        return nC;
    }

    function setPoolNFT(address poola, PoolNFT pool) public virtual {
        poolNFTaddress = poola;
        poolNFT = pool;
    }

    function getParents(uint256 tokenId) public view virtual returns (uint256[] memory) {
        require(_lvl[tokenId] > 1, "ERR_LVL");
        uint256[] memory tokenList = new uint256[](3);
        tokenList[0] = _parents[tokenId][0];
        tokenList[1] = _parents[tokenId][1];
        tokenList[2] = _parents[tokenId][2];
        return tokenList;
    }

    function getUnFusioned(uint256 tokenId) public view virtual returns (uint8) {
        uint8 num = _unFusioned[tokenId];
        return num;
    }

    function _mintTokenAllowedToEarn(address to, uint256 URInum) public virtual {
        uint256 tokenId = tokenCount + 1;
        _safeMint(to, tokenId);

        string memory finalURI = ".json";

        string memory _tokenURI = string(abi.encodePacked(Strings.toString(URInum), finalURI));

        _tokenURIs[tokenId] = _tokenURI;

        _numClase[tokenId] = URInum;

        _lvl[tokenId] = 1;

        _unFusioned[tokenId] = 0;

        tokenCount++;
        _allowToEarn[tokenId] = true;
    }

    function _mintTokenNotAllowedToEarn(address to, uint256 URInum) public virtual {
        uint256 tokenId = tokenCount + 1;
        _safeMint(to, tokenId);

        string memory finalURI = ".json";

        string memory _tokenURI = string(abi.encodePacked(Strings.toString(URInum), finalURI));

        _tokenURIs[tokenId] = _tokenURI;

        _numClase[tokenId] = URInum;

        _lvl[tokenId] = 1;

        _unFusioned[tokenId] = 0;

        tokenCount++;
        _allowToEarn[tokenId] = false;
    }

    function _mintWithURI(address to, string memory URI) internal virtual {
        uint256 tokenId = tokenCount + 1;
        _safeMint(to, tokenId);

        string memory _tokenURI = URI;

        _tokenURIs[tokenId] = _tokenURI;

        tokenCount++;
    }

    function _safeTransferPool(
        address to,
        uint256 tokenId
    ) public virtual {
        _safeTransfer(poolNFTaddress, to, tokenId, "");
    }

    function _safeTransfer(
        address to,
        uint256 tokenId
    ) public virtual {
        _safeTransfer(msg.sender, to, tokenId, "");
        poolNFT.guardar(tokenId, to);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     * This is an internal function that does not check if the sender is authorized to operate on the token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function burn(uint256 tokenId) public virtual {
        require(ownerOf(tokenId) == msg.sender, "ERR_OW");

        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function _setlimite(uint256 newlimite) public virtual {
        limite = newlimite;
    }

    function _block(uint256[3] memory tokenIds) internal virtual {
        _blocked[tokenIds[0]] = true;
        _blocked[tokenIds[1]] = true;
        _blocked[tokenIds[2]] = true;
    }

    function upgradeLvl2(address to, uint256 tokenId1, uint256 tokenId2, uint256 tokenId3, uint8 num) internal virtual {
        uint256[] memory clases = new uint256[](3);
        clases[0] = tokenId1;
        clases[1] = tokenId2;
        clases[2] = tokenId3;
        uint256 tokenClase;
        tokenClase = claseToken(tokenId1) * 100 + claseToken(clases[num]);
        
        string memory finalURI = ".json";
        string memory tokenURI_ = string(abi.encodePacked(Strings.toString(tokenClase), finalURI));
        _mintWithURI(to, tokenURI_);
        _parents[tokenCount] = [tokenId1, tokenId2, tokenId3];
        _block(_parents[tokenCount]);
        _numClase[tokenCount] = tokenClase;
        _lvl[tokenCount] = 2;
        _allowToEarn[tokenCount] = _allowToEarn[tokenId1];
    }

    function upgradeLvl3(address to, uint256 tokenId1, uint256 tokenId2, uint256 tokenId3, uint8 num) internal virtual {
        uint256[] memory clases = new uint256[](9);
        clases[0] = _parents[tokenId1][0];
        clases[1] = _parents[tokenId2][0];
        clases[2] = _parents[tokenId3][0];
        clases[3] = _parents[tokenId1][1];
        clases[4] = _parents[tokenId2][1];
        clases[5] = _parents[tokenId3][1];
        clases[6] = _parents[tokenId1][2];
        clases[7] = _parents[tokenId2][2];
        clases[8] = _parents[tokenId3][2];
        
        uint256 tokenClase;
        tokenClase = claseToken(tokenId1) * 100 + claseToken(clases[num]);
        
        string memory finalURI = ".json";
        string memory tokenURI_ = string(abi.encodePacked(Strings.toString(tokenClase), finalURI));
        _mintWithURI(to, tokenURI_);
        _parents[tokenCount] = [tokenId1, tokenId2, tokenId3];
        _block(_parents[tokenCount]);
        _numClase[tokenCount] = tokenClase;
        _lvl[tokenCount] = 3;
        _allowToEarn[tokenCount] = _allowToEarn[tokenId1];
    }

    function upgrade(uint256 tokenId1, uint256 tokenId2, uint256 tokenId3, uint8 num) public virtual {
        require((_lvl[tokenId1] == _lvl[tokenId2]) && (_lvl[tokenId1] == _lvl[tokenId3]), "ERR_LVL");
        require((_allowToEarn[tokenId1] == _allowToEarn[tokenId2]) && (_allowToEarn[tokenId1] == _allowToEarn[tokenId3]),
                "ERR_TYP");
        require(!_blocked[tokenId1] || !_blocked[tokenId2] || !_blocked[tokenId3], "ERR_BLK");
        require(_lvl[tokenId1] != 3, "ERR_LVL3");
        require(((ownerOf(tokenId1) == ownerOf(tokenId2)) && (ownerOf(tokenId1) == ownerOf(tokenId3))) && (ownerOf(tokenId1) == msg.sender),
                "ERR_OW");

        if (_lvl[tokenId1] == 1) {
            upgradeLvl2(msg.sender, tokenId1, tokenId2, tokenId3, num);
        } else {
            upgradeLvl3(msg.sender, tokenId1, tokenId2, tokenId3, num);
        }

        _safeTransfer(msg.sender, poolNFTaddress, tokenId1, "");
        _safeTransfer(msg.sender, poolNFTaddress, tokenId2, "");
        _safeTransfer(msg.sender, poolNFTaddress, tokenId3, "");

        poolNFT.guardar(tokenId1, msg.sender);
        poolNFT.guardar(tokenId2, msg.sender);
        poolNFT.guardar(tokenId3, msg.sender);
    }

    function downgrade(uint256 tokenId) public virtual {
        require(_lvl[tokenId] > 1, "ERR_LVL");
        require(ownerOf(tokenId) == msg.sender, "ERR_OW");
        _blocked[_parents[tokenId][0]] = false;
        _blocked[_parents[tokenId][1]] = false;
        _blocked[_parents[tokenId][2]] = false;

        poolNFT.guardar(_parents[tokenId][0], msg.sender);
        poolNFT.guardar(_parents[tokenId][1], msg.sender);
        poolNFT.guardar(_parents[tokenId][2], msg.sender);
        
        poolNFT.sacar(_parents[tokenId][0], msg.sender);
        poolNFT.sacar(_parents[tokenId][1], msg.sender);
        poolNFT.sacar(_parents[tokenId][2], msg.sender);

        if (_lvl[tokenId] == 2) {
            if (_unFusioned[_parents[tokenId][0]] < 5) {
                _unFusioned[_parents[tokenId][0]] += 1;
            }
            if (_unFusioned[_parents[tokenId][1]] < 5) {
                _unFusioned[_parents[tokenId][1]] += 1;
            }
            if (_unFusioned[_parents[tokenId][2]] < 5) {
                _unFusioned[_parents[tokenId][2]] += 1;
            }
        } else {
            if (_unFusioned[_parents[_parents[tokenId][0]][0]] < 5) {
                _unFusioned[_parents[_parents[tokenId][0]][0]] += 1;
            }
            if (_unFusioned[_parents[_parents[tokenId][0]][1]] < 5) {
                _unFusioned[_parents[_parents[tokenId][0]][1]] += 1;
            }
            if (_unFusioned[_parents[_parents[tokenId][0]][2]] < 5) {
                _unFusioned[_parents[_parents[tokenId][0]][2]] += 1;
            }
            if (_unFusioned[_parents[_parents[tokenId][1]][0]] < 5) {
                _unFusioned[_parents[_parents[tokenId][1]][0]] += 1;
            }
            if (_unFusioned[_parents[_parents[tokenId][1]][1]] < 5) {
                _unFusioned[_parents[_parents[tokenId][1]][1]] += 1;
            }
            if (_unFusioned[_parents[_parents[tokenId][1]][2]] < 5) {
                _unFusioned[_parents[_parents[tokenId][1]][2]] += 1;
            }
            if (_unFusioned[_parents[_parents[tokenId][2]][0]] < 5) {
                _unFusioned[_parents[_parents[tokenId][2]][0]] += 1;
            }
            if (_unFusioned[_parents[_parents[tokenId][2]][1]] < 5) {
                _unFusioned[_parents[_parents[tokenId][2]][1]] += 1;
            }
            if (_unFusioned[_parents[_parents[tokenId][2]][2]] < 5) {
                _unFusioned[_parents[_parents[tokenId][2]][2]] += 1;
            }
        }

        _burn(tokenId);
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./PoolNFT.sol";

contract InnomicNFT is ERC721Enumerable {

    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;

    // Actual URL base for the URI
    string private baseURI;// https://ipfs.io/ipfs/QmVPqReUDz3r7DHAJDMxgaDXwtWckUJQqsQWSgR5uNQYHn/

    // Module for the calculation of token URI
    uint256 private mod = 2;

    // Actual token count
    uint256 private tokenCount;

    // Limit token mint
    uint256 public limite = 2;

    // Mapping from token ID to allowance to earn rewards
    mapping(uint256 => bool) private _allowToEarn;

    // Mapping from token ID to token level
    mapping(uint256 => uint8) private _lvl;

    // Actual event of minting count
    uint256 private tanda_ = 0;

    // Mapping from token ID to when where minting the token
    mapping(uint256 => uint256) private _tanda;

    // Mapping from token ID to the number of representation of his class
    mapping(uint256 => string) private _numClase;

    // Mapping from a number to a class
    mapping(uint256 => string) private _clase;

    mapping(uint256 => uint256[3]) private _parents;

    mapping(uint256 => bool) private _blocked;

    mapping(uint256 => uint256) private _color;

    mapping(uint256 => mapping(uint256 => bool)) private _dorados;

    mapping(uint256 => mapping(uint256 => bool)) private _morados;

    address private poolNFTaddress;

    PoolNFT public poolNFT;

    address private marketAddress;

    constructor(string memory name_, string memory symbol_,
                string memory newBaseURI,
                uint256[] memory carpetas, string[] memory clases_, uint256 lc,
                uint256 ld, uint256[] memory dorados,
                uint256 lm, uint256[] memory morados,
                address marketAddress_) ERC721(name_, symbol_) {
        _setTanda(newBaseURI, carpetas, clases_, lc, ld, dorados, lm, morados);
        marketAddress = marketAddress_;
    }


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

        string memory _tokenURI = _tokenURIs[tokenId];

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
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
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
        //tanda_ += 1;
    }

    function _addClase(uint256 carpeta, string memory clase_) public virtual {
        _clase[carpeta] = clase_;
    }

    function numClase(uint256 tokenId) public view virtual returns (string memory) {
        string memory nC = _numClase[tokenId];
        return nC;
    }

    function claseToken(uint256 tokenId) public view virtual returns (string memory) {
        string memory nC = _numClase[tokenId];
        //string memory cT = _clase[nC];
        return nC;
    }

    function _setDorados(uint256 l, uint256[] memory dorados) public virtual {
        for (uint256 i = 0; i < l; i++){
            _dorados[tanda_][dorados[i]] = true;
        }
    }

    function _setMorados(uint256 l, uint256[] memory morados) public virtual {
        for (uint256 i = 0; i < l; i++){
            _morados[tanda_][morados[i]] = true;
        }
    }

    function _setTanda(string memory newBaseURI,
     uint256[] memory carpetas, string[] memory clases_, uint256 lc,
     uint256 ld, uint256[] memory dorados,
     uint256 lm, uint256[] memory morados) public virtual {
        tanda_++;
        for (uint256 i = 0; i < lc; i++){
            _addClase((tanda_ * 100) + carpetas[i], clases_[i]);
        }
        _setDorados(ld, dorados);
        _setMorados(lm, morados);
        _setBaseURI(newBaseURI);
    }

    function setPoolNFT(address poola, PoolNFT pool) public virtual {
        poolNFTaddress = poola;
        poolNFT = pool;
    }

    function _getColor(uint256 tokenId) public view returns (uint256) {
        return _color[tokenId];
    }

    function _mintTokenAllowedToEarn(address to) public virtual {
        uint256 tokenId = tokenCount + 1;
        _safeMint(to, tokenId);

        approve(marketAddress, tokenId);

        string memory base = _baseURI();

        string memory finalURI = ".json";

        string memory _tokenURI = string(abi.encodePacked(string(abi.encodePacked(base, Strings.toString(_calculateURI(tokenId, mod)))), finalURI));

        _tokenURIs[tokenId] = _tokenURI;

        _tanda[tokenId] = tanda_;

        uint256 num = (tanda_ * 100) + _calculateURI(tokenId, mod);

        _numClase[tokenId] = _clase[num];

        _lvl[tokenId] = 1;

        if (_dorados[tanda_][_calculateURI(tokenId, mod)]) {
            _color[tokenId] = 0;
        } else {
            if (_morados[tanda_][_calculateURI(tokenId, mod)]) {
                _color[tokenId] = 1;
            } else {
                _color[tokenId] = 2;
            }
        }
        tokenCount++;
        _allowToEarn[tokenId] = true;
    }

    function _mintTokenNotAllowedToEarn(address to) public virtual {
        uint256 tokenId = tokenCount + 1;
        _safeMint(to, tokenId);

        approve(marketAddress, tokenId);

        string memory base = _baseURI();

        string memory finalURI = ".json";

        string memory _tokenURI = string(abi.encodePacked(string(abi.encodePacked(base, Strings.toString(_calculateURI(tokenId, mod)))), finalURI));

        _tokenURIs[tokenId] = _tokenURI;

        _tanda[tokenId] = tanda_;

        uint256 num = (tanda_ * 100) + _calculateURI(tokenId, mod);

        _numClase[tokenId] = _clase[num];

        _lvl[tokenId] = 1;

        if (_dorados[tanda_][_calculateURI(tokenId, mod)]) {
            _color[tokenId] = 0;
        } else {
            if (_morados[tanda_][_calculateURI(tokenId, mod)]) {
                _color[tokenId] = 1;
            } else {
                _color[tokenId] = 2;
            }
        }
        tokenCount++;
        _allowToEarn[tokenId] = false;
    }

    function _mintWithURI(address to, string memory URI) internal virtual {
        uint256 tokenId = tokenCount + 1;
        _safeMint(to, tokenId);

        approve(marketAddress, tokenId);

        string memory _tokenURI = URI;

        _tokenURIs[tokenId] = _tokenURI;

        _tanda[tokenId] = tanda_;

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
        require(ownerOf(tokenId) == msg.sender, "el token debe pertenecerte");

        super._burn(tokenId);

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function _calculateURI(uint256 id, uint256 module) private pure returns (uint256) {
        uint8[6] memory mult = [2, 3, 4, 5, 6, 7];
        uint256 i = 0;
        uint256 m = 10;
        uint256 num = 0;
        uint256 s = 0;
        while (num != id) {
            if (i == 0) {
                num = id % m;
                uint256 bar = id % m;
                s += (bar * mult[i % 6]);
                i += 1;
                m *= 10;
            }
            else {
                num = id % m;
                uint256 bar = ((id % m) - (id % (m / 10))) / (m / 10);
                s += (bar * mult[i % 6]);
                i += 1;
                m *= 10;
            }
        }
        uint256 z = s / module;
        uint256 r = module + (z * module) - s;
        return r;
    }

    function _setMod(uint256 newmod) public virtual {
        mod = newmod;
    }

    function _setlimite(uint256 newlimite) public virtual {
        limite = newlimite;
    }

    function _block(uint256[3] memory tokenIds) internal virtual {
        _blocked[tokenIds[0]] = true;
        _blocked[tokenIds[1]] = true;
        _blocked[tokenIds[2]] = true;
    }

    function upgradeLvl2(address to, uint256 tokenId1, uint256 tokenId2, uint256 tokenId3) internal virtual {
        uint256[] memory clases = new uint256[](6);
        clases[0] = tokenId1;
        clases[1] = tokenId2;
        clases[2] = tokenId3;
        uint256[] memory clasesD = new uint256[](3);
        uint256 d = 0;
        uint256 n = 0;
        for (uint i = 0; i < 3; i++){
            if (_color[clases[i]] == 0) {
                clasesD[d] = clases[i];
                d++;
            } if (_color[clases[i]] == 1) {
                clases[3 + n] = clases[i];
                n++;
            }
        }
        string memory tokenClase;
        if (d > 0){
            tokenClase = string(abi.encodePacked(claseToken(tokenId1), claseToken(clasesD[_calculateURI(tokenCount + 1, d) - 1])));
        } else {
            tokenClase = string(abi.encodePacked(claseToken(tokenId1), claseToken(clases[_calculateURI(tokenCount + 1, 3 + n) - 1])));
        }
        string memory baseURI_ = "https://ipfs.io/ipfs/QmY5rezFfkPSGXDiAh9ZAEghMDnHL4APryPcM3aNntpTKa/nftlvl2_1/";
        string memory finalURI = ".json";
        string memory tokenURI_ = string(abi.encodePacked(string(abi.encodePacked(baseURI_, tokenClase)), finalURI));
        _mintWithURI(to, tokenURI_);
        _parents[tokenCount] = [tokenId1, tokenId2, tokenId3];
        _block(_parents[tokenCount]);
        _numClase[tokenCount] = tokenClase;
        _lvl[tokenCount] = 2;
        _allowToEarn[tokenCount] = _allowToEarn[tokenId1];
    }

    function upgradeLvl3(address to, uint256 tokenId1, uint256 tokenId2, uint256 tokenId3) internal virtual {
        uint256[] memory clases = new uint256[](18);
        clases[0] = _parents[tokenId1][0];
        clases[1] = _parents[tokenId2][0];
        clases[2] = _parents[tokenId3][0];
        clases[3] = _parents[tokenId1][1];
        clases[4] = _parents[tokenId2][1];
        clases[5] = _parents[tokenId3][1];
        clases[6] = _parents[tokenId1][2];
        clases[7] = _parents[tokenId2][2];
        clases[8] = _parents[tokenId3][2];
        uint256[] memory clasesD = new uint256[](9);
        uint256 d = 0;
        uint256 n = 0;
        for (uint i = 0; i < 9; i++){
            if (_color[clases[i]] == 0) {
                clasesD[d] = clases[i];
                d++;
            } if (_color[clases[i]] == 1) {
                clases[9 + n] = clases[i];
                n++;
            }
        }
        string memory tokenClase;
        if (d > 0){
            tokenClase = string(abi.encodePacked(claseToken(tokenId1), claseToken(clasesD[_calculateURI(tokenCount + 1, d) - 1])));
        } else {
            tokenClase = string(abi.encodePacked(claseToken(tokenId1), claseToken(clases[_calculateURI(tokenCount + 1, 9 + n) - 1])));
        }
        string memory baseURI_ = "https://ipfs.io/ipfs/QmVPqReUDz3r7DHAJDMxgaDXwtWckUJQqsQWSgR5uNQYHn/";
        string memory finalURI = ".png";
        string memory tokenURI_ = string(abi.encodePacked(string(abi.encodePacked(baseURI_, tokenClase)), finalURI));
        _mintWithURI(to, tokenURI_);
        _parents[tokenCount] = [tokenId1, tokenId2, tokenId3];
        _block(_parents[tokenCount]);
        _numClase[tokenCount] = tokenClase;
        _lvl[tokenCount] = 3;
        _allowToEarn[tokenCount] = _allowToEarn[tokenId1];
    }

    function upgrade(uint256 tokenId1, uint256 tokenId2, uint256 tokenId3) public virtual {
        require((_lvl[tokenId1] == _lvl[tokenId2]) && (_lvl[tokenId1] == _lvl[tokenId3]), "los token deben ser del mismo lvl");
        require((_allowToEarn[tokenId1] == _allowToEarn[tokenId2]) && (_allowToEarn[tokenId1] == _allowToEarn[tokenId3]),
                "los token deben ser del mismo tipo");
        require(!_blocked[tokenId1] || !_blocked[tokenId2] || !_blocked[tokenId3], "un token esta blockeado");
        require(_lvl[tokenId1] != 3, "no se puede usar un token lvl 3");
        require(((ownerOf(tokenId1) == ownerOf(tokenId2)) && (ownerOf(tokenId1) == ownerOf(tokenId3))) && (ownerOf(tokenId1) == msg.sender),
                "los token deben pertenecerte");

        if (_lvl[tokenId1] == 1) {
            upgradeLvl2(msg.sender, tokenId1, tokenId2, tokenId3);
        } else {
            upgradeLvl3(msg.sender, tokenId1, tokenId2, tokenId3);
        }

        _safeTransfer(msg.sender, poolNFTaddress, tokenId1, "");
        _safeTransfer(msg.sender, poolNFTaddress, tokenId2, "");
        _safeTransfer(msg.sender, poolNFTaddress, tokenId3, "");

        poolNFT.guardar(tokenId1, msg.sender);
        poolNFT.guardar(tokenId2, msg.sender);
        poolNFT.guardar(tokenId3, msg.sender);
    }

    function downgrade(uint256 tokenId) public virtual {
        require(_lvl[tokenId] > 1, "el token debe ser de lvl mayor a 1");
        require(ownerOf(tokenId) == msg.sender, "el token debe pertenecerte");
        _blocked[_parents[tokenId][0]] = false;
        _blocked[_parents[tokenId][1]] = false;
        _blocked[_parents[tokenId][2]] = false;

        poolNFT.guardar(_parents[tokenId][0], msg.sender);
        poolNFT.guardar(_parents[tokenId][1], msg.sender);
        poolNFT.guardar(_parents[tokenId][2], msg.sender);
        
        poolNFT.sacar(_parents[tokenId][0], msg.sender);
        poolNFT.sacar(_parents[tokenId][1], msg.sender);
        poolNFT.sacar(_parents[tokenId][2], msg.sender);

        _burn(tokenId);
    }
}
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";
import "../node_modules/@openzeppelin/contracts/utils/Context.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol";

contract DiegoCorpNFT is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;

    // Actual URL base for the URI
    string private baseURI = "https://ipfs.io/ipfs/Qma83g29rCaG1NuifSokkeRsu92S3ZE46PfQVYjCM3cquf";
    

    // Module for the calculation of token URI
    uint256 private mod = 8;

    // Actual token count
    uint256 private tokenCount;

    // Limit token mint
    uint256 public limite = 1000;

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

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owner];
    }

    /**
     * @dev Returns the number of tokens.
     */
    function balance() public view virtual returns (uint256) {
        return tokenCount;
    }

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _ownerOf(tokenId);
        require(owner != address(0), "ERC721: invalid token ID");
        return owner;
    }

    /**
     * @dev Returns the token collection name.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the token collection symbol.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
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
    function _baseURI() internal view returns (string memory) {
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
            _addClase(carpetas[i], clases_[i]);
        }
        _setDorados(ld, dorados);
        _setMorados(lm, morados);
        _setBaseURI(newBaseURI);
    }

    function _getColor(uint256 tokenId) public view returns (uint256) {
        return _color[tokenId];
    }

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = DiegoCorpNFT.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not token owner or approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        _requireMinted(tokenId);

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Note that the caller is responsible to confirm that the recipient is capable of receiving ERC721
     * or else they may be permanently lost. Usage of {safeTransferFrom} prevents loss, though the caller must
     * understand this adds an external call which potentially creates a reentrancy vulnerability.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _safeTransfer(from, to, tokenId, data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns the owner of the `tokenId`. Does NOT revert if token doesn't exist
     */
    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        return _owners[tokenId];
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        address owner = DiegoCorpNFT.ownerOf(tokenId);
        return (spender == owner || isApprovedForAll(owner, spender) || getApproved(tokenId) == spender);
    }

    function _mintTokenAllowedToEarn(address to) public virtual {
        _safeMint(to);
        _allowToEarn[tokenCount] = true;
    }

    function _mintTokenNotAllowedToEarn(address to) public virtual {
        _safeMint(to);
        _allowToEarn[tokenCount] = false;
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to) internal virtual {
        _safeMint(to, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        bytes memory data
    ) internal virtual {
        _mint(to);
        uint256 tokenId = tokenCount + 1;
        require(
            _checkOnERC721Received(address(0), to, tokenId, data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to) internal virtual {
        require(tokenCount < limite, "no puede minitear mas de 3 prro");
        require(to != address(0), "ERC721: mint to the zero address");

        uint256 tokenId = tokenCount + 1;

        _beforeTokenTransfer(address(0), to, tokenId);

        // Check that tokenId was not minted by `_beforeTokenTransfer` hook
        require(!_exists(tokenId), "ERC721: token already minted");

        unchecked {
            // Will not overflow unless all 2**256 token ids are minted to the same owner.
            // Given that tokens are minted one by one, it is impossible in practice that
            // this ever happens. Might change if we allow batch minting.
            // The ERC fails to describe this case.
            _balances[to] += 1;
        }

        _owners[tokenId] = to;

        string memory base = _baseURI();

        string memory finalURI = ".png";

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

        emit Transfer(address(0), to, tokenId);

        _afterTokenTransfer(address(0), to, tokenId);

        tokenCount++;
    }

    function _mintWithURI(address to, string memory URI) internal virtual {
        require(tokenCount < limite, "no puede minitear mas de 3 prro");
        require(to != address(0), "ERC721: mint to the zero address");

        uint256 tokenId = tokenCount + 1;

        _beforeTokenTransfer(address(0), to, tokenId);

        // Check that tokenId was not minted by `_beforeTokenTransfer` hook
        require(!_exists(tokenId), "ERC721: token already minted");

        unchecked {
            // Will not overflow unless all 2**256 token ids are minted to the same owner.
            // Given that tokens are minted one by one, it is impossible in practice that
            // this ever happens. Might change if we allow batch minting.
            // The ERC fails to describe this case.
            _balances[to] += 1;
        }

        _owners[tokenId] = to;

        //string memory base = _baseURI();
//
        //string memory finalURI = ".png";
//
        string memory _tokenURI = URI;

        _tokenURIs[tokenId] = _tokenURI;

        _tanda[tokenId] = tanda_;

        //_numClase[tokenId] = (tanda_ * 100) + _calculateURI(tokenId, mod);

        emit Transfer(address(0), to, tokenId);

        _afterTokenTransfer(address(0), to, tokenId);

        tokenCount++;
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
    function _burn(uint256 tokenId) internal virtual {
        address owner = DiegoCorpNFT.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Update ownership in case tokenId was transferred by `_beforeTokenTransfer` hook
        owner = DiegoCorpNFT.ownerOf(tokenId);

        // Clear approvals
        delete _tokenApprovals[tokenId];

        unchecked {
            // Cannot overflow, as that would require more tokens to be burned/transferred
            // out than the owner initially received through minting and transferring in.
            _balances[owner] -= 1;
        }
        delete _owners[tokenId];

        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }

        emit Transfer(owner, address(0), tokenId);

        _afterTokenTransfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(DiegoCorpNFT.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Check that tokenId was not transferred by `_beforeTokenTransfer` hook
        require(DiegoCorpNFT.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");

        // Clear approvals from the previous owner
        delete _tokenApprovals[tokenId];

        unchecked {
            // `_balances[from]` cannot overflow for the same reason as described in `_burn`:
            // `from`'s balance is the number of token held, which is at least one before the current
            // transfer.
            // `_balances[to]` could overflow in the conditions described in `_mint`. That would require
            // all 2**256 token ids to be minted, which in practice is impossible.
            _balances[from] -= 1;
            _balances[to] += 1;
        }
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);

        _afterTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits an {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(DiegoCorpNFT.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Approve `operator` to operate on all of `owner` tokens
     *
     * Emits an {ApprovalForAll} event.
     */
    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    /**
     * @dev Reverts if the `tokenId` has not been minted yet.
     */
    function _requireMinted(uint256 tokenId) internal view virtual {
        require(_exists(tokenId), "ERC721: invalid token ID");
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any (single) token transfer. This includes minting and burning.
     * See {_beforeConsecutiveTokenTransfer}.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called after any (single) transfer of tokens. This includes minting and burning.
     * See {_afterConsecutiveTokenTransfer}.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called before "consecutive token transfers" as defined in ERC2309 and implemented in
     * {ERC721Consecutive}.
     * Calling conditions are similar to {_beforeTokenTransfer}.
     */
    function _beforeConsecutiveTokenTransfer(
        address from,
        address to,
        uint256, /*first*/
        uint96 size
    ) internal virtual {
        if (from != address(0)) {
            _balances[from] -= size;
        }
        if (to != address(0)) {
            _balances[to] += size;
        }
    }

    /**
     * @dev Hook that is called after "consecutive token transfers" as defined in ERC2309 and implemented in
     * {ERC721Consecutive}.
     * Calling conditions are similar to {_afterTokenTransfer}.
     */
    function _afterConsecutiveTokenTransfer(
        address, /*from*/
        address, /*to*/
        uint256, /*first*/
        uint96 /*size*/
    ) internal virtual {}

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

    function _upgradeLvl2(address to, uint256 tokenId1, uint256 tokenId2, uint256 tokenId3) internal virtual {
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
        string memory baseURI_ = "https://ipfs.io/ipfs/QmVPqReUDz3r7DHAJDMxgaDXwtWckUJQqsQWSgR5uNQYHn/";
        string memory finalURI = ".png";
        string memory tokenURI_ = string(abi.encodePacked(string(abi.encodePacked(baseURI_, tokenClase)), finalURI));
        _mintWithURI(to, tokenURI_);
        _parents[tokenCount] = [tokenId1, tokenId2, tokenId3];
        _block(_parents[tokenCount]);
        _numClase[tokenCount] = tokenClase;
        _lvl[tokenCount] = 2;
        _allowToEarn[tokenCount] = _allowToEarn[tokenId1];
    }

    function _upgradeLvl3(address to, uint256 tokenId1, uint256 tokenId2, uint256 tokenId3) internal virtual {
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

    function _upgrade(uint256 tokenId1, uint256 tokenId2, uint256 tokenId3) public virtual {
        require((_lvl[tokenId1] == _lvl[tokenId2]) && (_lvl[tokenId1] == _lvl[tokenId3]), "los token deben ser del mismo lvl");
        require((_allowToEarn[tokenId1] == _allowToEarn[tokenId2]) && (_allowToEarn[tokenId1] == _allowToEarn[tokenId3]),
                "los token deben ser del mismo tipo");
        require(!_blocked[tokenId1] || !_blocked[tokenId2] || !_blocked[tokenId3], "un token esta blockeado");
        require(_lvl[tokenId1] != 3, "no se puede usar un token lvl 3");
        require(((_owners[tokenId1] == _owners[tokenId2]) && (_owners[tokenId1] == _owners[tokenId3])) && (_owners[tokenId1] == msg.sender),
                "los token deben pertenecerte");
        if (_lvl[tokenId1] == 1) {
            _upgradeLvl2(msg.sender, tokenId1, tokenId2, tokenId3);
        } else {
            _upgradeLvl3(msg.sender, tokenId1, tokenId2, tokenId3);
        }
    }

    function _downgrade(uint256 tokenId) public virtual {
        require(_lvl[tokenId] > 1, "el token debe ser de lvl mayor a 1");
        require(_owners[tokenId] == msg.sender, "el token debe pertenecerte");
        _blocked[_parents[tokenId][0]] = false;
        _blocked[_parents[tokenId][1]] = false;
        _blocked[_parents[tokenId][2]] = false;
        if (_owners[_parents[tokenId][0]] != msg.sender) {
            delete _tokenApprovals[_parents[tokenId][0]];
            delete _tokenApprovals[_parents[tokenId][1]];
            delete _tokenApprovals[_parents[tokenId][2]];

            unchecked {
                _balances[_owners[_parents[tokenId][0]]] -= 3;
                _balances[msg.sender] += 3;
            }
            _owners[_parents[tokenId][0]] = msg.sender;
            _owners[_parents[tokenId][1]] = msg.sender;
            _owners[_parents[tokenId][2]] = msg.sender;

            //emit Transfer(from, to, tokenId);
        }
        _burn(tokenId);
    }
}
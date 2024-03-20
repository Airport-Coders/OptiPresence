//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/*
 * @title UserRegistry
 * @dev Manages user registrations and facial identifiers, with added security features.
 */
contract UserRegistry {
	struct User {
		string name;
		string faceHash; // IPFS hash of the user's face image
	}

	mapping(address => User) private users; // Private for better encapsulation

	event UserRegistered(
		address indexed userAddress,
		string name,
		string faceHash
	); // Event for new user registrations
	event UserUpdated(
		address indexed userAddress,
		string name,
		string faceHash
	); // Event for user information updates

	// Modifier to ensure user exists
	modifier userExists(address userAddress) {
		require(
			bytes(users[userAddress].name).length != 0,
			"User does not exist"
		);
		_;
	}

	// Modifier to ensure user does not exist
	modifier userDoesNotExist(address userAddress) {
		require(
			bytes(users[userAddress].name).length == 0,
			"User already exists"
		);
		_;
	}

	// Modifier for validating IPFS hashes
	modifier validIPFSHash(string memory _faceHash) {
		require(bytes(_faceHash).length == 46, "Invalid IPFS hash"); // Basic check for IPFS hash length
		_;
	}

	// Modifier for validating user's name
	modifier validName(string memory _name) {
		require(bytes(_name).length > 0, "Invalid name");
		require(bytes(_name).length <= 64, "Name too long");
		_;
	}

	/*
	 * @dev Registers a new user or updates an existing user's information.
	 * @param _name User's name.
	 * @param _faceHash IPFS hash of the user's face image.
	 */
	function registerUser(
		string calldata _name,
		string calldata _faceHash
	)
		public
		userDoesNotExist(msg.sender)
		validIPFSHash(_faceHash)
		validName(_name)
	{
		users[msg.sender] = User(_name, _faceHash);

		emit UserRegistered(msg.sender, _name, _faceHash);
	}

	/*
	 * @dev Retrieves user information.
	 * @param _userAddress Address of the user.
	 * @return User information.
	 */
	function getUserInfo(
		address _userAddress
	) external view userExists(_userAddress) returns (User memory) {
		return users[_userAddress];
	}

	/*
	 * @dev Retrieves user information for the caller.
	 * @return User information.
	 */
	function getMyInfo()
		external
		view
		userExists(msg.sender)
		returns (User memory)
	{
		return users[msg.sender];
	}

	/*
	 * @dev Updates the user's information.
	 * @param _name User's name.
	 * @param _faceHash IPFS hash of the user's face image.
	 */
	function updateUserInfo(
		string calldata _name,
		string calldata _faceHash
	)
		external
		userExists(msg.sender)
		validIPFSHash(_faceHash)
		validName(_name)
	{
		users[msg.sender] = User(_name, _faceHash);

		emit UserUpdated(msg.sender, _name, _faceHash);
	}
}

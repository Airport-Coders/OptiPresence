//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/*
 * @title EventManager
 * @dev Manages event creation and details.
 */
contract EventManager {
	struct Event {
		string name;
		string description;
		string imageHash; // IPFS hash of the event's image
		string location; // Latitude and longitude: "lat, long"
		address owner;
		uint256 startTime; // Unix timestamp
		uint256 endTime; // Unix timestamp
		bool active;
	}

	Event[] public events;

	event EventCreated(uint256 indexed eventId, string name, address owner); // Event created

	// Modifier to ensure only the owner can perform an action
	modifier onlyOwner(uint256 _eventId) {
		require(
			msg.sender == events[_eventId].owner,
			"Only the owner can perform this action"
		);
		_;
	}

	// Modifier to ensure event exists
	modifier eventExists(uint256 _eventId) {
		require(_eventId < events.length, "Event does not exist");
		_;
	}

	// Modifier for validating time range
	modifier validTime(uint256 _startTime, uint256 _endTime) {
		require(_startTime < _endTime, "Invalid time range");
		_;
	}

	// Modifier for validating location
	modifier validLocation(string memory _location) {
		require(bytes(_location).length > 0, "Invalid location");
		_;
	}

	// Modifier for validating event name
	modifier validName(string memory _name) {
		require(bytes(_name).length > 0, "Invalid name");
		require(bytes(_name).length <= 128, "Name too long");
		_;
	}

	// Modifier for validating event description
	modifier validDescription(string memory _description) {
		require(bytes(_description).length > 0, "Invalid description");
		require(bytes(_description).length <= 1024, "Description too long");
		_;
	}

	// Modifier for validating IPFS hashes
	modifier validImageHash(string memory _imageHash) {
		require(bytes(_imageHash).length == 46, "Invalid IPFS hash");
		_;
	}

	/*
	 * @dev Sets event details.
	 * @param _eventId ID of the event.
	 * @param _name Name of the event.
	 * @param _description Description of the event.
	 * @param _imageHash IPFS hash of the event's image.
	 * @param _location Location of the event (description or coordinates).
	 * @param _startTime Start time of the event.
	 * @param _endTime End time of the event.
	 * @param _active Whether the event is active.
	 * @param _isNewEvent Whether the event is new.
	 */
	function _setEvent(
		uint256 _eventId,
		string memory _name,
		string memory _description,
		string memory _imageHash,
		string memory _location,
		uint256 _startTime,
		uint256 _endTime,
		bool _active,
		bool _isNewEvent
	) private {
		Event memory newEvent = Event({
			name: _name,
			description: _description,
			imageHash: _imageHash,
			location: _location,
			owner: msg.sender,
			startTime: _startTime,
			endTime: _endTime,
			active: _active
		});

		if (_isNewEvent) {
			events.push(newEvent);
			emit EventCreated(events.length - 1, _name, msg.sender);
		} else {
			events[_eventId] = newEvent;
		}
	}

	/*
	 * @dev Creates a new event.
	 * @param _name Name of the event.
	 * @param _description Description of the event.
	 * @param _imageHash IPFS hash of the event's image.
	 * @param _location Location of the event (description or coordinates).
	 * @param _startTime Start time of the event.
	 * @param _endTime End time of the event.
	 */
	function createEvent(
		string calldata _name,
		string calldata _description,
		string calldata _imageHash,
		string calldata _location,
		uint256 _startTime,
		uint256 _endTime
	)
		external
		validName(_name)
		validDescription(_description)
		validImageHash(_imageHash)
		validLocation(_location)
		validTime(_startTime, _endTime)
	{
		_setEvent(
			0,
			_name,
			_description,
			_imageHash,
			_location,
			_startTime,
			_endTime,
			true,
			true
		);
	}

	/*
	 * @dev Updates event information.
	 * @param _eventId ID of the event.
	 * @param _name Name of the event.
	 * @param _location Location of the event (description or coordinates).
	 * @param _startTime Start time of the event.
	 * @param _endTime End time of the event.
	 */
	function updateEvent(
		uint256 _eventId,
		string calldata _name,
		string calldata _description,
		string calldata _imageHash,
		string calldata _location,
		uint256 _startTime,
		uint256 _endTime,
		bool _active
	)
		external
		eventExists(_eventId)
		onlyOwner(_eventId)
		validName(_name)
		validDescription(_description)
		validImageHash(_imageHash)
		validLocation(_location)
		validTime(_startTime, _endTime)
	{
		_setEvent(
			_eventId,
			_name,
			_description,
			_imageHash,
			_location,
			_startTime,
			_endTime,
			_active,
			false
		);
	}

	/*
	 * @dev Retrieves event information.
	 * @param _eventId ID of the event.
	 * @return Event information.
	 */
	function getEvent(uint256 _eventId) external view returns (Event memory) {
		return events[_eventId];
	}

	/*
	 * @dev Retrieves all events.
	 * @return All events.
	 */
	function getAllEvents() external view returns (Event[] memory) {
		return events;
	}
}

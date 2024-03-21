//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./EventManager.sol";

/*
 * @title CheckInManager
 * @dev Manages check-in requests and validations.
 */
contract CheckInManager {
	enum CheckInStatus {
		Pending,
		Confirmed,
		Rejected
	}

	struct CheckIn {
		uint8 id;
		address user;
		string faceHash; // IPFS hash of the user's face image
		string location; // Latitude and longitude: "lat, long"
		uint256 timestamp; // Timestamp of the check-in request
		CheckInStatus status;
	}

	mapping(uint256 => mapping(address => CheckIn[])) private checkIns; // Check-ins for each event
	mapping(uint256 => address[]) private checkInEventUser; // Users who have checked in for an event

	EventManager private eventManager; // EventManager contract reference

	address public offchainValidator; // Address of the off-chain validator

	event CheckInRequested(
		uint256 indexed eventId,
		address indexed user,
		uint8 indexed checkInId,
		string faceHash,
		string location
	); // Event for check-in requests
	event CheckInConfirmed(
		uint256 indexed eventId,
		address indexed user,
		uint8 indexed checkInId
	); // Event for confirmed check-ins
	event CheckInRejected(
		uint256 indexed eventId,
		address indexed user,
		uint8 indexed checkInId
	); // Event for rejected check-ins

	// Check if the event exists
	modifier eventExists(uint256 _eventId) {
		require(eventManager.getEvent(_eventId).active, "Event does not exist");
		_;
	}

	// Check if the event is ongoing
	modifier eventIsOngoing(uint256 _eventId) {
		require(
			block.timestamp > eventManager.getEvent(_eventId).startTime,
			"Event has not started"
		);
		require(
			block.timestamp < eventManager.getEvent(_eventId).endTime,
			"Event has ended"
		);
		_;
	}

	// Check if the user has not reached the maximum check-ins
	modifier checkMaxCheckIns(uint256 _eventId, address _user) {
		require(
			checkIns[_eventId][_user].length < 3,
			"Maximum check-ins tries reached"
		);
		_;
	}

	// Only the off-chain validator can perform this action
	modifier onlyOffchainValidator() {
		require(
			msg.sender == offchainValidator,
			"Only the off-chain validator can perform this action"
		);
		_;
	}

	// Check if already has checkin approved in the event
	modifier checkAlreadyCheckInApproved(uint256 _eventId, address _user) {
		bool alreadyCheckIn = false;

		for (uint256 i = 0; i < checkInEventUser[_eventId].length; i++) {
			if (checkInEventUser[_eventId][i] == _user) {
				alreadyCheckIn = true;
				break;
			}
		}

		require(alreadyCheckIn, "User already checked in");
		_;
	}

	/*
	 * @dev Constructor to set the EventManager contract address and the off-chain validator address.
	 * @param _eventManagerDeployed Address of the deployed EventManager contract.
	 * @param _offchainValidator Address of the off-chain validator.
	 */
	constructor(address _eventManagerDeployed) {
		require(
			_eventManagerDeployed != address(0),
			"Invalid EventManager address"
		);

		eventManager = EventManager(_eventManagerDeployed);
		offchainValidator = msg.sender;
	}

	/*
	 * @dev Set the off-chain validator address.
	 * @param _offchainValidator Address of the off-chain validator.
	 */
	function setOffchainValidator(
		address _offchainValidator
	) external onlyOffchainValidator {
		offchainValidator = _offchainValidator;
	}

	/*
	 * @dev Request check-in for an event.
	 * @param _eventId ID of the event to check into.
	 * @param faceHash IPFS hash of the user's face image.
	 * @param location Location of the user at the time of check-in.
	 */
	function requestCheckIn(
		uint256 _eventId,
		string calldata faceHash,
		string calldata location
	)
		external
		eventExists(_eventId)
		eventIsOngoing(_eventId)
		checkMaxCheckIns(_eventId, msg.sender)
	{
		uint8 checkInId = uint8(checkIns[_eventId][msg.sender].length);
		checkIns[_eventId][msg.sender].push(
			CheckIn({
				id: checkInId,
				user: msg.sender,
				faceHash: faceHash,
				location: location,
				timestamp: block.timestamp,
				status: CheckInStatus.Pending
			})
		);

		emit CheckInRequested(
			_eventId,
			msg.sender,
			checkInId,
			faceHash,
			location
		);
	}

	/*
	 * @dev Confirm check-in after off-chain validation.
	 * This would be called by the backend after successful validation.
	 * @param _eventId ID of the event.
	 * @param _user Address of the user.
	 * @param _checkInId ID of the check-in request.
	 * @param _status Status of the check-in request.
	 */
	function replyCheckIn(
		uint256 _eventId,
		address _user,
		uint8 _checkInId,
		bool _approved
	) external eventExists(_eventId) onlyOffchainValidator {
		checkIns[_eventId][_user][_checkInId].status = _approved
			? CheckInStatus.Confirmed
			: CheckInStatus.Rejected;

		if (_approved) {
			checkInEventUser[_eventId].push(_user);
		}

		if (_approved) {
			emit CheckInConfirmed(_eventId, _user, _checkInId);
		} else {
			emit CheckInRejected(_eventId, _user, _checkInId);
		}
	}

	/*
	 * @dev Retrieves check-in requests for an event by the caller.
	 * @param _eventId ID of the event.
	 * @return Check-in requests.
	 */
	function getMyCheckIns(
		uint256 _eventId
	) external view returns (CheckIn[] memory) {
		return checkIns[_eventId][msg.sender];
	}

	/*
	 * @dev Retrieves check-in requests for an event by the user.
	 * @param _eventId ID of the event.
	 * @param _user Address of the user.
	 * @return Check-in requests.
	 */
	function getUserCheckIns(
		uint256 _eventId,
		address _user
	) external view returns (CheckIn[] memory) {
		return checkIns[_eventId][_user];
	}

	/*
	 * @dev Retrieves users checkins for an event.
	 * @param _eventId ID of the event.
	 * @return Users who have checked in.
	 */
	function getUsersCheckInsFromEvent(
		uint256 _eventId
	) external view returns (address[] memory) {
		return checkInEventUser[_eventId];
	}
}

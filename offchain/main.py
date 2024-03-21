import asyncio
from config import *

from utils.file_watcher import wait_for_file

from modules.blockchain_client import BlockchainClient
from modules.event_processor import log_loop

from services.facial_biometric import FaceComparatorService
from services.geolocation import Geolocation

contract_path = OptimismSepoliaContractPath
http_provider = HttpProviderAlchemy

face_comparator_service = FaceComparatorService()
blockchain_client = BlockchainClient(http_provider)
blockchain_client.load_contract(contract_path)


async def handle_event(event):
    checkin_request = event['args']
    '''
    emit CheckInRequested(
        _eventId,
        msg.sender,
        checkInId,
        unknownFaceHash,
        knownFaceHash,
        userLocation,
        eventLocation
    );
    '''
    def reply(result):
        blockchain_client.reply_to_checkin_request(
            checkin_request['eventId'],
            checkin_request['user'],
            checkin_request['checkInId'],
            result)

    print(f"CheckInRequested event received: {checkin_request}")

    face_match = face_comparator_service.compare_faces(checkin_request['knownFaceHash'], checkin_request['unknownFaceHash'])
    print(f"Face match result: {face_match}")

    if not face_match:
        reply(False)

    reply(True)


async def main():

    await wait_for_file(contract_path)

    event_filter = blockchain_client.contract.events.CheckInRequested.create_filter(fromBlock='latest')

    print("Waiting for events...")
    await log_loop(event_filter, handle_event)

if __name__ == "__main__":
    asyncio.run(main())

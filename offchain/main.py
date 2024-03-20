import asyncio
from config import *
from utils.file_watcher import wait_for_file
from modules.blockchain_client import BlockchainClient
from modules.event_processor import log_loop


async def handle_event(event):
    print(f"Received event: {event}")


async def main():
    contract_path = ScaffoldChainContractPath if not ALCHEMY_API_KEY else OptimismSepoliaContractPath
    http_provider = HttpProviderScaffold if not ALCHEMY_API_KEY else HttpProviderAlchemy

    await wait_for_file(contract_path)

    blockchain_client = BlockchainClient(http_provider, contract_path)
    event_filter = blockchain_client.contract.events.CheckinRequest.create_filter(fromBlock='latest')

    await log_loop(event_filter, handle_event)

if __name__ == "__main__":
    asyncio.run(main())

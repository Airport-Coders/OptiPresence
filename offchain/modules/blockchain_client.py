from web3 import Web3, HTTPProvider
from web3.middleware import geth_poa_middleware
import json


class BlockchainClient:
    def __init__(self, http_provider, contract_path):
        self.w3 = Web3(Web3.HTTPProvider(http_provider))
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        self.contract = None

    def load_contract(self, contract_path):
        with open(contract_path) as json_file:
            contract_json = json.load(json_file)
            contract_address = Web3.to_checksum_address(contract_json['address'])
            contract_abi = contract_json['abi']

            print(f"Loading contract at address: {contract_address}")
            self.contract = self.w3.eth.contract(address=contract_address, abi=contract_abi)

    def reply_to_checkin_request(self, event_id, user_address, checkin_id, result):
        self.contract.functions.replyCheckIn(event_id, user_address, checkin_id, result)

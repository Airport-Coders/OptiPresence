from web3 import Web3, HTTPProvider
from web3.middleware import geth_poa_middleware
import json
import requests


class BlockchainClient:
    def __init__(self, http_provider, private_key):
        self.w3 = Web3(Web3.HTTPProvider(http_provider))
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)
        self.account = self.w3.eth.account.from_key(private_key)
        self.contract = None

    def load_contract(self, contract_path_or_url):
        contract_json = None

        if contract_path_or_url.startswith('https'):
            contract_json = requests.get(contract_path_or_url).json()
        else:
            with open(contract_path) as json_file:
                contract_json = json.load(json_file)

        contract_address = Web3.to_checksum_address(contract_json['address'])
        contract_abi = contract_json['abi']

        print(f"Loading contract at address: {contract_address}")
        self.contract = self.w3.eth.contract(address=contract_address, abi=contract_abi)

    def reply_to_checkin_request(self, event_id, user_address, checkin_id, result):
        transaction = self.contract.functions.replyCheckIn(event_id, user_address, checkin_id, result).build_transaction({
            'from': self.account.address,
            'nonce': self.w3.eth.get_transaction_count(self.account.address),
        })
        signed_tx = self.w3.eth.account.sign_transaction(transaction, private_key=self.account.key)
        tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        self.w3.eth.wait_for_transaction_receipt(tx_hash)

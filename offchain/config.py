import os

ALCHEMY_API_KEY = os.getenv('ALCHEMY_API_KEY')

ScaffoldChainContractPath = '/deployments/scaffold-chain/YourContract.json'
OptimismSepoliaContractPath = '/deployments/optimismSepolia/YourContract.json'

HttpProviderScaffold = 'http://scaffold-chain:8545'
HttpProviderAlchemy = f'https://opt-sepolia.g.alchemy.com/v2/{ALCHEMY_API_KEY}' if ALCHEMY_API_KEY else None

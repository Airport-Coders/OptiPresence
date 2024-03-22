import os

ALCHEMY_API_KEY = os.getenv('ALCHEMY_API_KEY')
PINATA_GATEWAY = os.getenv('PINATA_GATEWAY')
DEPLOYER_PRIVATE_KEY = os.getenv('DEPLOYER_PRIVATE_KEY')
CONTRACT_CheckInManager = os.getenv('CONTRACT_CheckInManager')

OptimismSepoliaContractPath = '/deployments/optimismSepolia/CheckInManager.json'
HttpProviderAlchemy = f'https://opt-sepolia.g.alchemy.com/v2/{ALCHEMY_API_KEY}'

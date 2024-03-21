import os

ALCHEMY_API_KEY = os.getenv('ALCHEMY_API_KEY')
PINATA_GATEWAY = os.getenv('PINATA_GATEWAY')

OptimismSepoliaContractPath = '/deployments/optimismSepolia/CheckInManager.json'
HttpProviderAlchemy = f'https://opt-sepolia.g.alchemy.com/v2/{ALCHEMY_API_KEY}'

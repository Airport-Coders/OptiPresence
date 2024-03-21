import os

ALCHEMY_API_KEY = os.getenv('ALCHEMY_API_KEY')

OptimismSepoliaContractPath = '/deployments/optimismSepolia/CheckInManager.json'
HttpProviderAlchemy = f'https://opt-sepolia.g.alchemy.com/v2/{ALCHEMY_API_KEY}'

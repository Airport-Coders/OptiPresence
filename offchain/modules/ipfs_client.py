import requests
from mimetypes import guess_extension
from config import PINATA_GATEWAY


class IPFSClient:
    def __init__(self):
        self.gateway = PINATA_GATEWAY
        if not self.gateway.startswith("https://"):
            self.gateway = f"https://{self.gateway}"

        if self.gateway.endswith("/"):
            self.gateway = self.gateway[:-1]

    def download_file(self, ipfs_hash, filename):
        response = requests.get(f"{self.gateway}/ipfs/{ipfs_hash}")
        content_type = response.headers['Content-Type']
        extension = guess_extension(content_type) if content_type else '.jpg'

        filename = f"{filename}{extension}"

        with open(filename, "wb") as buffer:
            buffer.write(response.content)

        return filename


if __name__ == "__main__":
    ipfs_client = IPFSClient()
    ipfs_client.download_file("QmWK3pEw4JyFk9A3H3qzyUbGrp41qiJHtiPUnxoFQicSit", "test")

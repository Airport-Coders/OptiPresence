from datetime import datetime
import shutil
import os

from modules.image_processor import ImageProcessor
from modules.face_comparator import FaceComparator
from modules.ipfs_client import IPFSClient

ipfs_client = IPFSClient()


class FaceComparatorService:
    def __init__(self, cache_dir='cache'):
        self.cache_dir = cache_dir
        os.makedirs(self.cache_dir, exist_ok=True)

    def _save_file(self, file_hash, filename):
        return ipfs_client.download_file(file_hash, filename)

    def _cleanup_files(self, filenames):
        for filename in filenames:
            os.remove(filename)

    def compare_faces(self, known_file_hash, unknown_file_hash):
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        known_filename = f"{self.cache_dir}/known_{timestamp}"
        unknown_filename = f"{self.cache_dir}/unknown_{timestamp}"

        known_filename = self._save_file(known_file_hash, known_filename)
        unknown_filename = self._save_file(unknown_file_hash, unknown_filename)

        known_image = ImageProcessor.load_image(known_filename)
        unknown_image = ImageProcessor.load_image(unknown_filename)

        known_encodings = ImageProcessor.get_face_encodings(known_image)
        unknown_encodings = ImageProcessor.get_face_encodings(unknown_image)

        if len(known_encodings) != 1 or len(unknown_encodings) != 1:
            self._cleanup_files([known_filename, unknown_filename])
            return {"error": "Each image should contain exactly one face"}

        results = [result.item() for result in FaceComparator.compare_faces(known_encodings, unknown_encoding=unknown_encodings[0])]

        self._cleanup_files([known_filename, unknown_filename])

        return results[0]

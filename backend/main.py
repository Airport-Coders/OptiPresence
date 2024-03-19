from fastapi import FastAPI, File, UploadFile, Response, status
from datetime import datetime
import shutil
import os

from modules.image_processor import ImageProcessor
from modules.face_comparator import FaceComparator

app = FastAPI()


@app.post("/compare-faces/")
async def compare_faces(known: UploadFile, unknown: UploadFile, response: Response):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

    known_filename = f"cache/known_{timestamp}.{known.filename.split('.')[-1]}"
    unknown_filename = f"cache/unknown_{timestamp}.{unknown.filename.split('.')[-1]}"

    os.makedirs('cache', exist_ok=True)

    with open(known_filename, "wb") as buffer:
        shutil.copyfileobj(known.file, buffer)
    with open(unknown_filename, "wb") as buffer:
        shutil.copyfileobj(unknown.file, buffer)

    known_image = ImageProcessor.load_image(known_filename)
    unknown_image = ImageProcessor.load_image(unknown_filename)

    known_encodings = ImageProcessor.get_face_encodings(known_image)
    unknown_encodings = ImageProcessor.get_face_encodings(unknown_image)

    if len(known_encodings) != 1 or len(unknown_encodings) != 1:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Each image should contain exactly one face"}

    results = [result.item() for result in FaceComparator.compare_faces(known_encodings, unknown_encoding=unknown_encodings[0])]

    os.remove(known_filename)
    os.remove(unknown_filename)

    response.status_code = status.HTTP_200_OK
    return {"match": results[0]}

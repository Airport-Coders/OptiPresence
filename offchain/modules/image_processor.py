import face_recognition


class ImageProcessor:
    @staticmethod
    def load_image(image_path: str):
        return face_recognition.load_image_file(image_path)

    @staticmethod
    def get_face_encodings(image):
        return face_recognition.face_encodings(image)

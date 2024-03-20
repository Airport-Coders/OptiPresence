import face_recognition


class FaceComparator:
    @staticmethod
    def compare_faces(known_encodings, unknown_encoding):
        return face_recognition.compare_faces(known_encodings, unknown_encoding)

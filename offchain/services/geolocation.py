from geopy.geocoders import Nominatim
from geopy.distance import geodesic


class GeolocationService:
    def __init__(self):
        self.geolocator = Nominatim(user_agent="geolocation")

    def distance(self, location1, location2):
        coord1 = self.geolocator.geocode(location1)
        coord2 = self.geolocator.geocode(location2)
        return geodesic(coord1.point, coord2.point).meters


if __name__ == "__main__":
    geolocation = GeolocationService()
    print(geolocation.distance("41.49008,-71.312796", "41.49053,-71.312796"))

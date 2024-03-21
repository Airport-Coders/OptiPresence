from geopy.geocoders import Nominatim
from geopy.distance import geodesic


class Geolocation:
    def __init__(self):
        self.geolocator = Nominatim(user_agent="geolocation")

    def distance(self, location1, location2):
        coord1 = self.geolocator.geocode(location1)
        coord2 = self.geolocator.geocode(location2)
        return geodesic(coord1.point, coord2.point).meters


if __name__ == "__main__":
    geolocation = Geolocation()
    print(geolocation.distance("41.49008,-71.312796", "41.499498,-81.695391"))

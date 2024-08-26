from rest_framework import serializers

from cars.models import Images, Cars

from rental.serializers import RentalSerializer


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ['url']


class CarsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Cars
        fields = ['id', 'model', 'day_price', 'brand', 'type', 'category', 'status', 'image']

    def get_image(self, obj):
        first_image = obj.images.first()
        if first_image:
            return ImagesSerializer(first_image).data
        return None


class CarsDetailSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True, required=False)
    rentals = RentalSerializer(many=True, read_only=True)
    similars = serializers.SerializerMethodField()

    class Meta:
        model = Cars
        fields = ['id', 'model', 'brand', 'type', 'category', 'description', 'status', 'day_price', 'seats', 'odometer', 'images', 'similars', 'rentals']


    def get_similars(self, obj):
        similars = Cars.objects.filter(type=obj.type).exclude(id=obj.id)[:4]
        return CarsSerializer(similars, many=True).data
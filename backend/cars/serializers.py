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
        fields = ['id', 'model', 'day_price', 'image']

    def get_image(self, obj):
        first_image = obj.images.first()
        if first_image:
            return ImagesSerializer(first_image).data
        return None


class CarsDetailSerializer(serializers.ModelSerializer):
    images = ImagesSerializer(many=True, required=False)
    rentals = RentalSerializer(many=True, read_only=True)  # Add this line

    class Meta:
        model = Cars
        fields = ['id', 'model', 'brand', 'type', 'category', 'description', 'status', 'day_price', 'seats', 'odometer', 'images', 'rentals']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        car = Cars.objects.create(**validated_data)
        
        for image_data in images_data:
            image = Images.objects.create(**image_data)
            car.images.add(image)
        
        return car

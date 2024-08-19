from rest_framework import serializers

from cars.models import Images, Cars


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

    class Meta:
        model = Cars
        fields = ['id', 'model', 'brand', 'type', 'category', 'description', 'status', 'day_price', 'seats', 'odometer', 'images']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        car = Cars.objects.create(**validated_data)
        
        for image_data in images_data:
            image = Images.objects.create(**image_data)
            car.images.add(image)
        
        return car

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', [])
        
        instance.model = validated_data.get('model', instance.model)
        instance.brand = validated_data.get('brand', instance.brand)
        instance.type = validated_data.get('type', instance.type)
        instance.category = validated_data.get('category', instance.category)
        instance.description = validated_data.get('description', instance.description)
        instance.status = validated_data.get('status', instance.status)
        instance.day_price = validated_data.get('day_price', instance.day_price)
        instance.seats = validated_data.get('seats', instance.seats)
        instance.odometer = validated_data.get('odometer', instance.odometer)
        instance.save()

        if images_data:
            instance.images.clear()
            for image_data in images_data:
                image = Images.objects.create(**image_data)
                instance.images.add(image)

        return instance

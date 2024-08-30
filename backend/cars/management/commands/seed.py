from django.core.management.base import BaseCommand
from cars.models import Images, Cars
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Popula o banco de dados com uma quantidade definida de carros e imagens'

    def add_arguments(self, parser):
        parser.add_argument('--cars', type=int, default=10, help='Número de carros a serem criados')
        parser.add_argument('--images', type=int, default=10, help='Número de imagens a serem criadas')

    def handle(self, *args, **options):
        fake = Faker()

        # Criar imagens
        images = []
        for _ in range(options['images']):
            # Gera uma URL de imagem válida usando Lorem Picsum
            image_url = f"https://picsum.photos/seed/{random.randint(1, 1000)}/400/300"
            image = Images.objects.create(url=image_url)
            images.append(image)
        
        # Criar carros
        car_types = ['SUV', 'SEDAN', 'HATCHBACK', 'COUPE', 'WAGON', 'PICKUP']
        car_categories = ['ECONOMY', 'LUXURY', 'SPORT', 'OFFROAD', 'VAN']
        for _ in range(options['cars']):
            car = Cars.objects.create(
                model=fake.word(),
                brand=fake.company(),
                type=random.choice(car_types),
                category=random.choice(car_categories),
                description=fake.text(),
                status=random.choice([True, False]),
                day_price=fake.random_number(digits=3),
                seats=fake.random_int(min=2, max=7),
                odometer=fake.random_number(digits=5)
            )
            # Adicionar imagens aleatórias aos carros
            for image in random.sample(images, k=min(len(images), random.randint(1, 3))):
                car.images.add(image)
            
        self.stdout.write(self.style.SUCCESS('Dados inseridos com sucesso'))
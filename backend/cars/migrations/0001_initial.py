# Generated by Django 5.1 on 2024-08-17 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('url', models.URLField()),
            ],
            options={
                'verbose_name': 'Image',
                'verbose_name_plural': 'Images',
                'db_table': 'images',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Cars',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model', models.CharField(max_length=150)),
                ('brand', models.CharField(max_length=150)),
                ('type', models.CharField(choices=[('SUV', 'SUV'), ('SEDAN', 'Sedan'), ('HATCHBACK', 'Hatchback'), ('COUPE', 'Coupe'), ('WAGON', 'Wagon'), ('PICKUP', 'Pickup')], max_length=50)),
                ('category', models.CharField(choices=[('ECONOMY', 'Economy'), ('LUXURY', 'Luxury'), ('SPORT', 'Sport'), ('OFFROAD', 'Off-road'), ('VAN', 'Van')], max_length=50)),
                ('description', models.TextField(blank=True, null=True)),
                ('status', models.BooleanField(default=True)),
                ('day_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('seats', models.IntegerField()),
                ('odometer', models.IntegerField()),
                ('images', models.ManyToManyField(related_name='cars', to='cars.images')),
            ],
            options={
                'verbose_name': 'Car',
                'verbose_name_plural': 'Cars',
                'db_table': 'cars',
                'managed': True,
            },
        ),
    ]

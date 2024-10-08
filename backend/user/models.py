from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

from core.models import BaseModel


class UserManager(BaseUserManager):
    def create(self, email, cpf, password=None, **extra_fields):
        if not email:
            raise ValueError('O campo de email deve ser preenchido.')
        if not cpf:
            raise ValueError('O campo de CPF deve ser preenchido.')

        email = self.normalize_email(email)
        user = self.model(email=email, cpf=cpf, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, cpf, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superusuário precisa ter is_superuser=True.')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superusuário precisa ter is_staff=True.')

        return self.create(email, cpf, password, **extra_fields)

    def get_by_natural_key(self, email):
        return self.get(email=email)


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=150, blank=False, null=False)
    last_name = models.CharField(max_length=150, blank=False, null=False)
    email = models.EmailField(unique=True)
    cpf = models.CharField(max_length=14, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['cpf']

    objects = UserManager()

    class Meta:
        db_table = 'users'
        managed = True
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

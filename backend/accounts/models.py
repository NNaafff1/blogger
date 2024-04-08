from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManeger


# Create your models here.
class CustomUser(AbstractUser):
    username = models.CharField(max_length=100, unique=False, null=True)
    birthday = models.DateField(blank=True, null=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [ "birthday", "first_name", "last_name"]

    objects = CustomUserManeger()

    def __str__(self) -> str:
        return self.email

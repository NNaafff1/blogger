from django.contrib.auth.models import  UserManager

class CustomUserManeger(UserManager):
    def _create_user(
        self,
        email,
        password,
        birthday,
        first_name,
        last_name,
        **extra_fields,
    ):
        if not email:
            raise ValueError("Users must have email")
        if not first_name:
            raise ValueError("Users must have first name")
        if not last_name:
            raise ValueError("Users must have last name")
        if not birthday:
            raise ValueError("Users must have birthday")
        if not password:
            raise ValueError("Users must have a password")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            birthday=birthday,
            **extra_fields,
        )

        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_user(
        self,
        email,
        password=None,
        birthday=None,
        first_name=None,
        last_name=None,
        **extra_fields,
    ):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(
            email,
            password,
            birthday,
            first_name,
            last_name,
            **extra_fields,
        )

    def create_superuser(
        self,
        email,
        password=None,
        birthday=None,
        first_name=None,
        last_name=None,
        **extra_fields,
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(
            email,
            password,
            birthday,
            first_name,
            last_name,
            **extra_fields,
        )


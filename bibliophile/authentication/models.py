from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):
    class Validation(models.TextChoices):
        VALIDATED = 'V', _('Validated')
        NOTVALIDATED = 'NV', _('NotValidated')

    email = models.EmailField(_('email address'), unique=True)
    validated = models.CharField( max_length=2, choices=Validation.choices, default=Validation.NOTVALIDATED)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

class OtpValidation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    otp = models.CharField(max_length=10)
    
    class Meta:
        db_table = "OtpValidation"
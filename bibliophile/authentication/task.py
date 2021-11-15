from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta

from .models import User
from django.conf import settings

@shared_task
def send_mail_func(subject, message, to_email):
        send_mail(
            subject = subject,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[to_email],
            fail_silently=True,
        )
        return "Done"
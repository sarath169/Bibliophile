from celery import shared_task
from django.core.mail import send_mail
from django.core.mail.message import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils import timezone
from datetime import timedelta

from .models import User
from django.conf import settings

@shared_task
def send_mail_func(subject, content, otp, from_email, to_email, name):
    html_content = render_to_string("email_template.html",{'title': 'Password Change Request', 'content': content, 'name':name, 'otp': otp})
    print(html_content)
    text_content = strip_tags(html_content)
    print(text_content)
    email = EmailMultiAlternatives(
        subject = subject, from_email= from_email, to = [to_email], body = text_content
    )
    email.attach_alternative(html_content, "text/html")
    email.send()
    return "Done"
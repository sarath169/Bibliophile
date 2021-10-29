# Generated by Django 3.2.8 on 2021-10-27 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0010_alter_bookshelf_book_in_shelf'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookshelf',
            name='book_in_shelf',
            field=models.CharField(choices=[('RL', 'Readlist'), ('WL', 'Wishlist'), ('SL', 'Selflist')], max_length=2),
        ),
    ]

# Generated by Django 3.0.4 on 2021-11-16 09:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0015_auto_20211112_0506'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookSeoid',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seoid', models.CharField(max_length=1000, unique=True)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.Book')),
            ],
            options={
                'verbose_name': 'Book_SEOID',
                'verbose_name_plural': 'Book_SEOIDs',
                'db_table': 'book_seoid',
            },
        ),
    ]
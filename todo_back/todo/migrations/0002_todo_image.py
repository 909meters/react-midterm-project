# Generated by Django 3.2.8 on 2021-10-18 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='todo'),
        ),
    ]
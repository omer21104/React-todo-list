# Generated by Django 4.0.1 on 2022-02-06 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0005_lists'),
    ]

    operations = [
        migrations.AddField(
            model_name='todolistitem',
            name='associated_list',
            field=models.CharField(default='', max_length=40),
        ),
    ]

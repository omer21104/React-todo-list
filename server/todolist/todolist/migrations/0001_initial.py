# Generated by Django 4.0.1 on 2022-01-30 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TodoListItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('list_item_title', models.CharField(max_length=400)),
                ('creation_date', models.DateTimeField()),
            ],
        ),
    ]

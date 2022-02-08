# Generated by Django 4.0.1 on 2022-02-06 09:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0004_todolistitem_checked'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lists',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('list_name', models.CharField(max_length=100)),
                ('list_ref', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todolist.todolistitem')),
            ],
        ),
    ]
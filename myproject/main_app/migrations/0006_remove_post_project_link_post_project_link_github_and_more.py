# Generated by Django 4.2.3 on 2023-08-08 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0005_alter_profile_cover_pic_alter_profile_profile_pic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='project_link',
        ),
        migrations.AddField(
            model_name='post',
            name='project_link_github',
            field=models.CharField(default='#', max_length=200),
        ),
        migrations.AddField(
            model_name='post',
            name='project_link_live',
            field=models.CharField(default='#', max_length=200),
        ),
    ]
from django.db import models


class TodoListItem(models.Model):
    list_item_title = models.CharField(max_length=400)

    def __str__(self):
        return self.list_item_title

from django.db import models


class TodoListItem(models.Model):
    id = models.CharField(primary_key=True, max_length=40)
    list_item_title = models.CharField(max_length=400)
    checked = models.BooleanField(default=False)

    def __str__(self):
        return self.list_item_title

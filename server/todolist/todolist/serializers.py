from rest_framework import serializers
from .models import TodoListItem


class TodoListItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TodoListItem
        fields = ('id',
                  'list_item_title',
                  'checked')

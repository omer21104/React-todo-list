from ..models import TodoListItem
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from ..models import Lists
from django.core import serializers


def persist_new_list_item(new_list_item_data):
    new_list_item = TodoListItem(id=new_list_item_data['id'], list_item_title=new_list_item_data['list_item_title'],
                                 checked=new_list_item_data['checked'], associated_list= new_list_item_data['list_name'])
    new_list_item.save()

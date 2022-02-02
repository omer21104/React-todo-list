from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import TodoListItem
from django.core import serializers

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_table_data(request):

    obj = TodoListItem.objects.all()
    data = serializers.serialize("json", obj, fields=("list_item_title"))
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def persist_list_item(request):

    data = request.data
    newListItem = TodoListItem(list_item_title= data)
    newListItem.save()

    return Response(status=status.HTTP_200_OK)
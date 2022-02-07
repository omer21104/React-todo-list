from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import TodoListItem
from .models import Lists
from django.core import serializers

from .utils import utils


@api_view(['GET', 'POST', 'DELETE'])
def test(request):
    if request.method == 'POST':
        new_list_item_data = request.data
        utils.persist_new_list_item(new_list_item_data)

        return Response(status=status.HTTP_200_OK)

    elif request.method == 'GET':
        obj = TodoListItem.objects.all()
        data = serializers.serialize("json", obj, fields="list_item_title")

        return Response(data, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def persist_new_list(request):
    list_name = request.GET.get('listName')
    new_list = Lists(list_name=list_name)
    new_list.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_table_data(request):
    list_name = request.GET.get('listName')
    obj = TodoListItem.objects.filter(associated_list=list_name)
    data = serializers.serialize("json", obj, fields=('checked','list_item_title'))

    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_lists(request):
    obj = Lists.objects.all()
    data = serializers.serialize("json", obj, fields='list_name')

    return Response(data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@renderer_classes([JSONRenderer])
def delete_list_items(request):
    items_to_delete = request.data
    TodoListItem.objects.filter(id__in=items_to_delete).delete()

    return Response(status=status.HTTP_200_OK)

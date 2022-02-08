from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import TodoListItem
from .models import Lists
from django.core import serializers

from .utils import utils


@api_view(['GET', 'POST', 'DELETE'])
def router(request, idk):
    request_method = request.method
    request_path = request.path
    request_data = request.data

    if 'persist_new_list_item' in request_path:
        utils.persist_new_list_item(request_data)

        return Response(status=status.HTTP_200_OK)

    elif 'get_table_data' in request_path:
        list_name = request.GET.get('listName')
        obj = TodoListItem.objects.filter(associated_list=list_name)
        data = serializers.serialize("json", obj, fields=('checked', 'list_item_title'))

        return Response(data, status=status.HTTP_200_OK)

    elif 'persist_new_list' in request_path:
        list_name = request.GET.get('listName')
        new_list = Lists(list_name=list_name)
        new_list.save()

        return Response(status=status.HTTP_200_OK)

    elif 'update_checked_item' in request_path:
        checked_item_id = request.GET.get('checkedItemID')
        list_item = TodoListItem.objects.get(id=checked_item_id)
        list_item.checked = not list_item.checked
        list_item.save()

        return Response(status=status.HTTP_200_OK)

    elif 'get_lists' in request_path:
        obj = Lists.objects.all()
        data = serializers.serialize("json", obj, fields='list_name')

        return Response(data, status=status.HTTP_200_OK)

    elif 'delete_list_items' in request_path:
        items_to_delete = request.data
        TodoListItem.objects.filter(id__in=items_to_delete).delete()

        return Response(status=status.HTTP_200_OK)

    elif 'hi' in request_path:
        return Response(status=status.HTTP_200_OK)

    # if all else fails
    return Response(status=status.HTTP_404_NOT_FOUND)

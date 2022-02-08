from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .utils import dbutils


@api_view(['GET', 'POST', 'DELETE'])
def router(request, request_path):
    request_method = request.method
    request_data = request.data

    if 'persist_new_list_item' in request_path:
        dbutils.persist_new_list_item(request_data)

        return Response(status=status.HTTP_200_OK)

    elif 'get_table_data' in request_path:
        list_name = request.GET.get('listName')
        data = dbutils.get_table_data(list_name)

        return Response(data, status=status.HTTP_200_OK)

    elif 'persist_new_list' in request_path:
        list_name = request.GET.get('listName')
        dbutils.persist_new_list(list_name)

        return Response(status=status.HTTP_200_OK)

    elif 'update_checked_item' in request_path:
        checked_item_id = request.GET.get('checkedItemID')
        dbutils.update_checked_item(checked_item_id)

        return Response(status=status.HTTP_200_OK)

    elif 'get_lists' in request_path:
        lists = dbutils.get_all_lists()

        return Response(lists, status=status.HTTP_200_OK)

    elif 'delete_list_items' in request_path:
        items_to_delete = request.data
        dbutils.delete_list_items(items_to_delete)

        return Response(status=status.HTTP_200_OK)

    # if all else fails
    return Response(status=status.HTTP_404_NOT_FOUND)



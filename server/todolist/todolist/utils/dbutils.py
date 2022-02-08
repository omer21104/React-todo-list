from ..models import TodoListItem
from ..models import Lists
from django.core import serializers


def persist_new_list_item(new_list_item_data):
    new_list_item = TodoListItem(id=new_list_item_data['id'], list_item_title=new_list_item_data['list_item_title'],
                                 checked=new_list_item_data['checked'], associated_list=new_list_item_data['list_name'])
    new_list_item.save()


def get_table_data(table_name):
    obj = TodoListItem.objects.filter(associated_list=table_name)
    data = serializers.serialize("json", obj, fields=('checked', 'list_item_title'))
    return data


def persist_new_list(list_name):
    new_list = Lists(list_name=list_name)
    new_list.save()


def update_checked_item(item_id):
    list_item = TodoListItem.objects.get(id=item_id)
    list_item.checked = not list_item.checked
    list_item.save()


def get_all_lists():
    obj = Lists.objects.all()
    return serializers.serialize("json", obj, fields='list_name')


def delete_list_items(items_to_delete):
    TodoListItem.objects.filter(id__in=items_to_delete).delete()

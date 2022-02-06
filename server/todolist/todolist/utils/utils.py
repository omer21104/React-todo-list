from ..models import TodoListItem


def persist_new_list_item(new_list_item_data):
    new_list_item = TodoListItem(id=new_list_item_data['id'], list_item_title=new_list_item_data['list_item_title'],
                                 checked=new_list_item_data['checked'], associated_list= new_list_item_data['list_name'])
    new_list_item.save()

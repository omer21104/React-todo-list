const parseTodoListData = (response) => {
  let result;

  const data = JSON.parse(response.data);
  const fields = data.map((item) => {
    const { fields } = item;
    return fields;
  });

  // extract text titles from db data
  let taskTitles = fields.map((field) => {
    const { list_item_title } = field;
    return list_item_title;
  });

  result = taskTitles.map((task, index) => {
    return { id: index, text: task, checked: false };
  });

  return result;
};

export default parseTodoListData;

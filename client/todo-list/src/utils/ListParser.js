const parseTodoListData = (response) => {
  const data = JSON.parse(response.data);

  return data.map((item) => {
    const {
      pk,
      fields: { list_item_title, checked },
    } = item;
    return { id: pk, list_item_title, checked };
  });
};

export default parseTodoListData;

// This method accepts json data
// and returns an array of objects with the pk for the entries, and the desired fields.
export const parse = (jsonData) => {
  const parsedObjects = JSON.parse(jsonData); // get a list of parsed objects

  return parsedObjects.map((object) => {
    let resultFields = object.fields;
    let id = object.pk;

    return { id, ...resultFields };
  });
};

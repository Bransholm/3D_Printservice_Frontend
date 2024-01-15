// this creates an instancee of products 

// this function create classes for catalogue items
export function createCatalogClasses(dataList, classType) {
  const instanceList = [];

  // Loop to fetch the data
  for (const object of dataList) {
    // Hvert objekt i listen bliver nu lavet til en ny instans.
    const newInstance = new classType(object);

    // the instance is pushed to our new list
    instanceList.push(newInstance);
  }
  console.log("classlist: ", instanceList);

  // return the instance list
  return instanceList;
}

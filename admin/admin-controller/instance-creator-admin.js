// this creates an instancee of products 

// this function create classes for catalogue items
export function createCatalogClasses(dataList, classType) {
  console.log("No.1 createCatalogClasses");
  // Opret en tom liste så hvert objekt vi fetcher kan komme ind som en instans af en klasse
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

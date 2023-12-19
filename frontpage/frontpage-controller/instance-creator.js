// Denne funktion laver klasserne for vores katalog-vare
export function createCatalogClasses(dataList, classType) {
  console.log("No.1 createCatalogClasses");
  // Opret en tom liste så hvert objekt vi fetcher kan komme ind som en instans af en klasse
  const instanceList = [];

  // Loop på listen af vores fetchede data:
  for (const object of dataList) {
    // Hvert objekt i listen bliver nu lavet til en ny instans.
    const newInstance = new classType(object);

    // Enstansen bliver puttet i vores nye liste.
    instanceList.push(newInstance);
  }
  console.log("classlist: ", instanceList);

  //Her køres render metoden for alle vores instances af catalogue klassen.
  return instanceList;

  // Her laver jeg en instance af Product...
  // createInstanceOfProdut();
}

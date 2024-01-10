// Skridt 1 indsæt den eksisterende data ind
function updateButtonClicked(catalogueItem) {
	console.log("katalog objekt opdateres");

	const updateForm = document.querySelector("#updateCatalogueForm");

	updateForm.title.value = catalogueItem.title;
	updateForm.standardSize.value = catalogueItem.standardSize;
	updateForm.standardWeight.value = catalogueItem.standardWeight;
	updateForm.itemDescription.value = catalogueItem.itemDescription;
	updateForm.imageLink.value = catalogueItem.imageLink;
	updateForm.category.value = catalogueItem.category;
	updateForm.setAttribute("data-id", catalogueItem.id);

	document.querySelector("#updateItemModal").showModal();

	document
		.querySelector("#updateCatalogueForm")
		.addEventListener("submit", updateCatalogueClicked);

	document
		.querySelector("#btn-cancel-update")
		.addEventListener("click", closeUpdateDialog);
}

function closeUpdateDialog() {
	document.querySelector("#dialog-update-member").close();
	console.log("Opdatering annulleret");
}

function updateCatalogueClicked(event) {
  event.preventDefault();
  console.log("Nu updateres et katalog objekt");

  const form = 
}
// export function openModal(item) {
// 	// Jeg henter den specifikke data
// 	document.getElementById("title").value = item.title;
// 	document.getElementById("standardSize").value = item.standardSize;
// 	document.getElementById("standardWeight").value = item.standardWeight;
// 	document.getElementById("description").value = item.description;
// 	document.getElementById("image").value = item.imageLink;
// 	document.getElementById("category").value = item.category;
// 	document.getElementById("itemId").value = item.id;

// 	// Dette gør modalen synlig
// 	document.getElementById("updateItemModal").style.display = "block";
// }

// // Skridt 2 gør indholdet fra forms den opdaterede
// export async function updateCatalogueData(event) {
// 	event.preventDefault();
// 	const formData = new FormData(document.getElementById("updateCatalogueForm"));

// 	const updatedData = {
// 		title: formData.get("title"),
// 		standardSize: formData.get("standardSize"),
// 		standardWeight: formData.get("standardWeight"),
// 		itemDescription: formData.get("description"),
// 		imageLink: formData.get("image"),
// 		category: formData.get("category"),
// 	};

// 	const itemId = formData.get("itemId");

// 	try {
// 		const response = await fetch(
// 			`https://3dprintservice.azurewebsites.net/YOUR_ENDPOINT/${itemId}`,
// 			{
// 				method: "PUT",
// 				headers: {
// 					"Content-Type": "application/json",

// 				},
// 				body: JSON.stringify(updatedData),
// 			}
// 		);

// 		if (!response.ok) {
// 			throw new Error(`Error: ${response.status}`);
// 		}

// 		const responseData = await response.json();
// 		console.log("Update successful:", responseData);
// 		closeModal(); // Luk modal

// 	} catch (error) {
// 		console.error("Update failed:", error);
// 	}
// }

// function closeModal() {
// 	document.getElementById("updateItemModal").style.display = "none";
// }

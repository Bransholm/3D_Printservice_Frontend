function startViews() {
  // whenever the hash changes (you hit a link or change the hash)
  window.addEventListener("hashchange", showChange);
  // Call the showChange to display the first view
  showChange();
  console.log("Routeing is active");
}

function showChange() {
  // default view
  let hashLink = "#products";

  if (location.hash) {
    // Use hash value as link
    hashLink = location.hash;
  }

  // hide all views
  hideAllViews();

  // add .active to the view that will be shown
  document.querySelector(hashLink).classList.add("active");
  // set active link in navigation bar
  setActiveLink(hashLink);
}

function setActiveLink(view) {
  // reference to link in the navigation bar
  const link = document.querySelector(`a.view-link[href="${view}"]`);
    if (link) {
      // add .active to active link in the navigation bar
      link.classList.add("active");
    }
}

function hideAllViews() {
  // remove .active for all .view-content elements (all views) and .view-link elements (all links)
  document.querySelectorAll(".view-content").forEach((link) => link.classList.remove("active"));
  document.querySelectorAll(".view-link").forEach((link) => link.classList.remove("active"));
}

export { startViews };
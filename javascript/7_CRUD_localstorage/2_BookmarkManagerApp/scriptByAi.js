// ✅ Utility: Safely get bookmarks from localStorage
const getBookmarks = () => {
  const raw = localStorage.getItem("bookmarks");

  if (!raw) return [];

  try {
    const data = JSON.parse(raw);

    // Make sure it's an array
    if (!Array.isArray(data)) return [];

    // Make sure each item is a valid bookmark object
    const isValid = data.every(bookmark =>
      bookmark &&
      typeof bookmark === "object" &&
      "name" in bookmark &&
      "category" in bookmark &&
      "url" in bookmark
    );

    return isValid ? data : [];
  } catch (e) {
    return [];
  }
};

// ✅ DOM Elements
const categoryDropdown = document.getElementById("category-dropdown");
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const listSection = document.getElementById("bookmark-list-section");
const categoryNameEls = document.querySelectorAll(".category-name");
const categoryList = document.getElementById("category-list");

// ✅ Toggle between main and form
const displayOrCloseForm = () => {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
};

// ✅ Toggle between main and list
const displayOrHideCategory = () => {
  mainSection.classList.toggle("hidden");
  listSection.classList.toggle("hidden");
};

// ✅ Add bookmark
document.getElementById("add-bookmark-button-form").addEventListener("click", () => {
  const name = nameInput.value.trim();
  const category = categoryDropdown.value;
  const url = urlInput.value.trim();

  if (!name || !url) return;

  const bookmarks = getBookmarks();
  bookmarks.push({ name, category, url });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  nameInput.value = "";
  urlInput.value = "";
  displayOrCloseForm();
});

// ✅ Show form with selected category
document.getElementById("add-bookmark-button").addEventListener("click", () => {
  const category = categoryDropdown.value;
  categoryNameEls.forEach(el => el.textContent = category);
  displayOrCloseForm();
});

// ✅ Close form
document.getElementById("close-form-button").addEventListener("click", () => {
  displayOrCloseForm();
});

// ✅ Show bookmarks by category
document.getElementById("view-category-button").addEventListener("click", () => {
  const category = categoryDropdown.value;
  categoryNameEls.forEach(el => el.textContent = category);

  const filtered = getBookmarks().filter(b => b.category === category);
  categoryList.innerHTML = "";

  if (filtered.length === 0) {
    categoryList.innerHTML = `<p>No Bookmarks Found</p>`;
  } else {
    filtered.forEach(({ name, url }) => {
      categoryList.innerHTML += `
        <input type="radio" id="${name}" value="${name}" name="bookmark-option">
        <label for="${name}"><a href="${url}" target="_blank">${name}</a></label><br>
      `;
    });
  }

  displayOrHideCategory();
});

// ✅ Close category list
document.getElementById("close-list-button").addEventListener("click", () => {

  displayOrHideCategory();
  categoryList.innerHTML = ""; // Clear list to avoid duplicates
});

// ✅ Delete selected bookmark
document.getElementById("delete-bookmark-button").addEventListener("click", () => {
  const selected = document.querySelector("input[name='bookmark-option']:checked");
  const category = categoryDropdown.value;

  if (!selected) return;

  const bookmarks = getBookmarks();
  const updated = bookmarks.filter(b => !(b.name === selected.value && b.category === category));
  localStorage.setItem("bookmarks", JSON.stringify(updated));

  // Re-render list
  document.getElementById("view-category-button").click();
});

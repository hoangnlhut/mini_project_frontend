// ✅ DOM Elements
const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const categoryList = document.getElementById("category-list");
const categoryNameEls = document.querySelectorAll(".category-name");

// ✅ DOM Input Elements
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const categoryDropdownInput = document.getElementById("category-dropdown");

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

const setContentForCategoryNameEls = () => {
    const category = categoryDropdownInput.value;
    categoryNameEls.forEach(el => el.textContent = category);
}

let bookmarks = getBookmarks();

// ✅ Toggle between main and form
const displayOrCloseForm = () => {
    mainSection.classList.toggle("hidden");
    formSection.classList.toggle("hidden");
};

// ✅ Toggle between main and list
const displayOrHideCategory = () => {
    mainSection.classList.toggle("hidden");
    bookmarkListSection.classList.toggle("hidden");
};

const displayBookmarksList = () => {
    bookmarks = getBookmarks();
    categoryList.innerHTML = "";

    let flag = 0;

     bookmarks.forEach(({ name, category, url }) => {
            if(category === categoryDropdownInput.value) {
                categoryList.innerHTML += `
                    <input type="radio" id="${name}" name="categoryItem" value="${name}" />
                    <label for="${name}"> <a href="${url}" target="_blank">${name}</a></label><br />`;
                flag++;
            }
    });

    if (flag === 0) {
        categoryList.innerHTML = "<p>No bookmarks found</p>";
    }
};

// ✅ reset form inputs
const resetFormInputs = () => {
    nameInput.value = "";
    urlInput.value = "";
};

// ✅ Main Section

// 🟧 Show bookmarks by category
document.getElementById("view-category-button").addEventListener("click", (event) => {
    setContentForCategoryNameEls();
    displayBookmarksList();
    displayOrHideCategory();
});

// 🟧 Add bookmark
document.getElementById("add-bookmark-button").addEventListener("click", (event) => {
    setContentForCategoryNameEls();
    displayOrCloseForm();
});
// End of main section

// ✅ Form Section

// 🟧 Close form
document.getElementById("close-form-button").addEventListener("click", (event) => {
    resetFormInputs();
    displayOrCloseForm();
});

// 🟧 Add bookmark
document.getElementById("add-bookmark-button-form").addEventListener("click", (event) => {
    const name = nameInput.value.trim();
    const category = categoryDropdownInput.value;
    const url = urlInput.value.trim();

    if (!name || !url) return;

    const bookmarks = getBookmarks();
    bookmarks.push({ name, category, url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    resetFormInputs();
    displayOrCloseForm();
});

// End of Form section

// ✅ Bookmark List Section

// 🟧 Close category list
document.getElementById("close-list-button").addEventListener("click", (event) => {
    displayOrHideCategory();
});

// 🟧 Delete selected bookmark
document.getElementById("delete-bookmark-button").addEventListener("click", (event) => {
    const selectedValue = document.querySelector('input[name="categoryItem"]:checked')?.value;

    if (!selectedValue) return;

    bookmarks = getBookmarks();
    const indexExistingBookmarks = bookmarks.findIndex(item => item.name === selectedValue);
    bookmarks.splice(indexExistingBookmarks, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    displayBookmarksList();
});

// End of Bookmark List section
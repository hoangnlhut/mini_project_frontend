// Endpoints
const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

// Category map used by the tests
const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" }
};

// Convert ISO timestamp to "Xm ago / Xh ago / Xd ago"
function timeAgo(isoTimestamp) {
  const diffMs = Date.now() - new Date(isoTimestamp).getTime();
  const mins = Math.floor(diffMs / (1000 * 60));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Format view count (e.g., 1600 => "1k")
const viewCount = (num) => (num >= 1000 ? `${Math.floor(num / 1000)}k` : num);

// Render category link cell
const forumCategory = (id) => {
  if (Object.prototype.hasOwnProperty.call(allCategories, id)) {
    const { category, className } = allCategories[id];
    return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${id}">${category}</a>`;
  }
  return `<a class="category general" href="${forumCategoryUrl}general/${id}">General</a>`;
};

// Build avatar <img> tags in the SAME ORDER as posters array (important for tests)
// Note: As of mid‑2025 the API’s `avatar_template` often needs the forum host prepended and {size} replaced.
const avatars = (posters, users) => {
  let html = "";
  posters.forEach((poster) => {
    const user = users.find((u) => u.id === poster.user_id);
    if (!user) return;
    let template = user.avatar_template.replace("{size}", "30");
    // If template isn't absolute, prepend forum host (per latest guidance)
    if (!/^https?:\/\//.test(template)) {
      template = `${avatarUrl}${template}`;
    }
    html += `<img src="${template}" alt="${user.name}" />\n`;
  });
  return html;
};

// Render table rows
const showLatestPosts = (data) => {
  const postContainer = document.getElementById("posts-container");
  postContainer.innerHTML = "";
  data.topic_list.topics.forEach((topic) => {
    postContainer.innerHTML += `<tr>
      <td>
        <a class="post-title" href="${forumTopicUrl}${topic.slug}/${topic.id}">${topic.title}</a>
        ${forumCategory(topic.category_id)}
      </td>
      <td><div class="avatar-container">${avatars(topic.posters, data.users)}</div></td>
      <td>${topic.posts_count - 1}</td>
      <td>${viewCount(topic.views)}</td>
      <td>${timeAgo(topic.bumped_at)}</td>
    </tr>`;
  });
};

// Fetch + render
async function fetchData() {
  try {
    const res = await fetch(forumLatest);
    const data = await res.json();
    showLatestPosts(data);
  } catch (err) {
    console.log(err); // tests expect logging just the error
  }
}

fetchData();

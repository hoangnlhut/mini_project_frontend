const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

const postsContainer = document.getElementById("posts-container");

const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Backend Development', className: 'backend' }
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

// console.log(timeAgo('2025-08-15T06:23:26.039Z'));

const viewCount = (numberOfViews) =>  numberOfViews >= 1000 ?  `${Math.floor(numberOfViews / 1000)}k` : numberOfViews;

const forumCategory = (idOfSelectedCategory) => {
    let {category, className} = {category: "General", className: "general"};

    if(allCategories.hasOwnProperty(idOfSelectedCategory))
    {
        category = allCategories[idOfSelectedCategory].category;
        className = allCategories[idOfSelectedCategory].className;
    }

    return `<a class="category ${className}" href="${forumCategoryUrl}${className}/${idOfSelectedCategory}">${category}</a>`;
};

// console.log(forumCategory(299));
// console.log(forumCategory(200));


const avatars = (postersArr, usersArr) => {
    let result = ``;
    postersArr?.forEach(({user_id})=> {
        const user = usersArr.find((item) => item.id === user_id);
        if (!user) return;
        
        let template = user.avatar_template.replace("{size}", "30");
            
        // If template isn't absolute, prepend forum host (per latest guidance)
        if (!/^https?:\/\//.test(template)) {
            template = `${avatarUrl}${template}`;
        }
        
        result += `<img src="${template}" alt="${user.name}" />\n`;
    })

    return result;
};

//sample data
// users
//   {
//             "id": 6,
//             "username": "QuincyLarson",
//             "name": "Quincy Larson",
//             "avatar_template": "/user_avatar/QuincyLarson_30.png",
//             "primary_group_name": "team",
//             "flair_name": "team",
//             "flair_url": "fab-free-code-camp",
//             "flair_bg_color": "0a0a23",
//             "flair_color": "ffffff",
//             "flair_group_id": 46,
//             "admin": true,
//             "moderator": true,
//             "trust_level": 4
//         },

//  "posters": [
//    { "extras": null, "description": "Original Poster", "user_id": 6, "primary_group_id": 46, "flair_group_id": 46 },
//    { "extras": null, "description": "Frequent Poster", "user_id": 576147, "primary_group_id": null, "flair_group_id": null },
//     { "extras": null, "description": "Frequent Poster", "user_id": 562668, "primary_group_id": null, "flair_group_id": null },
//     { "extras": null, "description": "Frequent Poster", "user_id": 565291, "primary_group_id": null, "flair_group_id": null },
//     { "extras": "latest", "description": "Most Recent Poster", "user_id": 573460, "primary_group_id": null, "flair_group_id": null }
//  ]
//end of sample data

const showLatestPosts = (posts) => {
    postsContainer.innerHTML = '';
    const {users , topic_list} = posts;
    topic_list?.topics.forEach(({id, title, views, posts_count, slug, posters, category_id, bumped_at}) => {
        postsContainer.innerHTML += `
        <tr>
            <td>
                <a class="post-title" href="${forumTopicUrl}${slug}/${id}">${title}</a>
                ${forumCategory(category_id)}
            </td>
            <td>
                <div class="avatar-container">${avatars(posters, users)}</div>
            </td>
            <td>${posts_count - 1}</td>
            <td>${viewCount(views)}</td>
            <td>${timeAgo(bumped_at)}</td>
        </tr>
        `;
    });
}

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


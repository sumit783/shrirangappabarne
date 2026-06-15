// Convert date
function parseDate(dateStr) {
  if (!dateStr) return new Date(0);
  const parts = dateStr.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Merge all categories
let allPosts = [];

for (let category in postsData) {
  allPosts = allPosts.concat(postsData[category]);
}

// Sort latest first
allPosts.sort((a, b) => parseDate(b.date) - parseDate(a.date));

// Get latest 10
const latestPosts = allPosts.slice(0, 8);

// Target container
const container = document.getElementById("latest-posts");

// Render posts (same as posts.html)
latestPosts.forEach((post) => {
  const div = document.createElement("div");
  div.classList.add("post");

  div.innerHTML = `
    ${post.img ? `<img src="${post.img}" alt="post">` : ""}

    <div class="post-caption">
      ${post.caption.substring(0, 120)}...
    </div>

    <div class="post-info">
      <span>${post.date || ""}</span>
      ${post.url ? `<a href="${post.url}" target="_blank">View</a>` : ""}
    </div>
  `;

  container.appendChild(div);
});

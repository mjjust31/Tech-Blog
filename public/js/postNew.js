const newPostFormEl = document.getElementById("newPostForm");

newPostFormEl.addEventListener("submit", async function (event) {
  event.preventDefault();
  const titleEl = document.getElementById("newTitle");
  const contentEl = document.getElementById("newPostContent");
  console.log(titleEl.value);
  console.log(contentEl.value);

  const response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title: titleEl.value.trim(),
      content: contentEl.value.trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });

  // console.log("response", response);

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Didn't work, but you hit this route");
  }
});

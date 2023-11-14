const form = document.querySelector("#signUp");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const usernameEl = document.getElementById("newUsername");
  const passwordEl = document.getElementById("newPassword");

  const response = await fetch("/user/sign", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl.value.trim(),
      password: passwordEl.value.trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });

  console.log("response", response);

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to create an account. Please check password requirements");
  }
});

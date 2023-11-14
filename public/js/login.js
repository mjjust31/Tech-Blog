

const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();
  const usernameEl = document.getElementById("usernameLogin");
  const passwordEl = document.getElementById("inputPasswordLogin");
  console.log(usernameEl.value);
  console.log(passwordEl.value);

  const response = await fetch("/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: usernameEl.value.trim(),
      password: passwordEl.value.trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });

  console.log("response", response);

  if (response.ok) {
    alert("Hit the good route");
  } else {
    alert("Bad request");
  }
});

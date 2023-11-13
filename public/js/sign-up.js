const createNewUser = async function (event) {
  event.preventDefault;
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
    console.log("You hit this route!");
  } else {
    alert("Your login failed. Have you created an account?");
  }
};

document.querySelector("#signUp").addEventListener("submit", createNewUser);

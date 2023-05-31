const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");

email.setAttribute("autocomplete", "email");
password.setAttribute("autocomplete", "current-password");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const user = {
        email: email.value,
        password: password.value,
    };

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else if (!email.value || !password.value) {
                let error = document.querySelector("p.error");
                if (error) {
                    error.parentNode.removeChild(error);
                }
                password.insertAdjacentHTML(
                    "afterend",
                    `<p class="error">*Veuillez remplir tous les champs</p>`
                );
            } else {
                let error = document.querySelector("p.error");
                if (error) {
                    error.parentNode.removeChild(error);
                }
                password.insertAdjacentHTML(
                    "afterend",
                    `<p class="error">*Erreur dans l'identifiant ou le mot de passe</p>`
                );
            }
        })
        .then((data) => {
            sessionStorage.setItem("token", data.token);
            window.location.href = "/FrontEnd/index.html"; // Redirige vers la page index.html
        })
        .catch((err) => {
            console.log(err);
        });
});

//fonction qui crée un élément "figure" dans la gallerie
const createElement = (element) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML += `
      <figure data-tag="${element.category.name}">
          <img crossorigin="anonymous" src="${element.imageUrl}" alt="${element.title}">
          <figcaption>${element.title}</figcaption>
      </figure>`;
};
fetch("http://localhost:5678/api/works")
  //si fetch fonctionne on récupère les données au format JSON
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  
  //récupération de chaque élément et effectue la fonction "createElement" pour chaque élément récupéré
  .then((products) => {
    products.forEach((product) => {
      createElement(product);
    });
  })
  //s'il y a une erreur, va console logger err
  .catch(function (err) {
    console.log(err);
  });

//fonction qui crée un bouton dans la nav #filtres
const createButton = (button) => {
  //on récupère le parent des boutons
  const filtres = document.querySelector("#filtres");
  //on ajoute le bouton
  filtres.insertAdjacentHTML(
    "beforeend",
    `<button data-tag="${button.name}"> ${button.name} </button>`
  );

  //on récupère les boutons
  const buttons = document.querySelectorAll("#filtres button");
  //pour chaque bouton, si on clique dessus, fais une fonction
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      //on enlève le classe "active" à tout les boutons
      buttons.forEach((element) => element.classList.remove("active"));
      //on met la classe "active" au bouton cliqué
      this.classList.add("active");

      //on récupère le tag du bouton
      const buttonTag = this.dataset.tag;
      //on récupère les figure faites plus haut
      const images = document.querySelectorAll(".gallery figure");
      //pour chaque figure on fait une fonction
      images.forEach((image) => {
        //si l'image a le même tag que le bouton, on enlève la classe "filtered"
        if (image.getAttribute("data-tag") === buttonTag) {
          image.classList.remove("filtered");
          //on applique la classe "filtered" aux autres qui n'ont pas le même tag
        } else {
          image.classList.add("filtered");
        }
      });
    });
  });

  //fonction qui va afficher toutes les images
  function afficherToutesLesImages() {
    // récupère toutes les images
    const toutesLesImages = document.querySelectorAll(".gallery figure");
    //on enlève la classe "filtered" a chaque images
    toutesLesImages.forEach((image) => {
      image.classList.remove("filtered");
    });
  }

  //quand on clique sur "Tous", va faire la fonction afficherToutesLesImages
  boutonTous.addEventListener("click", afficherToutesLesImages);
};

fetch("http://localhost:5678/api/categories")
  //si fetch fonctionne on récupère les données au format JSON
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })

  //récupération de chaque data et effectue la fonction "createButton" pour chaque data récupéré
  .then((data) => {
    data.forEach((button) => {
      createButton(button);
    });
  })

  //s'il y a une erreur, va console logger err
  .catch(function (err) {
    console.log(err);
  });

//permet d'ajouter la classe active au bouton "Tous" par défaut
const boutonTous = document.querySelector('button[data-tag="Tous"]');
boutonTous.classList.add("active");
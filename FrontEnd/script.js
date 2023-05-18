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
}
  //pour chaque bouton, si on clique dessus, fais une fonction
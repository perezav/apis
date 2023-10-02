
$(document).ready(function () {
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const searchForm = $("#searchForm");
  const searchInput = $("#searchInput");
  const mealCards = $("#mealCards");

  searchForm.submit(function (event) {
    event.preventDefault(); // evitamos que el formulario se envíe de forma predeterminada

    var searchTerm = searchInput.val();

    //  solicitud GET a la API con el término de búsqueda
    $.get(apiUrl + searchTerm, function (data) {
      mealCards.html(""); // limpia las tarjetas existentes

      // verifica si la solicitud es exitosa y si existen comidas
      if (data.meals) {
        // itera sobre las comidas obtenidas y crea una tarjeta para cada uno
        data.meals.forEach(function (meal) {
          var cardHtml = ` 
          <div class="col-md-4">
          <div class="card mb-4">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}"> 
          <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">Category: ${meal.strCategory}</p>
          <p class="card-text">Area: ${meal.strArea}</p>
          <p class="card-text">Youtube recipe video: ${meal.strYoutube}</p>
          <p class="card-text">Instructions: ${meal.strInstructions}</p>
          </div>
          </div>
          </div> `;
          mealCards.append(cardHtml); // agrega la tarjeta al contenedor
        });
      } else {
        mealCards.html("<p>No se encontraron comidas.</p>");
      }
    });
  });
});

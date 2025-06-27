const clearSearch = () => {
  document.getElementById("input-search").value = "";
  const container = document.getElementById("container-recommendation");
  container.classList.remove("show");
  container.classList.add("hidden");
};

const searchDestinations = async () => {
  const value = document.getElementById("input-search").value.toLowerCase();

  if (!value) {
    alert("Please enter the destination.");
    return;
  }

  const container = document.getElementById("container-recommendation");
  container.classList.remove("hidden");
  container.classList.add("show");

  const data = await fetch("./travel_recommendation_api.json");
  const response = await data.json();

  const recommendations = filterRecommendations(response, value);

  if (recommendations.length === 0) {
    container.innerHTML = "<h2>No results found</h2>";
    return;
  }

  console.log(recommendations);

  container.innerHTML = "";

  recommendations.forEach((location) => {
    if (!location.cities) {
      container.innerHTML += `
        <h3>${location.name}</h3>
        <img src="${location.imageUrl}" alt="${location.name}" width="200"/>
        <p>${location.description}</p>
      `;
      return;
    }
    location.cities.forEach((location) => {
      container.innerHTML += `
        <h3>${location.name}</h3>
        <img src="${location.imageUrl}" alt="${location.name}" width="200"/>
        <p>${location.description}</p>
      `;
    });
  });
};

const filterRecommendations = (recommendations, inputFilter) => {
  if (inputFilter === "beaches") {
    console.log("entramo");
    return recommendations.beaches;
  }
  if (inputFilter === "temples") {
    return recommendations.temples;
  }
  if (inputFilter === "countries") {
    return recommendations.countries;
  }

  Object.keys(recommendations).forEach((key) => {
    console.log("key", key);
  });

  return Object.entries(recommendations).flatMap(([_, locations]) =>
    locations.filter((location) =>
      location.name.toLowerCase().includes(inputFilter)
    )
  );
};

const onSubmitForm = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  confirm(
    `Thank you for your comments ${name}.\nYour email: ${email}\nYour message: ${message}.\nWe will contact you soon.`
  );
};

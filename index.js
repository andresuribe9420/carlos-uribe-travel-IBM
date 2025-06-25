const clearSearch = () => {
  document.getElementById("input-search").value = "";
  console.log("Search cleared");
};
const searchDestinations = () => {
  const value = document.getElementById("input-search").value.toLowerCase();

  console.log("value", value);
};

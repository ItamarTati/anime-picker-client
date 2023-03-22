const root = document.getElementById("root");
const loading = document.getElementById("Loading");
window.addEventListener("load", () => {
  if (root) {
    root.style.display = "block";
  }
  if (loading) {
    loading.style.display = "none";
  }
});
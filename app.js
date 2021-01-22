// GLOBAL VARIABLES
document.addEventListener("DOMContentLoaded", importLib);
const lib = [];
const padNum = 32;

// DATA FECTH FROM LOCAL URL: './sounds-lib.json'
async function importLib() {
  const dataFetch = await fetch("./sounds-lib.json");
  const data = await dataFetch.json();
  data.forEach((data) => {
    let label = data.split("-")[0];
    lib.push({
      name: data,
      source: `./sounds-library/${data}`,
      label: label,
    });
  });
  return lib;
}

// ANIMATE PAGE UI
const timeline = gsap.timeline({ defaults: { duration: 1 } });
timeline
  .from("header", { y: "-100%", ease: "bounce" })
  .fromTo(".beatmaker-tools, .media-controls", { opacity: 0 }, { opacity: 1 })
  .from("footer", { y: "100", ease: "elastic" });

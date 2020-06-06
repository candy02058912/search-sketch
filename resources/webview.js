let counter = 1;
let results;
// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// call the plugin from the webview
document.getElementById("search").addEventListener("click", () => {
  counter = 1;
  const query = document.getElementById("query").value;
  const fuzzy = document.getElementById("fuzzy").checked;
  window.postMessage("search", { query, searchOptions: fuzzy });
});

document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  counter = 1;
  const query = document.getElementById("query").value;
  const fuzzy = document.getElementById("fuzzy").checked;
  window.postMessage("search", { query, searchOptions: { fuzzy } });
});

// call the plugin from the webview
document.getElementById("search-next").addEventListener("click", () => {
  counter += 1;
  if (counter <= results.length) {
    window.postMessage("searchNext", results[counter - 1]);
    document.getElementById("counter").innerHTML = counter;
  }
  renderSearchResultsButton();
});

document.getElementById("search-prev").addEventListener("click", () => {
  counter -= 1;
  if (counter <= results.length) {
    window.postMessage("searchNext", results[counter - 1]);
    document.getElementById("counter").innerHTML = counter;
  }
  renderSearchResultsButton();
});

const renderSearchResultsButton = () => {
  if (counter === 1) {
    document.getElementById("search-prev").disabled = true;
  } else {
    document.getElementById("search-prev").disabled = false;
  }
  if (counter === results.length) {
    document.getElementById("search-next").disabled = true;
  } else {
    document.getElementById("search-next").disabled = false;
  }
};

// search results
window.saveResults = (res) => {
  results = JSON.parse(JSON.stringify(res));
  if (!results.length) {
    document.getElementById("result").style.display = "none";
  } else if (results.length > 1) {
    document.getElementById("result").style.display = "initial";
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("results-length").innerHTML = results.length;
    document.getElementById("search-next").style.display = "initial";
    document.getElementById("search-next").disabled = false;
    document.getElementById("search-prev").style.display = "initial";
    document.getElementById("search-prev").disabled = true;
  }
};

// load theme
window.loadThemeInfo = (theme) => {
  if (theme === "dark") {
    document.querySelector("body").setAttribute("data-theme", "dark");
  }
};

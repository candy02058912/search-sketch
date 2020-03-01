let counter = 1;
let results;
// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener("contextmenu", e => {
  e.preventDefault();
});

// call the plugin from the webview
document.getElementById("search").addEventListener("click", () => {
  counter = 1;
  const query = document.getElementById("query").value;
  window.postMessage("search", query);
});

document.getElementById("query").addEventListener("keyup", e => {
  if (e.key === "Enter") {
    counter = 1;
    const query = document.getElementById("query").value;
    window.postMessage("search", query);
  }
});

// call the plugin from the webview
document.getElementById("search-next").addEventListener("click", () => {
  counter += 1;
  if (counter <= results.length) {
    window.postMessage("searchNext", results[counter - 1]);
    document.getElementById("counter").innerHTML = counter;
  }
  if (counter === results.length) {
    document.getElementById("search-next").style.display = "none";
  }
});

// search results
window.saveResults = res => {
  results = JSON.parse(JSON.stringify(res));
  if (!results.length) {
    document.getElementById("result").style.display = "none";
  } else if (results.length > 1) {
    document.getElementById("result").style.display = "initial";
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("results-length").innerHTML = results.length;
    document.getElementById("search-next").style.display = "initial";
  }
};

// load theme
window.loadThemeInfo = theme => {
  if (theme === "dark") {
    document.querySelector("body").setAttribute("data-theme", "dark");
  }
};

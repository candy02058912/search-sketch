import BrowserWindow from "sketch-module-web-view";
import { getWebview } from "sketch-module-web-view/remote";
import Fuse from "fuse.js";
import UI from "sketch/ui";
import sketch from "sketch";

const webviewIdentifier = "search-sketch.webview";

const selectResult = (document, id) => {
  const selection = document.selectedLayers;
  selection.clear();

  const layer = document.getLayerWithID(id);
  layer.selected = true;

  document.centerOnLayer(layer);
};

const checkTextLayer = (layer) => {
  // TextLayer
  if (layer.text) {
    return true;
  }
  return false;
};

const searchLayers = (layer, textLayers) => {
  if (checkTextLayer(layer)) {
    textLayers.push(layer);
  }
  if (layer.layers && layer.layers.length) {
    for (const layer of layer.layers) {
      searchLayers(layer, textLayers);
    }
  }
};

export default function () {
  const options = {
    identifier: webviewIdentifier,
    width: 520,
    height: 150,
    show: false,
    alwaysOnTop: true,
    remembersWindowFrame: true,
    title: "Search Sketch",
  };

  const browserWindow = new BrowserWindow(options);

  // additional styling for BrowserWindow
  browserWindow._panel.setBackgroundColor(
    NSColor.colorWithRed_green_blue_alpha(255 / 255, 250 / 255, 240 / 255, 1)
  );
  browserWindow._panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
  browserWindow._panel
    .standardWindowButton(NSWindowMiniaturizeButton)
    .setHidden(true);

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once("ready-to-show", () => {
    browserWindow.show();
  });

  const webContents = browserWindow.webContents;

  // print a message when the page loads
  webContents.on("did-finish-load", () => {
    UI.message("UI loaded!");
    webContents
      .executeJavaScript(`loadThemeInfo("${UI.getTheme()}")`)
      .catch(console.error);
  });

  // handler: log
  webContents.on("log", (query) => {
    console.log("log: ", query);
  });

  // handler: search
  webContents.on("search", ({ query, searchOptions }) => {
    UI.message("Searching for " + query);
    console.log("@searchOptions", searchOptions);
    console.log(query, " searching");
    const document = sketch.Document.getSelectedDocument();
    const selectedPage = document.selectedPage;
    const layers = selectedPage.layers;
    console.log(layers.length);
    // browserWindow.setBounds({ height: 400 });

    const textLayers = [];
    for (const layer of layers) {
      searchLayers(layer, textLayers);
    }
    const options = {
      shouldSort: true,
      threshold: 0.8,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      useExtendedSearch: true,
      keys: ["text"],
    };
    const fuse = new Fuse(textLayers, options);
    let searchQuery = `'${query}`;
    if (searchOptions.fuzzy) {
      searchQuery = query;
    }
    const result = fuse.search(searchQuery);
    console.log("@result", result);
    selectResult(document, result[0].item.id);
    const resultIds = result.map((res) => res.item.id);
    console.log("@resultIds", resultIds);
    webContents
      .executeJavaScript(`saveResults(${JSON.stringify(resultIds)})`)
      .catch(console.error);
  });

  // handler: searchNext
  webContents.on("searchNext", (id) => {
    UI.message("Searching id " + id);
    const document = sketch.Document.getSelectedDocument();
    selectResult(document, id);
  });

  browserWindow.loadURL(require("../resources/webview.html"));
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier);
  if (existingWebview) {
    existingWebview.close();
  }
}

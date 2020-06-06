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

export default function() {
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
  webContents.on("log", query => {
    console.log("log: ", query);
  });

  // handler: search
  webContents.on("search", query => {
    UI.message("Searching for " + query);
    console.log(query, " searching");
    const document = sketch.Document.getSelectedDocument();
    const selectedPage = document.selectedPage;
    const layers = selectedPage.layers;
    const options = {
      shouldSort: true,
      threshold: 0.8,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["text"]
    };
    const fuse = new Fuse(layers, options);
    const result = fuse.search(query);
    selectResult(document, result[0].id);
    const resultIds = result.map(res => res.id);
    webContents
      .executeJavaScript(`saveResults(${JSON.stringify(resultIds)})`)
      .catch(console.error);
  });

  // handler: searchNext
  webContents.on("searchNext", id => {
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

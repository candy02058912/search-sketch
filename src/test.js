import sketch from "sketch";
// documentation: https://developer.sketchapp.com/reference/api/
import Fuse from "fuse.js";

export default function() {
  sketch.UI.message("It's alive!!! 🙌");
  sketch.UI.getInputFromUser(
    "搜尋",
    {
      initialValue: "Annotators"
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return;
      }
      console.log(value);
      const document = sketch.Document.getSelectedDocument();
      const selectedPage = document.selectedPage;
      const layers = selectedPage.layers;
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["text"]
      };
      const fuse = new Fuse(layers, options);
      const result = fuse.search(value);
      console.log(result[0].text);

      const textToSearch = [];
      const idToSearch = [];
      for (const layer of layers) {
        // if (layer.text) {
        //   textToSearch.push(layer.text);
        //   idToSearch.push(layer);
        // }
        // if (layer.overrides) {
        //   // if (layer.overrides.length > 1) {
        //   //   console.log(layer.overrides[0]);
        //   // }
        //   console.log(layer.overrides[0]);
        //   document.centerOnLayer(layer.overrides[0]);
        //   break;
        // }
      }

      // console.log(textToSearch[104], "***", idToSearch[104]);
      document.centerOnLayer(result[0]);
    }
  );
}

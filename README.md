# TMT Plugin

A self-contained JavaScript plugin that dynamically adds interactive elements to a page containing “nodes” (elements with the class `.node-content`). This plugin is particularly useful for applications that want to show a **Settings** panel and a **customizable** button on each node, which opens a modal when clicked.

## Features

1. **Settings Button**
   - Inserts a **Settings** button (with customizable text, classes, and styling) into the `.tabs-container`.
   - Clicking this button opens a Bootstrap modal for configuring plugin settings.

2. **Custom Button on Each Node**
   - Finds all existing `.node-content` elements and adds a **Custom Button** to them.
   - Clicking this button opens a node-specific Bootstrap modal, showing that node’s title and ID.

3. **Live Monitoring with MutationObserver**
   - Watches for newly added `.node-content` elements.
   - Automatically adds the **Custom Button** to these new nodes as they appear.

## Usage

Create a folder in the plugins folder or the MLPlugins folder, rename the defaultTemplate.js to the same name as the plugin folder you created. 

1. **Include the Plugin Script**

   Make sure you have [Bootstrap 5’s CSS and JS](https://getbootstrap.com/docs/5.0/getting-started/introduction/) available on the page. Then, include the plugin script:

   ```html
   <!-- Bootstrap 5 CSS (example from CDN) -->
   <link
     rel="stylesheet"
     href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
     integrity="sha384-wEmeIV1mKui2mxI3FZrLRkLvObzwT7KpZk5h2OTMS+GZ85SOJp8ym6Hk7tNP2UHZ"
     crossorigin="anonymous"
   />

   <!-- Plugin script -->
   <script src="path/to/XYZ-plugin.js"></script>

   <!-- Bootstrap 5 JS (example from CDN) -->
   <script
     src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
     integrity="sha384-Piv4xVNRyMGpqk84kTzWib/qrzuoe7K4rPuZfH7B+x2V9aCTdZrM/cpg/fJyQ1iJ"
     crossorigin="anonymous"
   ></script>

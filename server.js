// ================== Module Imports ================== //
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
// ================== End Module Imports ================== //



// ================== Middleware ================== //
app.use(express.json());

// Serve all HTML files with navbar injection
app.get(/^\/([\w-]+)(\.html)?$/, (req, res, next) => {
  const page = req.params[0]; // 'index', 'about', etc.
  const filePath = path.join(__dirname, 'public', `${page}.html`);
  const navbarPath = path.join(__dirname, 'public', 'navbar.html');

  try {
    if (!fs.existsSync(filePath)) {
      return next(); // Let 404 handler handle it
    }

    let pageHtml = fs.readFileSync(filePath, 'utf-8');
    const navbarHtml = fs.readFileSync(navbarPath, 'utf-8');
    pageHtml = pageHtml.replace('{{navbar}}', navbarHtml);

    res.send(pageHtml);
  } catch (err) {
    console.error('Error rendering page:', err);
    res.status(500).send('Internal Server Error');
  }
});


// Redirect / or /index to /index.html
app.get(/^\/(index)?$/, (req, res) => {
  res.redirect('/index');
});

// Serve static assets (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
// ================== End Middleware ================== //



// ================== 404 Fallback ================== //
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
// ================== 404 Fallback ================== //



// ================== Server Start ================== //
const port = 8000;
server.listen(port, () => {
    console.log(`[Server log] Server running at http://localhost:${port}`);
});
// ================== Server Start ================== //
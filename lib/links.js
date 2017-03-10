module.exports = results => `<!doctype html>
<html>
<head>
    <meta charset="utf8">
    <title>Links from ${results.url}</title>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <h4><a href="/">Home</a></h4>
    <h1>Extracted ${results.linksArray.length} links from ${results.url}</h1>
    <span>Results saved to the file ${results.pathName}</span>
    <ol>
      ${results.linksArray.map(link =>
            `<li>
                <a href=${link}>${link}</a>
            </li>`
          )
          .join('')}
    </ol>
</body>
</html>`;

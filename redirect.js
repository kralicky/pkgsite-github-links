function doRewriteLinks() {
  const isStdlib = /^https:\/\/pkg.go.dev\/([a-z0-9/]+)@go([a-zA-Z0-9.]+)$/;
  if (!isStdlib.test(window.location.href)) {
    return;
  }
  const regex = /^https:\/\/cs\.opensource\.google\/go\/go(?:\/\+\/go(\d+\.\d+\.\d+):src(?:\/([^;]*?)(?:;l=(\d+))?)?)?$/;
  Array.from(document.links).forEach(link => {
    if (regex.test(link.href)) {
      link.href = link.href.replace(regex, (match, version, path, line) => {
        if (version && path) {
          let result = `https://github.com/golang/go/blob/go${version}/src/${path}`;
          if (line) {
            result += `#L${line}`;
          }
          return result;
        } else {
          return 'https://github.com/golang/go';
        }
      });

      if (link.textContent.trim() === link.title.substring(8)) {
        link.textContent = link.href.substring(8);
        link.title = link.href;
      }
    }
  });
}

doRewriteLinks();

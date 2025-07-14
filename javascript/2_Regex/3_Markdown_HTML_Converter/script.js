const input = document.getElementById('markdown-input');

function convertMarkdown(value) {
  
  let html = value
    .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
    .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
    .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>');

  return html;
}

input.addEventListener('input', () =>{
   var resultHtml =  convertMarkdown(input.value);

  document.getElementById('html-output').textContent = resultHtml;
  document.getElementById('preview').innerHTML = resultHtml;
});
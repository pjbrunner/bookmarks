document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');
    let url = "file:///Users/pj/coding/bookmarks/links.json";
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.send()
});

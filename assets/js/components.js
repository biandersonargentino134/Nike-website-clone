async function loadComponent(id, path) {
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

// Load footer
loadComponent('footer', './components/footer.html');


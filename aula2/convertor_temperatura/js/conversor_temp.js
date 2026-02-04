function conversao() {
    const C = parseFloat(document.getElementById("temp").value);
    let F = C * 1.8 + 32;
    document.getElementById("resultado").innerHTML = `${F.toFixed(2)}°F`;
}

function clima() {
    temperatura = document.getElementById("resultado").value;
    if( temperatura >= 80) {
        body.classList.add('quente');
        body.classList.remove('neutro', 'frio');
    } else {
        body.classList.add('frio');
        body.classList.remove('neutro', 'frio');
    }
}
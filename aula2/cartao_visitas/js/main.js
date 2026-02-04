const nome = document.getElementById('nome');
const resultNome = document.getElementById('result-nome');
const cargo = document.getElementById('cargo');
const resultCargo = document.getElementById('result-cargo');
const cor = document.getElementById('cor');
const resulCor = document.getElementById('result-cor')

nome.onkeyup = function() {
    resultNome.innerHTML = nome.value
};

cargo.onkeyup = function() {
    resultCargo.innerHTML = cargo.value
};

cor.onkeyup = function() {
    sytyle
    resultCor.innerHTML = cor.value
};
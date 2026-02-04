// Exercício 1: Verificador de Turno e Prioridade


function classificarPrioridade() {

    alert('Classificador de Tarefas');

    let hora = parseInt(prompt('Digite a hora (0-23): '));
    let prioridade = parseInt(prompt('Digite a prioridade (1-10): '));

    let turno = '';
    
    if (hora >= 0 && hora < 12) {
        turno = 'manhã';
    } else if (hora >= 12 && hora < 18) {
        turno = 'tarde';
    }
    else if (hora >= 18 && hora <= 23) {
        turno = 'noite';
    } else {
        turno = 'hora inválida';
    }

    if (turno == 'manhã' || turno == 'tarde' && prioridade >= 9) {
        return console.log('TAREFA CRÍTICA/URGENTE');
    } else if (turno == 'manhã' || turno == 'tarde' && prioridade > 7 ) {
        return console.log('TAREFA IMPORTANTE');
    } else if (turno == 'manhã' || turno == 'tarde' && prioridade < 7) {
        return console.log('TAREFA NORMAL');
    } else if (turno == 'noite') {
        return console.log('TAREFA NÃO IMPORTANTE');
    } else if(turno == 'hora inválida') {
        return console.log('HORA INVÁLIDA');
    } else if (hora < 1 || hora > 10) {
        return console.log('PRIORIDADE INVÁLIDA');
    }


}

// classificarPrioridade();

// Exercício 2: Calculadora de Gastos Mensais
function calcularSalario () {

    alert('Calculadora de Gastos Mensais');

    let custoTotal;
    let saldoFinal;
    let salario = parseFloat(prompt('Digite o seu salário mensal: '));
    let aluguel = parseFloat(prompt('Digite o valor do aluguel mensal: '));
    let alimentacao = parseFloat(prompt('Digite o valor gasto com alimentação mensalmente: '));
    let lazer = parseFloat(prompt('Digite o valor gasto com lazer mensalmente: '));

    custoTotal = aluguel + alimentacao + lazer;

    saldoFinal = salario - custoTotal;

    if (saldoFinal > 0) {
        return console.log('SALDO POSITIVO');
    } else if (saldoFinal == 0) {
        return console.log('NO LIMITE');
    } else {
        return console.log('SALDO NEGATIVO');
    }

}

// calcularSalario();  

// Exercício 3: Formatador de Nomes para a Agenda
function formatarNome () {
    alert('Formatador de Nomes para a Agenda');

    let nome = prompt('Digite o nome completo: ');

    return console.log(nome.trim().toUpperCase());
}

// formatarNome();

// Exercício 4: Contador de Dias para o Evento
function contarDias() {

    let diahoje = new Date();
    let diaev  = parseInt(prompt("dia"));
    let anoev  = parseInt(prompt("ano"));
    let mesev  = parseInt(prompt("mes"));
    let horaev  = parseInt(prompt("hora"));
    let minutosev  = parseInt(prompt("minutos"));
    let segundosev  = parseInt(prompt("segundos"));
    let milisev  = parseInt(prompt("milissegundos"));
    let diaevento = new Date(anoev,mesev,diaev,horaev,minutosev,segundosev,milisev);
    let tempo =  diaevento.getTime() -  diahoje.getTime(); 
    console.log(diahoje)
    console.log(diaevento) 
    let tempodia = tempo/86400000             
    alert(Math.ceil(tempodia));
}

// contarDias();

// Exercício 5: Varredura de Compromissos (Loops)

function validarHorario() {
    alert('Varredura de Compromissos (Loops)');

    const array = [8, 12, 25, 15, -2, 20];

    array.forEach(index => {
        if(index >= 0 && index <= 23) {
            console.log(`Compromisso agendado para as ${index}`);
        } else {
            console.log(`Atenção: O horário ${index} é inválido`);
        }
    });
}

// validarHorario()
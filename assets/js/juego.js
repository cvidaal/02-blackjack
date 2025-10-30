/**
* 2C =.. Two of Clubs (Tréboles)
* 2D =.. Two of Diamonds (Diamantes)
* 2H =.. Two of Hearts (Corazones)
* 2S =.. Two of Spades (Espadas)
*/

// Variables
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0;
let puntosIA = 0;

// Referencias de HTML
const btnPedir = document.querySelector('#btnPedirCarta');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasIA = document.querySelector('#ia-cartas');
const puntosHTML = document.querySelectorAll('small');

// Crear baraja
const crearDeck = () => {
    for( let i = 2; i<=10; i++ ) {
        for(let tipo of tipos){ // Recorrer arreglo
            deck.push( i + tipo ); // Agregar elemento a un arreglo
        }
    }

    for (let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    // console.log(deck);
    deck = _.shuffle( deck ); // Uso de la libreria underscore para mezclar el arreglo
    return deck;
}
crearDeck();

// Función para tomar una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }; // Validar que el deck no esté vacío

    const carta = deck.pop();
    return carta;
}
//pedirCarta();
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Primera posición del string
    return isNaN(valor) ?
        (valor === 'A') ? 11 : 10
        : valor * 1; // Si no es un número, es una letra (A,J,Q,K)
}

// Turno de la IA
const turnoIA = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosIA += valorCarta(carta);
        puntosHTML[1].innerText = puntosIA;

        // <img class="carta" src="assets/cartas/10C.png" alt="cartas">
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasIA.append(imgCarta);

        if (puntosMinimos > 21){
            break;
        }

    } while((puntosIA < puntosMinimos) && (puntosMinimos <= 21));

    // Determinar ganador
    setTimeout(() => {
        if (puntosIA === puntosMinimos) {
        alert("Nadie gana (EMPATE)");
        } else if (puntosMinimos <= 21 && puntosIA > 21) {
        alert("Jugador GANA");
        } else {
        alert("IA GANA");
        }
    }, 10);

}

// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/10C.png" alt="cartas">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true; // Deshabilitar botón
        turnoIA(puntosJugador); // Llamar a la función de la IA si el jugador se pasa de 21
    } else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true; // Deshabilitar botón
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoIA( puntosJugador );
})

btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosIA = 0;

    // Limpiar puntos de jugador y de la IA
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    // Limpiar las cartas del jugador y de la IA
    divCartasJugador.innerHTML = '';
    divCartasIA.innerHTML = '';

    // Habilitar botones
    btnPedir.disabled = false;
    btnDetener.disabled = false;

});
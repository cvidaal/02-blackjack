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
    console.log(deck);
    return deck;
}
crearDeck();

// Función para tomar una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }; // Validar que el deck no esté vacío

    const carta = deck.pop();
    console.log(deck);
    console.log(carta); // Carta debe de ser de la baraja
    return carta;
}
//pedirCarta();
const valorCarta = (carta) => {
    
}
valorCarta('2C');
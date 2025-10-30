// Patrón Módulo
// funciones anónimas autoejecutables
const miModulo = (() => {
  "use-strict"; // Modo estricto

  // Variables
  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  const puntosJugadores = []; // Arreglo de puntos

  // Referencias de HTML
  const btnPedir = document.querySelector("#btnPedirCarta"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    puntosHTML = document.querySelectorAll("small");

  // Inicializar juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores.length = 0; // Reiniciar arreglo de puntos

    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    // Limpiar puntos de jugador y de la IA
    puntosHTML.forEach((elem) => (elem.innerText = 0));

    // Limpiar las cartas del jugador y de la IA
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ''));

    // Habilitar botones
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  // Crear baraja
  const crearDeck = () => {
    deck = []; // Reiniciar deck

    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        // Recorrer arreglo
        deck.push(i + tipo); // Agregar elemento a un arreglo
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }

    return _.shuffle(deck); // Mezclar deck usando Lodash
  };

  // Función para tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    } // Validar que el deck no esté vacío

    return deck.pop();
  };

  //pedirCarta();
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1); // Primera posición del string
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1; // Si no es un número, es una letra (A,J,Q,K)
  };

  // Turno: 0 = primer jugador y el último será la IA
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  // Crear carta
  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  // Determinar ganador
  const determinarGanador = () => {
    const [puntosMinimos, puntosIA] = puntosJugadores; // Desestructuración de arreglos

        setTimeout(() => {
          if (puntosIA === puntosMinimos) {
            alert("Nadie gana (EMPATE)");
          } else if (puntosMinimos <= 21 && puntosIA > 21) {
            alert("Jugador GANA");
          } else {
            alert("IA GANA");
          }
        }, 100);
  }

  // Turno de la IA
  const turnoIA = (puntosMinimos) => {
    let puntosIA = 0;
    do {
      const carta = pedirCarta();
      puntosIA = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosIA < puntosMinimos && puntosMinimos <= 21);

    // Determinar ganador
    determinarGanador();
  };

  // Eventos
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnPedir.disabled = true; // Deshabilitar botón
      turnoIA(puntosJugador); // Llamar a la función de la IA si el jugador se pasa de 21
    } else if (puntosJugador === 21) {
      console.warn("21, genial!");
      btnPedir.disabled = true; // Deshabilitar botón
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoIA(puntosJugadores[0]);
  });

//   btnNuevo.addEventListener("click", () => {
//     inicializarJuego(2);

//   });

    // Esta es la última parte del módulo que debo ejecutarlo para tener acceso en el index.html
    // Todo lo que ponga aquí sera público
    return {
        nuevoJuego : inicializarJuego, // Exponer la función para que sea público.
    };
})();

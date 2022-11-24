//Constantes del juego
const COLUMNAS = 15;
const FILAS = 15;
const CANTIDAD_MINAS = 30;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;

function setup()
{
  casillerosSinDescubrir = FILAS*COLUMNAS;
  
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo    está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");

  // Modificar/completar
  ponerMinasTablero();
}

function draw() {
  if (hizoClick == true)
  {
    if(mouseButton === LEFT)
    {
      if(tieneMinaCasillero(columnaPresionada, filaPresionada))
      {
        perder(); 
      }
      else
      {
        descubrirCasillero(columnaPresionada, filaPresionada);
        if (casillerosSinDescubrir === CANTIDAD_MINAS)
          {
            ganoElJuego();
          }
      }
    }
    else if (mouseButton === RIGHT) 
    {
     pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO); 
    }
      
    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
}

function ganoElJuego()
{
  return ganar();   //Esto hace que NUNCA gane el juego. Modificar/completar
}

function ponerMinasTablero()
{
  for (let contador = 0; contador < CANTIDAD_MINAS; contador++)
    {
      var col = floor(random(0, COLUMNAS));
      var fil = floor(random(0, FILAS));
      
      if(tieneMinaCasillero(col, fil))
      {
        contador--;
        continue;
      }
      else
      {
        ponerMinaCasillero(col, fil);
      }
    }
}

function mostrarMinas(contCol, contFil)
{
  for (var contFila = 0; contFila < FILAS; contFila++)
  {
    recorrerFila(contFila);
  }
}

function contarMinasAlrededor(columna, fila)
{
  var contador = 0;
  if (tieneMinaCasillero (columna -1, fila -1))
  {
    contador++;  
  }

  if (tieneMinaCasillero (columna, fila -1))
  {
    contador++;  
  }

  if (tieneMinaCasillero (columna +1, fila -1))
  {
    contador++;  
  }

  if (tieneMinaCasillero (columna -1, fila))
  {
    contador++;  
  }

  if (tieneMinaCasillero (columna +1, fila))
  {
    contador++;  
  }

  if (tieneMinaCasillero (columna -1, fila +1))
  {
    contador++;  
  }

  if (tieneMinaCasillero (columna, fila +1))
  {
    contador++;  
  }

if (tieneMinaCasillero (columna +1, fila +1))
  {
    contador++;  
  }
  
  return contador;
}

function recorrerFila(fila)
{
  for (var contCol = 0; contCol < COLUMNAS; contCol++)
      {
        if (tieneMinaCasillero(contCol, fila))
        {
          pintarCasillero(contCol, fila, COLOR_CASILLERO_CON_MINA);
        }
      }    
} 
let ojo;
let estado = 0;
let imgArray = [];
let currentIndex = 0;
let lastUpdateTime = 0;
let interval = 600;
let particles = [];
let pagina;


function preload() {
  imgArray[0] = loadImage("img/ojo1.png");
  imgArray[1] = loadImage("img/ojo4.png");
  imgArray[2] = loadImage("img/ojo3.png");
  imgArray[3] = loadImage("img/ojo2.png");
  imgArray[4] = loadImage("img/ojo5.png");
  intro = loadImage("img/intro.png");
}

// esta clase describe las propiedades de una sola partícula.

class Particle {
  // estableciendo las coordenadas, el radio y la velocidad de una partícula en ambos ejes de coordenadas.
  constructor() {
    this.x = random(0, width - 60);
    this.y = random(0, height - 50);
    this.r = 20;
    this.xSpeed = random(-2, 1.5);
    this.ySpeed = random(-1, 1.5);
  }

  // creación de una partícula.
  createParticle() {
    if (millis() - lastUpdateTime >= interval) {
      currentIndex = (currentIndex + 1) % imgArray.length; // aumenta el índice y lo mantiene en el rango del array
      lastUpdateTime = millis(); // guarda el tiempo actual como el último tiempo de actualización
    }

    noStroke();
    //fill('rgba(200,169,169,0.5)');
    imageMode(CENTER);
    image(imgArray[currentIndex], this.x, this.y, 35, 25);
  }
  // estableciendo la partícula en movimiento.
  moveParticle() {
    if (this.x < 0 || this.x > width - 60) this.xSpeed *= -1;
    if (this.y < 0 || this.y > height - 50) this.ySpeed *= -1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // esta función crea las conexiones(líneas)
  // entre partículas que están a menos de una cierta distancia de distancia

  joinParticles(paraticles) {
    particles.forEach((element) => {
      let dis = dist(this.x, this.y, element.x, element.y);
      if (dis < 225) {
        stroke("rgba(255,255,255,0.2)");
        line(this.x, this.y, element.x, element.y);
      }
    });
  }
}

// un array para agregar varias partículas

function setup() {
  createCanvas(984, 728);
  for (let i = 0; i < width / 25; i++) {
    particles.push(new Particle());}
  pagina=0;
  canvas = document.querySelector('canvas');
  canvas.addEventListener('contextmenu', botonDerecho);
}

function draw() {
  background("#0f0f0f");
  push();
  translate(30, 25);
  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
  push();
  fill(255, 100);
  rect(900, 680, 30, 2);
  pop();
  pop();
  
  if (frameCount > 150) {
    if      (pagina == 1){
                window.open("https://jeffercart.github.io/galeria/", "_top");} //galeria
    else if (pagina == 2){
               window.open("https://jeffercart.github.io/audios/", "_top");} //audio
    else if (pagina == 3) {
               window.open("https://jeffercart.github.io/cubos/", "_top");}//cubos
    }
  
 
}
function mouseClicked() {
  if ( mouseButton == LEFT &&
    mouseX > 880 &&
    mouseX < width &&
    mouseY > 650 &&
    mouseY < height
  ) {
    window.open(
      "https://jeffercart.github.io/memoria/",
      "_top"
    ); //memoria
  }

}


function botonDerecho(event) {
  // Evitar que aparezca el menú contextual del botón derecho del mouse
  event.preventDefault();

  // cuando se hace clic con el botón derecho pagina cambia por un numero random entero entre 1 y 3
  pagina = floor(random(4));
}

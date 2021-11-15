let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let meusPontos = 0;
let pontosDoOponente = 0;

let raquetadaSom;
let pontoSom;
let trilhaSom;

function preload() {
  trilhaSom = loadSound("trilha.mp3");
  pontoSom = loadSound("ponto.mp3");
  raquetadaSom = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilhaSom.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda () {
  if (xBolinha + raio> width || xBolinha - raio< 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio> height || yBolinha - raio< 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
    rect(x,y,larguraRaquete,alturaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - alturaRaquete/2 - 50;
  yRaqueteOponente += velocidadeYOponente;
}

function verificaColisaoRaquete() {
  if (xBolinha - raio< xRaquete + larguraRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetadaSom.play();
  }
}

function verificaColisaoRaqueteOponente() {
  if (xBolinha + raio> xRaqueteOponente + larguraRaquete/2 && yBolinha - raio < yRaqueteOponente + alturaRaquete && yBolinha + raio > yRaqueteOponente) {
    velocidadeXBolinha *= -1;
    raquetadaSom.play();
  }
}

function incluiPlacar () {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255,140,0));
  rect(150,20,40,20);
  fill(255);
  text(meusPontos,170,35);
  fill(color(255,140,0));
  rect(450,20,40,20);
  fill(255);
  text(pontosDoOponente,470,35);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    pontoSom.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    pontoSom.play();
  }
}
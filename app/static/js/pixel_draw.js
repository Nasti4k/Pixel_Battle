
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new WebSocket(`${wsProtocol}//${window.location.host}/ws`);

const canvas = document.getElementById('myCanvas');
const pixels = canvas.getContext('2d');
pixels.strokeStyle = 'rgb(0,0,0)';

const pageHight = 739.5;
const pageWidth = 1199.5;
pixels.strokeRect(0, 0, pageWidth, pageHight);

let color = 'rgb(0, 0, 0)';

const pixelWidth = 10;
const pixelHight = 10;

socket.onerror = function(error){(console.error('Ошибка подключения',error))};


document.getElementById('myCanvas').addEventListener('click', function(e) {
    const pix = {};

    const x = e.offsetX;
    const y = e.offsetY;
    const sizePixel = 10;
    const roundedX = Math.floor(x / sizePixel) * sizePixel;
    const roundedY = Math.floor(y / sizePixel) * sizePixel;
    pixels.fillStyle = color;

    pix.id = `${roundedX}${roundedY}`;
    pix.globColor = color;
    pix.pozicX = roundedX;
    pix.pozicY = roundedY;

    socket.send(JSON.stringify(pix));

    pixels.fillRect(roundedX, roundedY, pixelHight, pixelWidth);
});



function pullColor(object) {
    const x = object.pozicX;
    const y = object.pozicY;
    const newColor = object.globColor;
    pixels.fillStyle = newColor;
    pixels.fillRect( x, y, pixelHight, pixelWidth);
}

socket.onmessage = function(event) {
  const object = JSON.parse(event.data);
  pullColor(object);
};


document.getElementById('red').addEventListener('click', function() {
    color='rgb(255, 0, 0)'
});
document.getElementById('orange').addEventListener('click', function() {
    color='rgb(255, 165, 0)'
});
document.getElementById('yellow').addEventListener('click', function() {
    color='rgb(255, 255, 0)'
});
document.getElementById('green').addEventListener('click', function() {
    color='rgb(0, 128, 0)'
});
document.getElementById('skyblue').addEventListener('click', function() {
    color='rgb(135, 206, 235)'
});
document.getElementById('blue').addEventListener('click', function() {
    color='rgb(0, 0, 255)'
});
document.getElementById('purple').addEventListener('click', function() {
    color='rgb(128, 0, 128)'
});
document.getElementById('grey').addEventListener('click', function() {
    color='rgb(128, 128, 128)'
});
document.getElementById('brown').addEventListener('click', function() {
    color='rgb(165, 42, 42)'
});
document.getElementById('black').addEventListener('click', function() {
    color='rgb(0, 0, 0)'
});
document.getElementById('white').addEventListener('click', function() {
    color='rgb(255, 255, 255)'
});
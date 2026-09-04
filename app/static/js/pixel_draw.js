
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



const colorMap = {
    'red': 'rgb(255, 0, 0)',
    'orange': 'rgb(255, 165, 0)',
    'yellow': 'rgb(255, 255, 0)',
    'green': 'rgb(0, 128, 0)',
    'skyblue': 'rgb(135, 206, 235)',
    'blue': 'rgb(0, 0, 255)',
    'purple': 'rgb(128, 0, 128)',
    'grey': 'rgb(128, 128, 128)',
    'brown': 'rgb(165, 42, 42)',
    'black': 'rgb(0, 0, 0)',
    'white': 'rgb(255, 255, 255)'
};

Object.keys(colorMap).forEach(function(id) {
    document.getElementById(id).addEventListener('click', function() {
        color = colorMap[id];
    });
});
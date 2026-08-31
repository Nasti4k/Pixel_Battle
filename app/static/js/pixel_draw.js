
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
let socket = new WebSocket(`${wsProtocol}//${window.location.host}/ws`);

const canvas=document.getElementById('myCanvas');
const pixels=canvas.getContext("2d");
pixels.strokeStyle = 'rgb(0,0,0)';
pixels.strokeRect(0, 0, 1199.5, 739.5);
let color='rgb(0, 0, 0)';
const pix={}

socket.onerror=function(error){(console.error('Ошибка подключения',error))};


document.getElementById('myCanvas').addEventListener('click', function(e) {
    const x=e.offsetX
    const y=e.offsetY
    const size_pixel=10
    const roundedX = Math.floor(x / size_pixel) * size_pixel;
    const roundedY = Math.floor(y / size_pixel) * size_pixel;
    pixels.fillStyle = color;

    pix.id=`${roundedX}${roundedY}`
    pix.glob_color=color;
    pix.pozic_x=roundedX;
    pix.pozic_y=roundedY;

    socket.send(JSON.stringify(pix))

    pixels.fillRect(roundedX, roundedY, 10, 10);
});



function pull_color(t) {
    const x = t.pozic_x;
    const y = t.pozic_y;
    const new_color=t.glob_color;
    pixels.fillStyle = new_color;
    pixels.fillRect(x,y , 10, 10);
}

socket.onmessage = function(event) {
  const const_data=event.data;
  const s=JSON.parse(const_data);
  pull_color(s);
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
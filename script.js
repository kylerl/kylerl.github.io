var img;
var xMovement = 200
var yMovement = 200
var xSpeed = 0
var ySpeed = 0
var dots = []
var score = []
let timer = 60
console.log("script linked")


function preload() {
    changeImage('Pac-Right.png')
}

function setup() {
    createCanvas(windowWidth - 200, windowHeight - 100)
    let x = 60
    let y = 40
    for (i = 0; i < 684; i++) {
        let dot = {
            x: x,
            y: y,
            r: 8,
            color: 'white',
            score: false
        }
        dots.push(dot)
        x = x + 20
        if (x == 1200) {
            x = 60
            y += 40
        }
    }

}

function draw() {
    background('black')
    textSize(22);
    text('Score: ' + (score.length - 3), windowWidth - 340, windowHeight - 140);
    text('timer: ' + timer, 40, windowHeight - 140);
    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
    }
    if (timer == 0) {
        text("GAME OVER", width / 2, height * 0.7);
    }
    xMovement += xSpeed
    yMovement += ySpeed
    push()
    translate(-20, -20);
    image(img, xMovement, yMovement, 40, 40);
    pop()
    if (xMovement > windowWidth - 200) {
        xMovement = 0
    }
    if (xMovement < 0) {
        xMovement = windowWidth - 200
    }
    if (yMovement > windowHeight - 200) {
        yMovement = 0
    }
    if (yMovement < 0) {
        yMovement = windowHeight - 200
    }

    score = dots.filter(dot => dot.score == true)
    dots.forEach(dot => {
        fill(`${dot.color}`)
        stroke("rgba(0,0,0,0)")
        ellipse(dot.x, dot.y, dot.r)
        let d = dist(xMovement, yMovement, dot.x, dot.y)
        if (d < 25) {
            dot.color = "rgba(0,0,0,0)"
            dot.score = true
        }
    })

    if (score.length == 520 && timer > 0) {
        window.location.href = './index.html'
    }
}


function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        xSpeed = -7
        ySpeed = 0;
        changeImage('pac-left.png')
    }
    else if (keyCode === RIGHT_ARROW) {
        xSpeed = 7
        ySpeed = 0;
        changeImage('Pac-Right.png')
    }
    else if (keyCode === UP_ARROW) {
        ySpeed = -7
        xSpeed = 0;
        changeImage('pac-up.png')
    }
    else if (keyCode === DOWN_ARROW) {
        ySpeed = 7
        xSpeed = 0;
        changeImage('pac-down.png')
    }
}

function changeImage(image){
   return img = loadImage(image);
}
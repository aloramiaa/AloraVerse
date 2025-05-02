---
title: Exploring Creative Coding with p5.js
date: 2025-03-15
author: Alora Mia
excerpt: My adventures in creative coding using p5.js, with examples of generative art, interactive sketches, and tips for beginners.
coverImage: /images/blog/p5js.jpg
tags: [Creative Coding, p5.js, JavaScript, Generative Art]
featured: false
---

# Exploring Creative Coding with p5.js

I've always been fascinated by the intersection of art and technology. When I discovered p5.js, a JavaScript library for creative coding, I was immediately hooked! In this post, I'll share my journey into the world of generative art and interactive graphics.

## What is p5.js?

p5.js is a JavaScript library that makes coding accessible for artists, designers, educators, and beginners. It's based on the core principles of Processing but works directly in the browser. The library provides an easy way to create:

- Interactive visualizations
- Digital art
- Generative designs
- Animations
- Games and more!

## Getting Started

The simplest p5.js sketch looks something like this:

```javascript
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(mouseX, mouseY, 50, 50);
}
```

This creates a 400x400 pixel canvas and draws a circle that follows your mouse. Simple, but already interactive!

## My First Generative Artwork

After learning the basics, I created a pattern generator that produces unique designs each time it's run. Here's a simplified version:

```javascript
function setup() {
  createCanvas(800, 800);
  background(20);
  noLoop();
}

function draw() {
  // Create a color palette
  const colors = [
    color(255, 143, 0, 80),   // Orange
    color(255, 30, 86, 80),   // Pink
    color(138, 43, 226, 80),  // Purple
    color(30, 144, 255, 80)   // Blue
  ];
  
  // Draw 200 shapes
  for (let i = 0; i < 200; i++) {
    // Random position
    const x = random(width);
    const y = random(height);
    
    // Random size between 20 and 100
    const size = random(20, 100);
    
    // Random shape type (0 = circle, 1 = square, 2 = triangle)
    const shapeType = floor(random(3));
    
    // Random color from our palette
    const fillColor = colors[floor(random(colors.length))];
    fill(fillColor);
    noStroke();
    
    // Draw different shapes based on type
    if (shapeType === 0) {
      ellipse(x, y, size, size);
    } else if (shapeType === 1) {
      rectMode(CENTER);
      rect(x, y, size, size);
    } else {
      triangle(
        x, y - size/2,
        x - size/2, y + size/2,
        x + size/2, y + size/2
      );
    }
  }
  
  // Add some connecting lines
  stroke(255, 255, 255, 20);
  for (let i = 0; i < 100; i++) {
    const x1 = random(width);
    const y1 = random(height);
    const x2 = random(width);
    const y2 = random(height);
    line(x1, y1, x2, y2);
  }
}

function mousePressed() {
  // Generate a new pattern when mouse is clicked
  redraw();
}
```

Every time you click, it creates a completely new composition of shapes and colors. The possibilities are endless!

## Particle Systems and Physics

As I got more comfortable with p5.js, I started experimenting with particle systems. Here's a simple one that simulates floating particles:

```javascript
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create 100 particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0, 20);
  
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.color = color(random(150, 255), random(150, 255), 255);
    this.size = random(2, 8);
    this.maxSpeed = 2;
  }
  
  update() {
    // Add slight random movement
    let randomForce = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.acceleration.add(randomForce);
    
    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    
    // Reset acceleration
    this.acceleration.mult(0);
    
    // Wrap around edges
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }
  
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
```

## Sound Visualization

One of my favorite projects was creating a music visualizer that reacts to sound frequencies:

```javascript
let song;
let fft;

function preload() {
  song = loadSound('assets/music.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create and configure the Fast Fourier Transform analyzer
  fft = new p5.FFT();
  fft.setInput(song);
}

function draw() {
  background(0, 20);
  
  if (song.isPlaying()) {
    // Analyze the sound
    let spectrum = fft.analyze();
    let waveform = fft.waveform();
    
    // Draw spectrum
    noFill();
    stroke(138, 43, 226); // Purple
    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      vertex(x, height + h);
    }
    endShape();
    
    // Draw waveform
    stroke(30, 144, 255); // Blue
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = map(waveform[i], -1, 1, height/4, height/4*3);
      vertex(x, y);
    }
    endShape();
  } else {
    // Display play instructions
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Click to play/pause music', width/2, height/2);
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
```

## Tips for Beginners

If you're interested in creative coding with p5.js, here are some tips:

1. **Start simple** - Begin with basic shapes and interactions
2. **Experiment freely** - Don't worry about making mistakes; happy accidents often lead to interesting results
3. **Use randomness** - Introducing random elements makes each run unique
4. **Limit your palette** - A constrained color palette often looks more cohesive than random colors
5. **Save your work** - Use the `saveCanvas()` function to save images of your creations

## Learning Resources

These resources helped me a lot:

- [The Coding Train](https://thecodingtrain.com/) by Daniel Shiffman
- [p5.js Reference](https://p5js.org/reference/)
- [Nature of Code](https://natureofcode.com/)
- [OpenProcessing](https://openprocessing.org/) for inspiration

## What's Next?

I'm currently exploring:
- Combining p5.js with machine learning libraries like ml5.js
- Creating interactive installations using p5.js with physical computing
- Exploring 3D creative coding with WEBGL mode

Have you tried creative coding? I'd love to see what you've made! 
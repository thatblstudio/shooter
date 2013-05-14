function onLoad(){
	var game = new GamePlay();
	game.init();
}


function GamePlay() {
	
	var WIDTH = 800;
	var HEIGHT = 480;

	var canvas, context;
	var gameScore = 0.00;
	var gameMusic = new Audio();
	gameMusic.src = "sounds/gameMusic.mp3";
	gameMusic.loop = true;

	var map = {
		backgrounds:[
			{
				src:"images/mainbackground.png", 
				x:0,
				y:0,
				img:null
			},{
				src:"images/bgLayer1.png",
				x:0,
				y:0,
				img:null,
				animate:function() {
					this.x -= 1;

					if(this.x <= -WIDTH){
						this.x = WIDTH;
					}
				}
			}, {
				src:"images/bgLayer1.png",
				x:WIDTH,
				y:0,
				img:null,
				animate:function() {
					this.x -= 1;

					if(this.x <= -WIDTH){
						this.x = WIDTH;
					}
				}
			},{
				src:"images/bgLayer2.png",
				x:0,
				y:0,
				img:null,
				animate:function() {
					this.x -= 4;

					if(this.x <= -WIDTH){
						this.x = WIDTH;
					}
				}
			},{
				src:"images/bgLayer2.png",
				x:WIDTH,
				y:0,
				img:null,
				animate:function() {
					this.x -= 4;

					if(this.x <= -WIDTH){
						this.x = WIDTH;
					}
				}
			}

		],
		init: function() {
			for (var index in this.backgrounds) {
				var img = new Image();
				img.src = this.backgrounds[index].src;
				this.backgrounds[index].img = img;
			}		
		},
		draw: function() {
			var current_bg;
			for(var index in this.backgrounds) {
				current_bg = this.backgrounds[index];
				context.drawImage(current_bg.img, current_bg.x, current_bg.y)
			}
		},
		animate:function() {

			for(var i = 1; i < this.backgrounds.length; i++) {
				this.backgrounds[i].animate();
			}
		}
	}
	
	function Shoot(x, y) {
		this.x = x;
		this.y = y;
		this.img = new Image();
		this.img.src = "images/laser.png";
		this.animate = function() {
			this.x += 8;
		}
	}
	
	var player = {
		x:0,
		y:0,
		width:116,
		height:69,
		src:"images/player.png",
		img:null,
		shoots : [],
		init:function(){
			this.img = new Image();
			this.img.src = this.src;
		},
		animate:function(key) {
						
			if(key == "w") {
				player.y -= 4;
			}

			if(key == "s") {
				player.y += 4;
			}

			if(key == "d") {
				player.x += 4;
			}

			if(key == "a") {
				player.x -= 4;
			}

			if(key == "k") {
				player.shoot();

			}

		},
		draw:function(){
			context.drawImage(this.img, this.x, this.y);
			var current_shoot;
			for(var index in this.shoots) {
				current_shoot = this.shoots[index];
				context.drawImage(current_shoot.img, current_shoot.x, current_shoot.y);
			}
		},
		shoot:function() {
			var audio = new Audio();
			audio.src = "sounds/laserFire.wav";
			audio.play();
			
			gameScore+= 10;

			this.shoots.push(new Shoot( ( player.x+player.width ),  (player.y + ( player.height/2 ) ) ));
		}
	}	
	
	var key = [];
	this.init = function() {
		
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		
	
		map.init();
		player.init();

		window.addEventListener("keypress", keyHandler);
		window.addEventListener("keydown", keyHandler);
		window.addEventListener("keyup", keyupHandler);

		setInterval(animate, 1000/60);
		setInterval(render, 100);
		setInterval(keyListener, 1000/100);

		gameMusic.play();
	}

	function keyListener() {
		for(var index in key) {
			player.animate(key[index]);
		}
	}

	function keyHandler(e) {
		key.push(String.fromCharCode(e.charCode));

		if ( key.length >= 3) {
			key = key.slice(1);
		}
	}

	function keyupHandler(e) {
		
		key.splice(key.indexOf(String.fromCharCode(e.keyCode).toLowerCase()),1);
	}

	function animate() {
		map.animate();

		for(var index in player.shoots) {
			player.shoots[index].animate();
		}
	}

	function render() {
		map.draw();
		player.draw();
		context.fillStyle = "#FFF";
		context.font="bold 16px Arial";
		context.fillText("score: "+gameScore, 20, 30);
	}
}


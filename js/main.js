var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;

var bigFish;
var smallFish;

var mx;		//获取鼠标坐标
var my;

var smallFishTail = [];
var smallFishEye = [];
var smallFishBody = [];

var bigFishTail = [];
var bigFishEye = [];
var bigFishBodyOra = [];
var bigFishBodyBlue = [];

var data;

var wave;
var halo; //光晕

var dust;//漂浮物
var dustPic = [];


window.onload = game;
function game(){
	 init();		//初始化工作 
	 lastTime = Date.now();
	 deltaTime = 0;
	 gameloop();
}

function init(){
	//获得canvas context
	can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2");//background,ane,fruits
	ctx2 = can2.getContext("2d");

	can1.addEventListener('mousemove' , onMouseMove, false);

	bgPic.src = "pic/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	bigFish = new bigFishObj();
	bigFish.init();

	smallFish = new smallFishObj();
	smallFish.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	//小鱼尾巴图片
	for(var i=0; i<8; i++){
		smallFishTail[i] = new Image();
		smallFishTail[i].src = "pic/babyTail" + i + ".png";
	}

	//小鱼眼睛图片
	for(var i=0; i<2; i++){
		smallFishEye[i] = new Image();
		smallFishEye[i].src = "pic/babyEye" + i + ".png";
	}

	//小鱼身体图片
	for(var i=0; i<20; i++){
		smallFishBody[i] = new Image();
		smallFishBody[i].src = "pic/babyfade" + i + ".png";
	}

	//大鱼尾巴图片
	for(var i=0; i<8; i++){
		bigFishTail[i] = new Image();
		bigFishTail[i].src = "pic/bigTail" + i +".png";
	}

	//大鱼眼睛图片
	for(var i=0; i<2; i++){
		bigFishEye[i] = new Image();
		bigFishEye[i].src = "pic/bigEye" + i + ".png";
	}

	//大鱼身体图片
	for(var i=0; i<8; i++){
		bigFishBodyOra[i] = new Image();
		bigFishBodyBlue[i] = new Image();

		bigFishBodyOra[i].src = "pic/bigSwim" + i + ".png";
		bigFishBodyBlue[i].src = "pic/bigSwimBlue" + i + ".png";
	}

	data = new dataObj();

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i=0; i < 7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = "pic/dust" + i + ".png";
	}
	dust = new dustObj();
	dust.init();
}

function gameloop(){
	requestAnimFrame(gameloop);//比setInterval, setTimeout更科学,fps
	//根据机器来科学设定定时
	var now = Date.now();
	deltaTime = now - lastTime;		//deltaTime:每两帧之间的时间间隔
	lastTime = now;
	if(deltaTime > 40){
		deltaTime = 40;
	}

	drawBackground();
	ane.draw();

	furitMonitor();
	fruit.draw();

	ctx1.clearRect(0, 0, canWidth, canHeight);

	bigFish.draw();
	smallFish.draw();

	bigFishFruitsCollision();
	bsCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMove(ev){
	if(!data.gameOver){
		if(ev.offSetX || ev.layerX){
			mx = ev.offSetX == undefined ? 	ev.layerX : ev.offSetX;
			my = ev.offSetY == undefined ? 	ev.layerY : ev.offSetY;
		}
	}
}
var fruitObj = function(){
	this.alive = [];	//bool
	this.x = [];
	this.y = [];
	this.aneNO = [];
	this.l = []; //pic's length
	this.spd = []; //	每个果实都有它的速度
	this.fruitType = [];	//果实类型
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;

fruitObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;
		this.l[i] = 0; 
		this.spd[i] = Math.random() * 0.017 + 0.003; 	//[0.003,0.02)
		this.fruitType[i] = '';	
	}
	this.orange.src = "pic/fruit.png";
	this.blue.src = "pic/blue.png";
}
//游戏规则：保持屏幕上有15个果实
fruitObj.prototype.draw = function(){
	for(var i=0;i<this.num;i++){
			//draw
			//find an ane, grow, fly up
			if(this.alive[i]){
				if(this.fruitType[i] == "blue"){
					var pic = this.blue;
				}
				else{
					var pic = this.orange;
				}
				//果实成长
				if(this.l[i] <= 15){	
					var NO = this.aneNO[i];		//海葵编号
					this.x[i] = ane.headx[NO];	//果实成长时随着海葵摆动而摆动
					this.y[i] = ane.heady[NO];
					this.l[i] += this.spd[i] * deltaTime;	
				}
				else{
					this.y[i] -= this.spd[i] * 7 * deltaTime;
				}
				ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

				if(this.y[i] < 10){
					this.alive[i] = false;	
				}
			}
			
	}
}
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

fruitObj.prototype.born = function(i){
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.2){
		this.fruitType[i] = "blue";	//orange , blue
	}
	else{
		this.fruitType[i] = "orange";
	}
}	

function furitMonitor(){
	var num = 0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			num++;
		}	
	}
	if(num < 15){
		//send fruit
		sendFruit();
		return;
	}
}

function sendFruit(){
	for(var i=0 ; i< fruit.num; i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}



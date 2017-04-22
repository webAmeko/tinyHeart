var bigFishObj = function(){
		this.x;
		this.y;
		this.angle;

		this.bigFishTailTimer = 0;
		this.bigFishTailCount = 0;

		this.bigFishEyeTimer = 0;
		this.bigFishEyeCount = 0;
		this.bigFishEyeInterval = 1000;

		this.bigFishBodyCount = 0;
}
bigFishObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}

bigFishObj.prototype.draw = function(){

	//lerp x,y;
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	//delta angle
	//Math.atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//tail
	this.bigFishTailTimer += deltaTime;
	if(this.bigFishTailTimer > 50){
			this.bigFishTailCount = (this.bigFishTailCount + 1) % 8;
			this.bigFishTailTimer %= 50;
	}

	//eye
	this.bigFishEyeTimer += deltaTime;
	if(this.bigFishEyeTimer > this.bigFishEyeInterval){
			this.bigFishEyeCount = (this.bigFishEyeCount + 1) % 2;
			this.bigFishEyeTimer %= this.bigFishEyeInterval;
			if(this.bigFishEyeCount == 0){
					this.bigFishEyeInterval = Math.random() * 1500 + 2000;
			}
			else{
					this.bigFishEyeInterval = 200;
			}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var bigFishTailCount = this.bigFishTailCount;
	ctx1.drawImage(bigFishTail[bigFishTailCount] , -bigFishTail[bigFishTailCount].width * 0.5 + 30, -bigFishTail[bigFishTailCount].height * 0.5);

	var bigFishBodyCount = this.bigFishBodyCount;
	if(data.double == 1){			//orange
			ctx1.drawImage(bigFishBodyOra[bigFishBodyCount] , -bigFishBodyOra[bigFishBodyCount].width * 0.5, -bigFishBodyOra[bigFishBodyCount].height * 0.5);
	}	
	else{
			ctx1.drawImage(bigFishBodyBlue[bigFishBodyCount] , -bigFishBodyBlue[bigFishBodyCount].width * 0.5, -bigFishBodyBlue[bigFishBodyCount].height * 0.5);
	}


	var bigFishEyeCount = this.bigFishEyeCount;
	ctx1.drawImage(bigFishEye[bigFishEyeCount] , -bigFishEye[bigFishEyeCount].width * 0.5, -bigFishEye[bigFishEyeCount].height * 0.5);

	ctx1.restore();
}
var smallFishObj = function(){
		this.x;
		this.y;
		this.angle;
		this.smallFishBody = new Image();

		this.smallFishTailTimer = 0;
		this.smallFishTailCount = 0;

		this.smallFishEyeTimer = 0;
		this.smallFishEyeCount = 0;
		this.smallFishEyeInterval = 1000;

		this.smallFishBodyTimer = 0;
		this.smallFishBodyCount = 0;
}
smallFishObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	this.smallFishBody.src = "pic/babyFade0.png";
	
}
smallFishObj.prototype.draw = function(){
	//lerp x, y
	this.x = lerpDistance(bigFish.x , this.x, 0.98);
	this.y = lerpDistance(bigFish.y , this.y, 0.98);
	//lerp angle
	var deltaY = bigFish.y - this.y;
	var deltaX = bigFish.x - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.6); 

	//smallFish tail
	this.smallFishTailTimer += deltaTime;
	if(this.smallFishTailTimer > 50){
		this.smallFishTailCount = (this.smallFishTailCount + 1) % 8;
		this.smallFishTailTimer %= 50;
	}

	//smallFish eye
	this.smallFishEyeTimer += deltaTime;
	if(this.smallFishEyeTimer > this.smallFishEyeInterval){
			this.smallFishEyeCount = (this.smallFishEyeCount + 1) % 2;
			this.smallFishEyeTimer %= this.smallFishEyeInterval;

			if(this.smallFishEyeCount == 0){
				this.smallFishEyeInterval = Math.random() * 1500 + 2000;
			}
			else{
				this.smallFishEyeInterval = 200;
			}
	}

	//smallFish body
	this.smallFishBodyTimer += deltaTime;
	if(this.smallFishBodyTimer > 300){
			this.smallFishBodyCount = this.smallFishBodyCount + 1;
			this.smallFishBodyTimer %= 300;
			if(this.smallFishBodyCount > 19){

					this.smallFishBodyCount	= 19;
					//game over
					data.gameOver = true;
			}
	}

	//ctx1
	ctx1.save();	//只适用于小鱼(save和restore之间)
	//translate()
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var smallFishTailCount = this.smallFishTailCount;
	ctx1.drawImage(smallFishTail[smallFishTailCount], -smallFishTail[smallFishTailCount].width * 0.5 + 23, -smallFishTail[smallFishTailCount].height * 0.5);

	var smallFishBodyCount = this.smallFishBodyCount;
	ctx1.drawImage(smallFishBody[smallFishBodyCount], -smallFishBody[smallFishBodyCount].width * 0.5, -smallFishBody[smallFishBodyCount].height * 0.5);

	var smallFishEyeCount = this.smallFishEyeCount;
	ctx1.drawImage(smallFishEye[smallFishEyeCount], -smallFishEye[smallFishEyeCount].width * 0.5, -smallFishEye[smallFishEyeCount].height * 0.5);

	ctx1.restore();
}
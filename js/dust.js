var dustObj = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.NO = [];

	this.alpha;
}

dustObj.prototype.num = 30;

dustObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 20 + Math.random() * 25;	//振幅
		this.NO[i] = Math.floor(Math.random() * 7);//归一 [0, 7) (0~6整数值	)
	}
	this.alpha = 0;
}

dustObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0008;	//浮动和海葵一样
	var l = Math.sin(this.alpha);	//左右摇摆
	for(var i=0; i<this.num; i++){
		var no = this.NO[i];
		ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i]);
	}
}
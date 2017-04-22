//判断大鱼和果实的距离
function bigFishFruitsCollision(){
	if(!data.gameOver){
		for(var i=0;i< fruit.num;i++){
		if(fruit.alive[i]){
			//calculate length
			var l = calLength2(fruit.x[i], fruit.y[i], bigFish.x, bigFish.y);
			if(l< 900){
				//fruit eaten
				fruit.dead(i);

				data.fruitNum ++;
				bigFish.bigFishBodyCount ++;

				if(bigFish.bigFishBodyCount > 7){
					bigFish.bigFishBodyCount = 7;
				}

				if(fruit.fruitType[i] == "blue"){			//blue
					data.double = 2;
				}	
				wave.born(fruit.x[i], fruit.y[i]);
			}
		}
		}
	}
	
}

//bigFish & smallFish collision
function bsCollision(){
	if(data.fruitNum > 0 && !data.gameOver){
		var l = calLength2(bigFish.x, bigFish.y, smallFish.x, smallFish.y);
		if(l < 900){
				//smallFish recover
				smallFish.smallFishBodyCount = 0;

				//data => 0
				bigFish.bigFishBodyCount = 0;

				//score update
				data.addScore();	

				halo.born(smallFish.x, smallFish.y);	
		}
	}
}
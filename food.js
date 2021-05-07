class FOOD{
    constructor() {
        this.foodStock=0;
    this.lastFed;
    this.image=loadImage("images/Milk.png");
    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

    getFoodStock(){
        return this.foodStock;
    }
deductFood(){
    if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }
}
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    display(){
       var x=80;
        var y=100;
fill("white");
textSize(15);
if(lastFed>=12){
  text("Last Fed: "+lastFed%12+"p.m",50,30);
}
else if(lastFed===0){
  text("Last Fed: 12 a.m",50,30);
}

else{
text("Last Fed: "+lastFed+"a.m",50,30);
}
        imageMode(CENTER);
        image(this.image, 550,250,90,90);
        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if (i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

    bedroom(){
        background(bedroom,550,500);
    }

    garden() {
        background(garden,550,500);
    }

    washroom() {
        background(washroom,550,500);
    }
    

/*if(currentTime=(lastfed+1)) {
    update("Playing");
    foodObject.garden();
} 
  else if(currentTime=(lastFed+2)) {
    update("Sleeping");
    foodObject.bedroom();
}else if()*/


}


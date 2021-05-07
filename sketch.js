  var dog, happyDog, database, foodS, foodStock;
var fedTime,lastFed,foodObject;
var feed,add;
var changeState, readState;
var bedroom, garden, washroom;
var gameState;

function preload()
{
	//load images here
  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png")
  bedroom=loadImage("images/Bed Room.png");
  garden=loadImage("images/Garden.png");
  washroom=loadImage("images/Wash Room.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 500);
  foodObject=new FOOD();
  dog=createSprite(750,250, 20, 20);
  dog.scale=0.5;
  dog.addImage(dogImage);
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  feed=createButton("Feed The Dog!🐶");
  feed.position(800,50);
  feed.mousePressed(feedDog);
  add=createButton("Add Food!🥣");
  add.position(700,50);
 add.mousePressed(addFood);

 fedTime=database.ref("feedTime");
 fedTime.on("value", function(data){
lastFed=data.val();
 })

 readState=database.ref("gameState");
 readState.on("value", function(data){
   gameState=data.val();
 });
}



function draw() {  
background(46,139,87);


currentTime=hour();
if(currentTime===lastFed+1) {
  update("play");
 foodObject.garden();
}

else if(currentTime===lastFed+2){
  update("sleeping");
  foodObject.bedroom();
}

else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
update("bathing");
foodObject.washroom();
}

else{
update("hungry");
foodObject.display();
}


if(gameState!="hungry") {
  feed.hide();
  add.hide();
  dog.remove();
}
else{
  feed.show();
  add.show();
  dog.addImage(dogImage);
}







drawSprites();
  //add styles here

}
function readStock(food) {
foodS=food.val();
foodObject.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  if (foodObject.getFoodStock()<=0){
    foodObject.updateFoodStock(0);
  }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  }

  database.ref("/").update({
    Food:foodObject.getFoodStock(),
    feedTime:hour(),
    gameState:"hungry",
  });
  
}

function addFood() {
  foodS++
  database.ref("/").update({
    Food:foodS,
  })
}

function update(state) {
database.ref("/").update({
  gameState:state,
})
}

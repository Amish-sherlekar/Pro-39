var dog, dogHappy, dogSad;
var database, foodS, foodStock;
var fedTime, lastFed, feed, addFoods, foodObj;

function preload() {
   dogImg = loadImage("images/dogImg.png");
   dogImg2 = loadImage("images/dogImg1.png");
}
function setup() {
   createCanvas(1000, 500);
   foodObj = new Food();

   database = firebase.database();
   dog = createSprite(800, 200, 10, 10);
   dog.addImage(dogImg);
   dog.scale = 0.2

   feed = createButton("FEED");
   feed.position(600, 30);
   feed.mousePressed(feedDog);

   this.addFoods = createButton("ADD FOOD");
   this.addFoods.position(700, 30);
   this.addFoods.mousePressed(addFood);

   foodStock = database.ref('Food');
   foodStock.on("value", readStock);
}

function draw() {
   background(140, 210, 144);
   foodObj.display();

   fedTime = database.ref('fedTime');
   fedTime.on('value', function (data) {
      lastFed = data.val();
   })
   if (lastFed >= 12) {
      text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
   } else if (lastFed === 0) {
      text("LAST FEED : 12 am", 350, 30);
   } else {
      text("LAST FEED :" + lastFed + 'am', 350, 30);
   }
   drawSprites();

}
function readStock(data) {
   foodS = data.val();
   foodObj.updateFoodStock(foodS)
}
function feedDog() {
   dog.addImage(dogImg2)
   foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
   database.ref('/').update({
      Food: foodObj.getFoodStock(), fedTime: hour()
   })
}
function addFood() {
   dog.addImage(dogImg)
   foodS++
   database.ref('/').update({
      Food: foodS
   })
}
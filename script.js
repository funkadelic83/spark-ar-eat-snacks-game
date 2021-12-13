const Scene = require('Scene');
const Reactive = require('Reactive');
const Patches = require('Patches');
const Animation = require('Animation');
export const Diagnostics = require('Diagnostics');




(async function() {
  const snackArray = [];
  const time = 15;
  const isGameActive = false;
  const scoreInteger = 0;
  var pulsed;
  var xValue = 0;
  const yTargetPos = -0.6;
  //const scoreText = scoreGameObject.text;


const [snack1, snack2, snack3, snack4, snack5, snack6, snack7, snack8, snack9, mike, tom] = await Promise.all([
  Scene.root.findFirst('Snack1'),
  Scene.root.findFirst('Snack2'),
  Scene.root.findFirst('Snack3'),
  Scene.root.findFirst('Snack4'),
  Scene.root.findFirst('Snack5'),
  Scene.root.findFirst('Snack6'),
  Scene.root.findFirst('Snack7'),
  Scene.root.findFirst('Snack8'),
  Scene.root.findFirst('Snack9'),
  Scene.root.findFirst('Mike'),
  Scene.root.findFirst('Tom')]);
const scoreGameObject = await Scene.root.findFirst('ScoreText');
const mouthCollider = await Scene.root.findFirst('MouthCollider');
snackArray.push(snack1, snack2, snack3, snack4, snack5, snack6, snack7, snack8, snack9, mike, tom)

Patches.outputs.getScalar('randomXPosition').then(event=> {
  event.monitor().subscribe(function (values) {
    xValue = values.newValue;
  });

//SUBSCRIBES TO PULSE FROM PATCH EDITOR. PULSE IS TRIGGERED AT START, AT COLLISION, AND AT MISS
Patches.outputs.getPulse('spawnSnackPulse').then(event=> {
  pulsed = event.subscribe(function() {
    //PICKS A RANDOM SNACK AND TRANSFORMS THE X VALUE, THEN STARTS THE ANIMATION
    const snackIndex = Math.floor(Math.random() * snackArray.length);
    snackArray[snackIndex].transform.x = xValue;
    //NEED TO REMOVE THE SNACK FROM THE ARRAY BEFORE PUBLISHING
    //OR, ONLY HAVE 1 SNACK AT A TIME

    const randomTime = (Math.random() + 2) * 1000;  //SETS RANDOM TIME BETWEEN 2-3 SECONDS
    var driver = Animation.timeDriver({durationMilliseconds: randomTime});
    var sampler = Animation.samplers.linear(0, yTargetPos);
    snackArray[snackIndex].transform.y = Animation.animate(driver, sampler);
    driver.start();

    //ADD THE SNACK BACK TO THE ARRAY AFTER ANIMATION IS COMPLETED
    //OR, ONLY HAVE ONE SNACK AT A TIME
    });  
  });
});

})();
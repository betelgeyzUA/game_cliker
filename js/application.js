var application = {
  i: 0,

  enemy: [
    {name: "Small Golem", heals: 100, up:1},
    {name: "Wiking", heals: 100, up:1}
  ],

  init: function() {
    console.log('App loaded');

    this.initEvants();
  },

  initEvants: function(){
    if (this.enemy.length > this.i) {
      console.log('int loaded');
      var img = document.createElement("img");
      img.setAttribute("id", "enemy"+this.i);
      img.setAttribute("src", "img/cliker/emeny"+this.i+".png");
      document.getElementById('GameCanvas').appendChild(img);
    } else {
      alert("Game Over");
    }
    var start_Button = document.getElementById("StartButton");
    var enemy01 = document.getElementById("enemy"+this.i);
    start_Button.addEventListener('click', this.clickStart.bind(this));
    enemy01.addEventListener('click', this.enemyAttack.bind(this))
  },

  clickStart: function (event) {
    console.log("It works Add");
    document.getElementById('SplashScreen').style.display = 'none';
    document.getElementById('GameCanvas').style.display = 'block';
  },

  enemyAttack: function (event) {

    if (this.enemy.length > this.i) {
      var span = document.createElement("span");
      span.innerHTML = '<span>' + this.enemy[this.i].name + '</span>' + '<input type="text" id="enemyHeals" disabled size="2" class="span2">';
      span.setAttribute("id", "heals");

      console.log("Attack");
      var game_Scine = document.getElementById('GameCanvas');
      if (document.getElementById('info')) {
        game_Scine.removeChild(document.getElementById("info"));
      }

      if (!(document.getElementById('heals'))) {
        game_Scine.appendChild(span);
        console.log("Add enemyHeals");
      }

      if (this.enemy[this.i].heals > 0) {
        this.enemy[this.i].heals -= 10;
        console.log(this.enemy[this.i].heals);
        document.getElementById('enemyHeals').value = this.enemy[this.i].heals;
      } else {
        game_Scine.removeChild(document.getElementById("heals"));
        game_Scine.removeChild(document.getElementById('enemy' + this.i));
        this.i ++;
        console.log("Enemy Death");
        this.initEvants();
      }
    }

  }
}

window.onload = function() {
  application.init();
}

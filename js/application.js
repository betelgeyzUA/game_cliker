var application = {

  // Переменая счетчик для массива enemy
  i: 0,

  // Массив противников enemy
  enemy: [
    {name: "SMALL GOLEM", heals: 100, up:1, enemy_ID: "enemy00", enemy_Img: "img/cliker/emeny0.png"},
    {name: "VIKING", heals: 110, up:1, enemy_ID: "enemy01", enemy_Img: "img/cliker/emeny1.png"}
  ],

  // Функция инициализации первичной загрузки
  init: function() {
    console.log('App loaded');
    this.initStart();
    this.initEvants();
  },

  // Инициализация стартового экрана и кнопки старт
  initStart: function () {
    console.log('int start');
    var start_Button = document.getElementById("StartButton");
    start_Button.addEventListener('click', this.clickStart.bind(this));
  },

  // Инициализация действие нажатие кнопки по противнику
  initEvants: function(){
    console.log('int loaded initEvants');
    this.enemyCreate();
    var enemy01 = document.getElementById(this.enemy[this.i].enemy_ID);
    enemy01.addEventListener('click', this.enemyAttack.bind(this));
  },

  // Создание противника и помещение его в DOM дерево
  enemyCreate: function() {
    if (this.enemy.length > this.i) {
      var img = document.createElement("img");
      img.setAttribute("id", this.enemy[this.i].enemy_ID);
      img.setAttribute("src", this.enemy[this.i].enemy_Img);
      document.getElementById('GameCanvas').appendChild(img);
    } else {
      alert("Game Over");
    }
  },

  // Удаление противника с DOM дерева при окончании это жизней
  enemyDestroy: function() {
    document.getElementById('GameCanvas').removeChild(document.getElementById("heals"));
    document.getElementById('GameCanvas').removeChild(document.getElementById(this.enemy[this.i].enemy_ID));
    this.i ++;
    console.log("Enemy Death");
    this.initEvants();
  },

   enemyAddHels: function () {
      var span = document.createElement("span");
      span.innerHTML = '<span>' + this.enemy[this.i].name + '</span>' + '<input type="text" id="enemyHeals" disabled size="2" class="span2">';
      span.setAttribute("id", "heals");

     if (!(document.getElementById('heals'))) {
       document.getElementById('GameCanvas').appendChild(span);
       console.log("Add enemyHeals");
     }
   },

  clickStart: function (event) {
    console.log("It works Add");
    document.getElementById('main_game').removeChild(document.getElementById('SplashScreen'));
    document.getElementById('GameCanvas').style.display = 'block';
  },

  enemyAttack: function (event) {

    this.enemyAddHels();

    if (this.enemy.length > this.i) {
      console.log("Attack");
      if (document.getElementById('info')) {
        document.getElementById('GameCanvas').removeChild(document.getElementById("info"));
      }

      if (this.enemy[this.i].heals > 0) {
        this.enemy[this.i].heals -= 10;
        console.log(this.enemy[this.i].heals);
        document.getElementById('enemyHeals').value = this.enemy[this.i].heals;
      } else {
        this.enemyDestroy();
      }

    }

  }
}

window.onload = function() {
  application.init();
}

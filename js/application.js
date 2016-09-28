var application = {

  // Переменая счетчик для массива enemy
  i: 0,
  e_hels_static: 0,
  sum_Damage: 0,

  // Массив противников enemy
  enemy: [
    {name: "SMALL GOLEM", heals: 10, up:1, enemy_ID: "enemy00", enemy_Img: "img/cliker/emeny0.png"},
    {name: "VIKING", heals: 11, up:1, enemy_ID: "enemy01", enemy_Img: "img/cliker/emeny1.png"}
  ],

  // Наш герой
  heroes: {
    name: 'Kurd',
    attack: 1,
    gold: 0,
    exp: 0
  },

  // Функция инициализации первичной загрузки
  init: function() {
    console.log('App loaded');
    this.insertText();
    this.initEvants();
  },

  // Инициализация стартового экрана и кнопки старт
  initStart: function () {
    var div = document.createElement("div");
    div.setAttribute("id", "center");
    document.getElementById('SplashScreen').appendChild(div);
    console.log('int start');
    var input = document.createElement("input")
    input.setAttribute("id", "StartButton");
    input.setAttribute("type", "button");
    input.setAttribute("value", "Start");
    document.getElementById('center').appendChild(input);

    var start_Button = document.getElementById("StartButton");
    start_Button.addEventListener('click', this.clickStart.bind(this));
  },

  // Анимация первичного текста
  insertText: function () {
    var div = document.createElement("div");
    div.setAttribute("id", "area");
    document.getElementById('SplashScreen').appendChild(div);

    var show = function (value) {
      $div = $('#area');
      var text = value;
      $div.text(text).fadeIn(500);
      $div.delay(1500).fadeOut(500)

    };

    setTimeout(show, 1000, "PRESENT BY");
    setTimeout(show, 4000, "BETELGEYZ");
    setTimeout(this.initStart.bind(this), 7000);
   
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
      this.enemyAddHels();
      this.e_hels_static = this.enemy[this.i].heals;
      this.sum_Damage = 0;
    } else {
      console.log("Game Over");
    }
  },

  // Удаление противника с DOM дерева при окончании это жизней
  enemyDestroy: function() {
    document.getElementById('GameCanvas').removeChild(document.getElementById("addenemyHeals"));
    document.getElementById('GameCanvas').removeChild(document.getElementById(this.enemy[this.i].enemy_ID));
    this.i ++;
    console.log("Enemy Death");
    this.initEvants();
  },

   // Добавление колонки жизни для противника
   enemyAddHels: function () {
      //var span = document.createElement("span");
      //span.innerHTML = '<span>' + this.enemy[this.i].name + '</span>' + '<input type="text" id="enemyHeals" disabled size="2" class="span2">';
      //span.setAttribute("id", "heals");
     var add_div_heals = document.createElement("div");
     add_div_heals.setAttribute("id", "addenemyHeals");

     var div_heals = document.createElement("div");
     div_heals.setAttribute("id", "enemyHeals");

     var div_sword = document.createElement("div");
     div_sword.setAttribute("id", "divsword");

     var span_hels = document.createElement("span");
     span_hels.setAttribute("id", "spanEnemyHeals");

     if (!(document.getElementById('addenemyHeals'))) {
       document.getElementById('GameCanvas').appendChild(add_div_heals);
       console.log("Add enemyHeals");
     }

     if (!(document.getElementById('enemyHeals'))) {
       document.getElementById('addenemyHeals').appendChild(div_heals);
       document.getElementById('enemyHeals').appendChild(div_sword);
       document.getElementById('divsword').appendChild(span_hels);
       console.log("enemyHeals");
     }
     document.getElementById('spanEnemyHeals').innerHTML = this.enemy[this.i].heals;
   },

    // Инфо блок атаковать противника
    info: function () {
      if (document.getElementById('info')) {
        document.getElementById('GameCanvas').removeChild(document.getElementById("info"));
      }
    },

    // Действие при нажание кнопки старт
    clickStart: function (event) {
      console.log("It works Add");
      document.getElementById('main_game').removeChild(document.getElementById('SplashScreen'));
      document.getElementById('GameCanvas').style.display = 'block';
    },

  // Атака противника при нажатии
    enemyAttack: function (event) {

      if (this.enemy.length > this.i) {
        console.log("Attack");

        this.info();

        if (this.enemy[this.i].heals > 0) {

          this.enemy[this.i].heals -= this.heroes.attack;
          console.log(this.enemy[this.i].heals);
          document.getElementById('spanEnemyHeals').innerHTML = this.enemy[this.i].heals;
          this.sum_Damage += this.heroes.attack;

          if (this.sum_Damage > 0) {
              document.getElementById('enemyHeals').style.width = 100 - (this.sum_Damage / this.e_hels_static * 100) + '%';
            if (this.enemy[this.i].heals <= 0) {
              this.enemyDestroy();
            }

          }
        }

      }

    }

}

window.onload = function() {
  application.init();
}

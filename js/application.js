var application = {
  heals: 100,

  init: function() {
    console.log('App loaded');
    this.initEvants();
    document.getElementById('enemyHeals' ).value = this.heals;
    setTimeout(this.info, 3000);
  },

  initEvants: function(){
    console.log('int loaded');
    var start_button = document.getElementById("StartButton");
    var myenemy01 = document.getElementById("enemy01");
    start_button.addEventListener('click', this.clickStart.bind(this));
    myenemy01.addEventListener('click', this.enemyAttack.bind(this))
  },

  clickStart: function (event) {
    console.log("It works Add");
    document.getElementById('SplashScreen' ).style.display = 'none';
    document.getElementById('GameCanvas' ).style.display = 'block';
  },

  enemyAttack: function (event) {
    console.log("Attack");
    document.getElementById('enemy01').style.height = "83px" ;
    if (this.heals > 0) {
      this.heals -= 2;
      console.log(this.heals);
      document.getElementById('enemyHeals' ).value = this.heals;
    } else {
      document.getElementById('enemy01').style.display = 'none';
      alert("Enemy Death");
    }
  },
  
  info: function () {
    document.getElementById('info').style.display = 'none';
  }

}


window.onload = function() {
  application.init();
}

$(function() {
    var socket = io.connect('http://localhost');
    socket.on('connect', function() {
        socket.emit('msg update');
        console.log('connected');
    });

    $(document).on('click','#btn',function() {
        var message = $('#message');
        //サーバーにメッセージを引数にイベントを実行する
        socket.emit('msg send', message.val());
    });
    
    $(document).on(click,'#delete',function(){
    socket.emit('deleteDB');
  });


    //サーバーが受け取ったメッセージを返して実行する
    socket.on('msg push', function (msg) {
        console.log(msg);
        var date = new Date();
        $('#list').prepend($('<dt>' + date + '</dt><dd>' + msg + '</dd>'));
    });
    socket.on('msg updateDB', function(msg){
        console.log(msg);
    });
    
      //接続されたらDBにあるメッセージを表示
  socket.on('msg open', function(msg){
    //DBが空っぽだったら
    if(msg.length == 0){
        return;
    } else {
      $('#list').empty();
      $.each(msg, function(key, value){
        $('#list').prepend($('<dt>' + value.date + '</dt><dd>' + value.message + '</dd>'));
      });  
    }
  });

  //DBにあるメッセージを削除したので表示も消す
  socket.on('db drop', function(){
    $('#list').empty();
  });

    
});

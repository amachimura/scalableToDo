$(function() {
    var socket = io.connect('http://localhost');
    socket.on('connect', function() {
        socket.emit('msg update');
        console.log('connected');
    });

    $(document).on('click','#btn',function() {
        var message = $('#message');
        //�T�[�o�[�Ƀ��b�Z�[�W�������ɃC�x���g�����s����
        socket.emit('msg send', message.val());
    });
    
    $(document).on(click,'#delete',function(){
    socket.emit('deleteDB');
  });


    //�T�[�o�[���󂯎�������b�Z�[�W��Ԃ��Ď��s����
    socket.on('msg push', function (msg) {
        console.log(msg);
        var date = new Date();
        $('#list').prepend($('<dt>' + date + '</dt><dd>' + msg + '</dd>'));
    });
    socket.on('msg updateDB', function(msg){
        console.log(msg);
    });
    
      //�ڑ����ꂽ��DB�ɂ��郁�b�Z�[�W��\��
  socket.on('msg open', function(msg){
    //DB������ۂ�������
    if(msg.length == 0){
        return;
    } else {
      $('#list').empty();
      $.each(msg, function(key, value){
        $('#list').prepend($('<dt>' + value.date + '</dt><dd>' + value.message + '</dd>'));
      });  
    }
  });

  //DB�ɂ��郁�b�Z�[�W���폜�����̂ŕ\��������
  socket.on('db drop', function(){
    $('#list').empty();
  });

    
});

$ (function() {
  function buildHTML(message) {
    image = message.image ? `<img src="${message.image}" class="message__image">` : "";
    var html = `<div class="main__body__message-list__message" data-message-id="${message.id}">
                  <div class="main__body__message-list__message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="main__body__message-list__message__time">
                    ${message.created_at}
                  </div>
                  <div class="main__body__message-list__message__text">
                      <p class="main__body__message-list__message__text">
                        ${message.text}
                      </p>
                      ${image}
                  </div>
                </div>`
    return html;
  };


//自動スクロールする関数
  function scrollBottom(){
    $(".main__body").animate({scrollTop: $(".main__body")[0].scrollHeight}, 'slow')
  }


// イベント。発火設定
  $('#new_message').on('submit', function(e) {
    e.preventDefault();

// イベント。発火設定
    var formData = new FormData(this);
// フォームに入力された内容を取得
    var href = $(this).attr('action');
    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })

    // ajax処理が成功した場合
    .done(function(data) {
      var html = buildHTML(data);
      $('.main__body__message-list').append(html); // 入力された値をHTML反映
      $('.form__message').val(''); // 入力された値をリセット
      $('.hidden').val('');
      scrollBottom();
    })
    .fail(function() {
      alert('自動メッセージ取得に失敗しました');
    })
    //ajax処理が失敗した場合
    .always(function(){
      $('.form__submit').prop("disabled", false); //submit処理を有効化
    })
  });


//自動更新
  var interval = setInterval(function() {
    // チャットグループの最新のメッセージのidを取得
    var last_message_id = $(".main__body__message-list__message").data('message-id');

    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        dataType: 'json',
        data: {id: last_message_id}
      })

      // ajax処理が成功した場合の処理
      .done(function(message_list){
        if (message_list != null ){
          message_list.forEach(function(message) {
            var insert = buildHTML(message);
            $('.main__body__message-list').append(insert); // 入力された値をHTML反映
            scrollBottom();
          });
        }
      })

      // Ajax処理が失敗した時の処理
      .fail(function(){
        alert('メッセージの自動更新に失敗しました');
      });
    } else {
    clearInterval(interval);
  }}, 5*1000 ); //5秒ごと
});

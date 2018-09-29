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

  function scrollBottom(){
    $(".main__body").animate({scrollTop: $(".main__body")[0].scrollHeight}, 'slow')
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);
    var href = $(this).attr('action');
    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main__body__message-list').append(html)
      $('.form__message').val('');
      $('.hidden').val('');
      scrollBottom();
    })
    .fail(function() {
      alert('自動メッセージ取得に失敗しました');
    })
    .always(function(){
      $('.form__submit').prop("disabled", false);
    })
  });

  var interval = setInterval(function() {
    var last_message_id = $(".main__body__message-list__message").last().data('message-id');

    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        dataType: 'json',
        data: {id: last_message_id}
      })


      .done(function(message_list){
        if (message_list != null ){
          message_list.forEach(function(message) {
            var insert = buildHTML(message);
            $('.main__body__message-list').append(insert);
            scrollBottom();
          });
        }
      })

      .fail(function(){
        alert('メッセージの自動更新に失敗しました');
      });
    } else {
    clearInterval(interval);
  }}, 3*1000 );
});

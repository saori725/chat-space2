$ (function() {
  function buildHTML(message) {
    image = message.image ? `<img src="${message.image}" class="message__image">` : "";
    var html = `<div class="main__body__message-list__message">
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
    var position = $(".main__body")[0].scrollHeight;
    $(".main__body").animate({scrollTop: position}, 500);
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
      $('.main__body__message-list').append(html);
      $('.form').val('');
      scrollBottom();
    })
    .fail(function() {
      alert('自動メッセージ取得に失敗しました');
    })
    .always(function(){
      $('.form__submit').prop("disabled", false);
    })
  });
});

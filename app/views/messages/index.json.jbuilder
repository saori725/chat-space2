json.array! @new_messages do |message|
  json.id           message.id
  json.name         message.user.name
  json.created_at   message.created_at
  json.text         message.text
  json.image        message.image.url
end

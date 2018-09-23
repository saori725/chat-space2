FactoryGirl.define do
  factory :message do
    text Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/paris.jpg")
    user
    group
  end
end

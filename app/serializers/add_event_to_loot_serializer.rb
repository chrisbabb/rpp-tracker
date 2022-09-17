class AddEventToLootSerializer < ActiveModel::Serializer
  attributes :id, :name, :points
  has_many :events
end

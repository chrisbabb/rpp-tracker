class AddLootToEventSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :loots
end

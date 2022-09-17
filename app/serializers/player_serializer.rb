class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name, :status
  has_many :loots
  has_many :raids
end

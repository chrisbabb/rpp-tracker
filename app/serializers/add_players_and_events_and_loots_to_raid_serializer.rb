class AddPlayersAndEventsAndLootsToRaidSerializer < ActiveModel::Serializer
  attributes :id, :points, :start_time, :end_time, :bonus, :created_at
  has_many :players
  has_many :events
  has_many :loots
end

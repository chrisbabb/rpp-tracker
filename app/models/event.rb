class Event < ApplicationRecord
  has_many :event_loots
  has_many :loots, through: :event_loots
  has_many :raid_events
  has_many :raids, through: :raid_events
end

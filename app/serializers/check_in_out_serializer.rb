class CheckInOutSerializer < ActiveModel::Serializer
  attributes :id, :time, :raid_id, :player_id, :in_or_out
end

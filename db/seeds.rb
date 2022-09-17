require 'faker'

10.times do
    raid = Raid.create!(points: 300, start_time: 1661338800000, end_time: 1661353200000, bonus: 15)

    10.times do
        event = Event.create!(name: Faker::Games::DnD.monster)
        loot = Loot.create!(name: Faker::Games::DnD.melee_weapon, points: 300)
        player = Player.create!(name: Faker::TvShows::RickAndMorty.character, status: 'm')
        RaidPlayer.create!(raid: raid, player: player)
        RaidEvent.create!(raid: raid, event: event)
        EventLoot.create!(event: event, loot: loot)
        PlayerLoot.create!(player: player, loot: loot)
        RaidLoot.create!(raid: raid, loot: loot)
    end
end

CheckInOut.create!(time: 1661342400000, raid_id: 1, player_id: 1, in_or_out: 'i')
CheckInOut.create!(time: 1661342400000, raid_id: 1, player_id: 1, in_or_out: 'o')
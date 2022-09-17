class CreateRaidEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :raid_events do |t|
      t.references :raid
      t.references :event
      t.timestamps
    end
  end
end

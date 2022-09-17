class CreateEventLoots < ActiveRecord::Migration[7.0]
  def change
    create_table :event_loots do |t|
      t.references :event
      t.references :loot
      t.timestamps
    end
  end
end

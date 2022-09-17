# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_25_035809) do
  create_table "check_in_outs", force: :cascade do |t|
    t.integer "time"
    t.integer "raid_id"
    t.integer "player_id"
    t.string "in_or_out"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "event_loots", force: :cascade do |t|
    t.integer "event_id"
    t.integer "loot_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_event_loots_on_event_id"
    t.index ["loot_id"], name: "index_event_loots_on_loot_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "loots", force: :cascade do |t|
    t.string "name"
    t.integer "points"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "player_loots", force: :cascade do |t|
    t.integer "player_id"
    t.integer "loot_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["loot_id"], name: "index_player_loots_on_loot_id"
    t.index ["player_id"], name: "index_player_loots_on_player_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "raid_events", force: :cascade do |t|
    t.integer "raid_id"
    t.integer "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_raid_events_on_event_id"
    t.index ["raid_id"], name: "index_raid_events_on_raid_id"
  end

  create_table "raid_loots", force: :cascade do |t|
    t.integer "raid_id"
    t.integer "loot_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["loot_id"], name: "index_raid_loots_on_loot_id"
    t.index ["raid_id"], name: "index_raid_loots_on_raid_id"
  end

  create_table "raid_players", force: :cascade do |t|
    t.integer "raid_id"
    t.integer "player_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_raid_players_on_player_id"
    t.index ["raid_id"], name: "index_raid_players_on_raid_id"
  end

  create_table "raids", force: :cascade do |t|
    t.integer "points"
    t.integer "start_time"
    t.integer "end_time"
    t.integer "bonus"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

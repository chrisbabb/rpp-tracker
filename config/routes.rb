Rails.application.routes.draw do
  resources :events
  resources :players
  resources :loots
  resources :raids
  resources :check_in_outs
end

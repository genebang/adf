All Day Fantasy - Daily Fantasy Sports Game

The game is an easy way for anyone to get into fantasy sports. It allows anyone to create a team for one day and post a challenge on their Facebook wall for anyone to join. 

The main draw to the game is the ease of creating a team. The user simply enters a team name, selects 5 players and posts a like to Facebook. The user can then check their game at any time to see how their team stands against their opponent with our periodic scoring updates.

There are a lot more ideas that still need to go in the game to make it more viral.

To do:
Credits system
Rewards/achievements
Multi-sport system
Automatic score refresh with JS
More player stat tracking
Improved views
Twitter sharing
Playing against multiple people with the same team



---------------------------------------------------
Rake tasks to setup the database:

rake db:test_pop to populate all players
rake db:reset_nba_schedule to reset team table for the day
rake db:set_play_today to set games for the day
rake db:update_live_players to get live stats for current games
rake db:set_results to update wins on a game and set points to a team

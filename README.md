# TODO

- [ ] Query movie api's like `tmdb`
- [ ] Favorite selected items by saving them into google spread-sheet
- [ ] Also save them into local json file to export to cloud later
- [ ] Mutate favorites by adding comments / ratings / etc

# ISSUES

- dev mode is extremely flaky
  - code doesn't get updated for whatever reason
  - ipc do not fire/recognize events
- server hrm requires tsc watcher (slow)
- sharing code b/w processes is difficult
- no simple way to typesafe ipc

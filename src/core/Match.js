import { Vibration } from "react-native";
import { NOT_MATCH_VIBRATION } from "../const/variables";
import { BehaviorSubject } from 'rxjs';

export class Match {

  constructor() {
    this.isMatch = new BehaviorSubject({
        tiles: [],
        match: false,
    });
    this.firstTile =  new BehaviorSubject({ content: null, id: null });
    this.secondTile =  new BehaviorSubject({ content: null, id: null });

    this.firstTile.subscribe((data) => this.validate(data));
    this.secondTile.subscribe((data) => this.validate(data));
  }

  subscribe(callback) {
    this.isMatch.subscribe(callback);
  }

  resetMatch() {
    this.isMatch.next({
      tiles: [],
      match: false,
    });
  }

  resetSelection() {
    this.firstTile.next({ content: null, id: null });
    this.secondTile.next({ content: null, id: null });
  }

  addCurrentTile({ content, id }) {
      if (this.firstTile.value.content === null) {
        this.firstTile.next({ content, id });
      } else if (this.secondTile.value.content === null && this.firstTile.value.id !== id) {
        this.secondTile.next({ content, id });
      }
  }

  validate() {
    if (this.firstTile.value.content !== null && this.secondTile.value.content !== null) {
      if (this.firstTile.value.content === this.secondTile.value.content) {
        this.isMatch.next({ tiles: [this.firstTile.value, this.secondTile.value], match: true });
      } else {
        this.isMatch.next({
          tiles: [this.firstTile.value, this.secondTile.value],
          match: false,
        });
      }
      this.resetSelection();
      // WATCH THIS
      this.resetMatch();
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular"
import gql from "graphql-tag"
import { map } from "rxjs/operators"

import { Game, Query } from "../types"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: [
    './games.component.css',
    "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
]
})
export class GamesComponent implements OnInit {
  games: Observable<Game[]>

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.games = this.apollo.watchQuery<Query>({
      query: gql`
        query games {
          games {
            id
            title
            platform
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(res => res.data.games)
      )
  }
}

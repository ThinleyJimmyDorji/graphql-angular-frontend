import {gql} from 'apollo-angular';


export const TOGGLE_FAVORITE_MUTATION = gql`
  mutation toggleFavorite($animeId: Int) {
    ToggleFavourite (animeId: $animeId) {
      characters {
        nodes {
          name {
            full
          }
        }
      }
    }
  }
`

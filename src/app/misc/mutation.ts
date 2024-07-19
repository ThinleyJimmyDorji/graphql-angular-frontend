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

export const TOGGLE_LIKE = gql`
  mutation toggleLike($id: Int, $type: LikeableType) {
    ToggleLike(id: $id, type: $type) {
      id
    }
  }
`

export const LIKE_THREAD_COMMENT = gql`
  mutation likeThreadComment($id: Int, $type: LikeableType) {
    ToggleLike(id: $id, type: $type) {
      id
    }
  }
`

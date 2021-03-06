import { getUserDataAsync } from 'src/core/user'
import { loadGraphDataAsync } from 'src/core/graph'

// Called when the auth flow is finishes, loads user and journal data
export default function loadAppData() {
  return (dispatch, getState) => {
    const { auth } = getState()
    const userId = auth.id

    dispatch(getUserDataAsync(userId))
    dispatch(loadGraphDataAsync())
  }
}

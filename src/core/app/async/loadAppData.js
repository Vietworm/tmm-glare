import { loadJournalAsync } from 'src/core/journal'
import { getUserDataAsync } from 'src/core/user'

// Called when the auth flow is finishes, loads user and journal data
export default function loadAppData() {
  return (dispatch, getState) => {
    const { auth } = getState()

    dispatch(getUserDataAsync(auth.id))
    dispatch(loadJournalAsync())
  }
}
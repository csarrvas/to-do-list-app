import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

type ThemeState = {
  /** The theme the user picked; `null` follows the system preference */
  preference: Theme | null
}

const initialState: ThemeState = { preference: null }

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeChanged: (state, action: PayloadAction<Theme>) => {
      state.preference = action.payload
    },
  },
  selectors: {
    selectThemePreference: (state) => state.preference,
  },
})

export const { themeChanged } = themeSlice.actions
export const { selectThemePreference } = themeSlice.selectors

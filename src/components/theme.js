import { unstable_createMuiStrictModeTheme as createTheme } from '@mui/material/styles'

const defaultTheme = createTheme()

const theme = createTheme({
  typography: {
    ...defaultTheme.typography,
    textPresets: 'capitalize',
  },
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: 'transparent',
      },
    },
  },
})

export default theme

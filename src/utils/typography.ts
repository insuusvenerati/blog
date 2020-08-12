import Typography, { TypographyOptions } from "typography"
import doelgerTheme from "typography-theme-doelger"

doelgerTheme.overrideThemeStyles = () => {
  const linkColor = `#ff483b`
  const textColor = `#D0D0D1`
  return {
    small: { color: textColor },
    em: { color: textColor },
    li: { color: textColor },
    p: { color: textColor },
    footer: { color: textColor },
    "h1,h2,h3,h4,h5,h6": { color: textColor },
    a: {
      color: linkColor,
      textDecoration: "none",
      textShadow: "none",
      backgroundImage:
        "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, " +
        linkColor +
        " 1px, " +
        linkColor +
        " 2px, rgba(0, 0, 0, 0) 2px)",
    },
    "a:hover,a:active": {
      textShadow: "none",
      backgroundImage: "none",
    },
  }
}

const typography = new Typography(doelgerTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

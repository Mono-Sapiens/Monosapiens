import { Date } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

export default (() => {
  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    const locale = cfg.locale ?? "en-US"

    if (text && fileData.dates) {
      const segments: (string | JSX.Element)[] = []

      const { created, modified } = fileData.dates

      if (created) {
        segments.push(
          <span>
            Creado: <Date date={created} locale={locale} />
          </span>
        )
      }

      if (modified) {
        segments.push(
          <span>
            Modificado: <Date date={modified} locale={locale} />
          </span>
        )
      }

      const { minutes } = readingTime(text)
      const displayedTime = i18n(locale).components.contentMeta.readingTime({
        minutes: Math.ceil(minutes),
      })
      segments.push(<span>{displayedTime}</span>)

      return (
        <p class={classNames(displayClass, "content-meta")}>
          {segments.map((segment, idx) => (
            <span key={idx}>
              {segment}
              {idx < segments.length - 1 ? " • " : ""}
            </span>
          ))}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor

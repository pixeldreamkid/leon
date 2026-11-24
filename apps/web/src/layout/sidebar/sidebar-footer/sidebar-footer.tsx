import { Icon } from '@/components/icon'
import type { CSSProperties } from 'react'

import { Tooltip } from '@/components/tooltip'
import { getPublicAssetPath } from '@/config'
import { useAmbientConditions } from '@/data/ambient-conditions'

import './sidebar-footer.sass'

// DataTalk is built on the open-source Leon project; keep this credit visible.
const LEON_PROJECT_URL = 'https://github.com/leon-ai/leon'
const LEON_VERSION = '2.0.0-alpha.1+dev'

export type Mood = 'sad' | 'cocky' | 'tired' | 'angry' | 'happy'

const MOOD_ASSET_PATHS: Record<Mood, string> = {
  sad: getPublicAssetPath('img/moods/sad.svg'),
  cocky: getPublicAssetPath('img/moods/cocky.svg'),
  tired: getPublicAssetPath('img/moods/tired.svg'),
  angry: getPublicAssetPath('img/moods/angry.svg'),
  happy: getPublicAssetPath('img/moods/happy.svg')
}

type MoodIconStyle = CSSProperties & {
  '--sidebar-footer-mood-icon': string
}

interface SidebarFooterProps {
  mood?: Mood
}

export function SidebarFooter({
  mood: previewMood
}: SidebarFooterProps) {
  const ambient = useAmbientConditions()
  const currentMood = ambient.data?.mood
  // Leon's upbeat default uses the existing happy artwork.
  const mood = previewMood ?? (currentMood === 'default' ? 'happy' : currentMood)
  const moodLabel = mood ? `${mood.charAt(0).toUpperCase()}${mood.slice(1)} mood` : 'Mood unavailable'
  const moodIconStyle: MoodIconStyle | undefined = mood ? {
    '--sidebar-footer-mood-icon': `url("${MOOD_ASSET_PATHS[mood]}")`
  } : undefined

  return (
    <footer className="sidebar-footer sidebar-footer-slot">
      <a
        className="sidebar-footer-link"
        href={LEON_PROJECT_URL}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="github-line" className="sidebar-footer-link-icon" />
        <span className="sidebar-footer-link-label">
          Built on Leon
        </span>
      </a>
      <div className="sidebar-footer-status">
        <span className="sidebar-footer-status-label">
          {LEON_VERSION}
        </span>
        <div className="sidebar-footer-mood">
          <Tooltip message={moodLabel} position="right">
            <span
              className="sidebar-footer-mood-trigger"
              role="img"
              aria-label={moodLabel}
              tabIndex={0}
            >
              <span
                className="sidebar-footer-mood-icon"
                style={moodIconStyle}
                aria-hidden="true"
              />
            </span>
          </Tooltip>
        </div>
      </div>
    </footer>
  )
}

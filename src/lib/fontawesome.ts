/**
 * FontAwesome Library Configuration
 * This ensures FontAwesome icons are properly loaded and available throughout the application
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUsers,
  faTag,
  faDatabase,
  faFile,
  faPlay,
  faSort,
  faSortUp,
  faSortDown,
  faBars,
  faPlus,
  faMinus,
  faLanguage,
  faMoon,
  faSun,
  faComments,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

// Add icons to the library for use throughout the application
library.add(
  faUsers,
  faTag,
  faDatabase,
  faFile,
  faPlay,
  faSort,
  faSortUp,
  faSortDown,
  faBars,
  faPlus,
  faMinus,
  faLanguage,
  faMoon,
  faSun,
  faComments,
  faTimes
)
import { withInstall } from '../_utils/with-install'
import _Result, { type ResultProps } from './Result'

import './index.less'

export const Result = withInstall(_Result)
export default Result

export * from './types'
export { resultSharedProps } from './utils'

export type { ResultProps } from './Result'


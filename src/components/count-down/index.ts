import { withInstall } from '../_utils/with-install'
import _CountDown from './CountDown'

import './index.less'

export const CountDown = withInstall(_CountDown)
export default CountDown

export type { CountDownProps } from './CountDown'

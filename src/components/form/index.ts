import type { App } from 'vue'
import { withInstall } from '../_utils/with-install'
import _Form from './Form'
import _Field from './Field'

export const Field = withInstall(_Field)
export const Form = withInstall(_Form, { Field })

const formInstall = Form.install

Form.install = (app: App) => {
  formInstall(app)
  Field.install(app)
}

export default Form

export type { FormProps } from './Form'
export type { FieldProps } from './Field'

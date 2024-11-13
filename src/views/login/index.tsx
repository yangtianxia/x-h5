// Vue
import {
  defineComponent,
  ref,
  reactive,
  computed
} from 'vue'

// Common
import { makeString } from '@txjs/make'
import { validator } from '@txjs/vant-validator'
import { useRedirect } from '@/hooks/redirect'

// Components
import { Form } from '@/components/form'
import { CountDown } from '@/components/count-down'
import {
  Image,
  Checkbox,
  Button,
  showToast
} from 'vant'

// Style
import style from './index.module.less'

/** 支持登录方式 */
type LoginType = 'pwd' | 'sms'

const [name, bem] = BEM('login', style)

const getFormModel = () => ({
  type: makeString<LoginType>('pwd'),
  /** 用户名 */
  username: makeString(),
  /** 密码 */
  password: makeString(),
  /** 手机号码 */
  telephone: makeString(),
  /** 验证码 */
  code: makeString(),
  /** 同意协议 */
  agree: false
})

export default defineComponent({
  name,
  setup() {
    const { to } = useRedirect()
    const formRef = ref()
    const formModel = reactive({
      ...getFormModel(),
      loading: false
    })

    const formRules = validator({
      username: {
        label: '用户名',
        required: true,
        xss: true
      },
      password: {
        label: '密码',
        required: true
      },
      telephone: {
        label: '手机号码',
        required: true,
        telephone: true
      },
      code: {
        label: '验证码',
        required: true,
        digits: true,
        maxlength: 6
      }
    })

    const currentTypeLabel = computed(() => formModel.type === 'pwd' ? '密码' : '验证码')

    const onSwitchLogin = () => {
      formModel.type = formModel.type === 'pwd' ? 'sms' : 'pwd'
    }

    const renderPwd = () => (
      <div
        v-show={formModel.type === 'pwd'}
        class={bem('pwd')}
      >
        <Form.Field
          v-model={formModel.username}
          name="username"
          border={false}
          placeholder="请输入用户名"
        />
        <Form.Field
          v-model={formModel.password}
          type="password"
          name="password"
          border={false}
          placeholder="请输入密码"
        />
      </div>
    )

    const renderSms = () => (
      <div
        v-show={formModel.type === 'sms'}
        class={bem('sms')}
      >
        <Form.Field
          v-model={formModel.telephone}
          type="tel"
          name="telephone"
          border={false}
          placeholder="请输入您的手机号码"
        />
        <Form.Field
          v-model={formModel.code}
          type="digit"
          name="code"
          border={false}
          maxlength={6}
          placeholder="请输入验证码"
          v-slots={{
            button: () => <CountDown />
          }}
        />
      </div>
    )

    return () => (
      <div class={bem()}>
        <div class={bem('upper')}>
          <div class={bem('logo')}>
            <Image
              width={28}
              fit="contain"
              src="logo.png"
            />
          </div>
          <div class={bem('upper-title')}>手机号码快捷登录</div>
          <div class={bem('upper-desc')}>未注册的手机号将自动注册</div>
        </div>
        <div class={bem('form')}>
          <Form
            ref={formRef}
            rules={formRules}
            scrollToError
            showErrorMessage={false}
          >
            {renderPwd()}
            {renderSms()}
            <div class={bem('agree')}>
              <Checkbox v-model={formModel.agree}>我已阅读并同意</Checkbox>
              <div class={bem('agree-link')}>
                <span>《用户服务协议》</span>
              </div>
              <span>和</span>
              <div class={bem('agree-link')}>
                <span>《隐私政策》</span>
              </div>
            </div>
            <div class={bem('submit')}>
              <Button
                block
                type="primary"
                nativeType="submit"
                loading={formModel.loading}
                loadingText="正在登录"
              >登录</Button>
            </div>
            <div class={bem('other')}>
              <div class={bem('other-link')}>
                <span>忘记密码</span>
              </div>
              <div class={bem('other-link')}>
                <span>立即注册</span>
              </div>
              <div
                class={bem('other-link')}
                onClick={onSwitchLogin}
              >
                <span>{currentTypeLabel.value}登录</span>
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
})

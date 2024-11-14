// Vue
import { defineComponent } from 'vue'

// Common
import { useRouter } from 'vue-router'

// Component
import { Result } from '@/components/result'
import { Button } from 'vant'

// Style
import style from './index.module.less'

const [name, bem] = BEM('not-found', style)

export default defineComponent({
  name,
  setup() {
    const router = useRouter()

    return () => (
      <div class={bem()}>
        <Result status="404"/>
        <div class={bem('back')}>
          <Button
            block
            icon="revoke"
            size="small"
            iconPosition="right"
            onClick={() => router.back()}
          >返回上一页</Button>
        </div>
      </div>
    )
  }
})

// Vue
import { defineComponent } from 'vue'

// Common
import { getCSSVar } from '@/shared/utils'

// Components
import { Tabbar, TabbarItem, Icon } from 'vant'

// Style
import style from './index.module.less'

const [name, bem] = BEM('tabbar', style)

const tabbarList = [
  {
    title: '首页',
    to: '/',
    name: 'Index',
    icon: 'wap-home-o',
    selectedIcon: 'wap-home'
  },
  {
    title: '我的',
    to: '/my',
    name: 'My',
    icon: 'user-o',
    selectedIcon: 'user'
  }
] as const

export default defineComponent({
  name,
  setup() {
    return () => (
      <Tabbar
        route
        placeholder
        safe-area-inset-bottom
        class={bem()}
        border={false}
        zIndex={9901}
        inactiveColor={getCSSVar('text-base')}
      >
        {tabbarList.map((item) => (
          <TabbarItem
            name={item.name}
            to={item.to}
            v-slots={{
              icon: ({ active }: { active: boolean }) => (
                <Icon name={active ? item.selectedIcon : item.icon} />
              )
            }}
          >{item.title}</TabbarItem>
        ))}
      </Tabbar>
    )
  }
})

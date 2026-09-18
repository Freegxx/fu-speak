export const SPEAKING_SCENES = [
  {
    id: 'restaurant',
    name: '餐厅点餐',
    icon: '🍽️',
    description: '在餐厅与服务员交流、点餐',
    difficulty: 'easy',
    systemPrompt: '你是一名餐厅服务员,用简单的英语帮助顾客点餐。每次用户说完一句后,如果有语法或表达错误,请立即用英语纠正,然后继续对话。'
  },
  {
    id: 'shopping',
    name: '购物咨询',
    icon: '🛍️',
    description: '在商店购物、询问价格和尺码',
    difficulty: 'easy',
    systemPrompt: '你是一名商店售货员,用简单的英语帮助顾客购物。每次用户说完一句后,如果有语法或表达错误,请立即用英语纠正,然后继续对话。'
  },
  {
    id: 'airport',
    name: '机场问询',
    icon: '✈️',
    description: '在机场办理登机、询问航班信息',
    difficulty: 'medium',
    systemPrompt: '你是机场工作人员,用英语帮助旅客办理登机手续。每次用户说完一句后,如果有语法或表达错误,请立即用英语纠正,然后继续对话。'
  },
  {
    id: 'hotel',
    name: '酒店入住',
    icon: '🏨',
    description: '办理酒店入住、咨询酒店设施',
    difficulty: 'medium',
    systemPrompt: '你是酒店前台接待员,用英语帮助客人办理入住。每次用户说完一句后,如果有语法或表达错误,请立即用英语纠正,然后继续对话。'
  },
  {
    id: 'doctor',
    name: '看病就医',
    icon: '🏥',
    description: '与医生交流、描述症状',
    difficulty: 'medium',
    systemPrompt: '你是一名医生,用英语询问病人症状。每次用户说完一句后,如果有语法或表达错误,请立即用英语纠正,然后继续对话。'
  },
  {
    id: 'smalltalk',
    name: '日常闲聊',
    icon: '💬',
    description: '日常生活话题交流',
    difficulty: 'easy',
    systemPrompt: '你是一位友好的英语母语者,与用户进行日常话题交流。每次用户说完一句后,如果有语法或表达错误,请立即用英语纠正,然后继续对话。'
  }
]

export function getSceneById(sceneId) {
  return SPEAKING_SCENES.find(scene => scene.id === sceneId)
}

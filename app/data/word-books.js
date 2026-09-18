export const WORD_BOOKS = [
  {
    id: 'cet4',
    name: '大学英语四级',
    description: 'CET-4 核心词汇',
    wordCount: 2500,
    icon: '📘'
  },
  {
    id: 'cet6',
    name: '大学英语六级',
    description: 'CET-6 核心词汇',
    wordCount: 2200,
    icon: '📗'
  },
  {
    id: 'english2',
    name: '英语二',
    description: '考研英语二核心词汇',
    wordCount: 2800,
    icon: '📙'
  },
  {
    id: 'personal',
    name: '我的口语生词',
    description: '对话中标记的不熟悉单词',
    wordCount: 0,
    icon: '📕',
    isPersonal: true
  }
]

export const SAMPLE_WORDS = {
  cet4: [
    {
      id: 'cet4_001',
      word: 'abandon',
      phonetic: {
        uk: '/əˈbændən/',
        us: '/əˈbændən/'
      },
      definitions: {
        cn: 'v. 放弃；遗弃；n. 放任',
        en: 'to leave somebody/something behind; to give up'
      },
      examples: [
        { en: 'The crew abandoned the burning ship.', cn: '船员们放弃了燃烧的船只。' },
        { en: 'We had to abandon the car.', cn: '我们不得不弃车。' }
      ]
    },
    {
      id: 'cet4_002',
      word: 'ability',
      phonetic: {
        uk: '/əˈbɪləti/',
        us: '/əˈbɪləti/'
      },
      definitions: {
        cn: 'n. 能力；才能',
        en: 'the fact that somebody/something is able to do something'
      },
      examples: [
        { en: 'A woman of great ability.', cn: '一位能力超强的女性。' },
        { en: 'He has the ability to bring out the best in others.', cn: '他能够激发别人的最佳潜能。' }
      ]
    },
    {
      id: 'cet4_003',
      word: 'abroad',
      phonetic: {
        uk: '/əˈbrɔːd/',
        us: '/əˈbrɔːd/'
      },
      definitions: {
        cn: 'adv. 在国外；到国外',
        en: 'in or to a foreign country'
      },
      examples: [
        { en: 'She often goes abroad for business.', cn: '她经常出国出差。' },
        { en: 'He is studying abroad.', cn: '他正在国外留学。' }
      ]
    },
    {
      id: 'cet4_004',
      word: 'absolute',
      phonetic: {
        uk: '/ˈæbsəluːt/',
        us: '/ˈæbsəluːt/'
      },
      definitions: {
        cn: 'adj. 绝对的；完全的',
        en: 'total and complete'
      },
      examples: [
        { en: 'Absolute silence.', cn: '绝对的安静。' },
        { en: 'She has absolute faith in him.', cn: '她对他完全信任。' }
      ]
    },
    {
      id: 'cet4_005',
      word: 'absorb',
      phonetic: {
        uk: '/əbˈzɔːb/',
        us: '/əbˈsɔːrb/'
      },
      definitions: {
        cn: 'v. 吸收；吸引；理解',
        en: 'to take in liquid, gas or other substance'
      },
      examples: [
        { en: 'Plants absorb carbon dioxide.', cn: '植物吸收二氧化碳。' },
        { en: 'His work absorbed him completely.', cn: '他的工作让他全神贯注。' }
      ]
    }
  ],
  cet6: [
    {
      id: 'cet6_001',
      word: 'abbreviate',
      phonetic: {
        uk: '/əˈbriːvieɪt/',
        us: '/əˈbriːvieɪt/'
      },
      definitions: {
        cn: 'v. 缩写；缩短',
        en: 'to make a word, phrase, or text shorter'
      },
      examples: [
        { en: 'The word "information" is often abbreviated to "info".', cn: '"information"这个词常被缩写为"info"。' }
      ]
    },
    {
      id: 'cet6_002',
      word: 'abide',
      phonetic: {
        uk: '/əˈbaɪd/',
        us: '/əˈbaɪd/'
      },
      definitions: {
        cn: 'v. 遵守；忍受',
        en: 'to accept and act according to a law, agreement, etc.'
      },
      examples: [
        { en: 'You must abide by the rules.', cn: '你必须遵守规则。' }
      ]
    },
    {
      id: 'cet6_003',
      word: 'abnormal',
      phonetic: {
        uk: '/æbˈnɔːml/',
        us: '/æbˈnɔːrml/'
      },
      definitions: {
        cn: 'adj. 反常的；异常的',
        en: 'different from what is usual or expected'
      },
      examples: [
        { en: 'Abnormal behavior.', cn: '反常的行为。' }
      ]
    }
  ],
  english2: [
    {
      id: 'eng2_001',
      word: 'accelerate',
      phonetic: {
        uk: '/əkˈseləreɪt/',
        us: '/əkˈseləreɪt/'
      },
      definitions: {
        cn: 'v. 加速；促进',
        en: 'to happen or make something happen faster or earlier'
      },
      examples: [
        { en: 'The car accelerated away.', cn: '汽车加速离开了。' }
      ]
    },
    {
      id: 'eng2_002',
      word: 'accommodate',
      phonetic: {
        uk: '/əˈkɒmədeɪt/',
        us: '/əˈkɑːmədeɪt/'
      },
      definitions: {
        cn: 'v. 容纳；为…提供住宿',
        en: 'to provide somebody with a place to live, work or sit'
      },
      examples: [
        { en: 'The hotel can accommodate up to 500 guests.', cn: '这家旅馆可容纳500位客人。' }
      ]
    }
  ]
}

export function getWordsByBookId(bookId) {
  return SAMPLE_WORDS[bookId] || []
}

export function getBookById(bookId) {
  return WORD_BOOKS.find(book => book.id === bookId)
}

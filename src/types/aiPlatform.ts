export interface AIPlatform {
  id: string;
  name: string;
  url: string;
  icon?: string;
}

export const DEFAULT_AI_PLATFORMS: AIPlatform[] = [
  {
    id: 'deepseek',
    name: 'DeepSeek Chat',
    url: 'https://chat.deepseek.com/',
    icon: '💬'
  },
  {
    id: 'qwen',
    name: 'Qwen Chat',
    url: 'https://chat.qwen.ai/',
    icon: '💬'
  },
  {
    id: 'doubao',
    name: '豆包',
    url: 'https://www.doubao.com/chat/',
    icon: '💬'
  }
];

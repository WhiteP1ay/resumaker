/**
 * 编辑器类型常量
 */
import { Calendar, List, Type } from 'lucide-react';

// 编辑器类型选项
export const EDITOR_TYPE_OPTIONS = [
  {
    value: 'timeline',
    label: '时间线编辑器',
    description: '适合工作经历、教育背景等时序信息',
    icon: Calendar,
  },
  {
    value: 'list',
    label: '列表编辑器',
    description: '适合技能清单、证书列表等',
    icon: List,
  },
  {
    value: 'text',
    label: '文本编辑器',
    description: '适合自我介绍、备注等自由文本',
    icon: Type,
  },
];

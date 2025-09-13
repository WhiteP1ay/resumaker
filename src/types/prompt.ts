export interface ResumePrompt {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_RESUME_PROMPTS: ResumePrompt[] = [
  {
    id: 'general-optimization',
    title: '简历整体优化',
    content: '请帮我优化这份简历，使其更加专业和吸引人。重点关注：1. 工作经历的描述是否突出成果和量化数据；2. 技能部分是否与目标职位匹配；3. 整体结构和格式是否清晰易读。',

    tags: ['通用', '优化', '专业'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'work-experience-enhancement',
    title: '工作经历强化',
    content: '请帮我优化工作经历部分，重点：1. 使用STAR方法（情况、任务、行动、结果）重新组织描述；2. 添加具体的量化指标和成果；3. 突出与目标职位相关的技能和经验；4. 使用更有力的动词开头。',

    tags: ['工作经历', 'STAR方法', '量化'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'skills-matching',
    title: '技能匹配优化',
    content: '基于目标职位要求，请帮我优化技能部分：1. 调整技能的排序，将最相关的放在前面；2. 补充可能遗漏的重要技能；3. 为每个技能添加熟练程度说明；4. 删除不相关或过时的技能。',

    tags: ['技能', '匹配', '排序'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'project-showcase',
    title: '项目经历展示',
    content: '请帮我优化项目经历部分：1. 突出项目的技术难点和创新点；2. 量化项目成果和影响；3. 说明个人在项目中的具体贡献和角色；4. 选择最能体现能力的核心项目进行详细描述。',

    tags: ['项目', '技术', '成果'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'ats-optimization',
    title: 'ATS系统优化',
    content: '请帮我优化简历以通过ATS（应聘者跟踪系统）筛选：1. 确保关键词与职位描述匹配；2. 使用标准的简历格式和节标题；3. 避免使用图片、表格等复杂格式；4. 检查拼写和语法错误。',

    tags: ['ATS', '关键词', '格式'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'career-change',
    title: '转行简历优化',
    content: '针对转行求职，请帮我优化简历：1. 突出可转移的技能和经验；2. 重新包装工作经历，强调与目标行业相关的部分；3. 补充相关的学习经历和项目；4. 在个人总结中明确转行动机和优势。',

    tags: ['转行', '可转移技能', '重新包装'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];



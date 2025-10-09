import type {
  BasicInfo,
  ListItem,
  Resume,
  ResumeSection,
  TextContent,
  TimelineItem,
} from '@/types/resume';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const initialResume: Resume = {
  id: '1',
  title: '我的简历',
  template: 'default',
  layout: 'top-bottom', // 布局没用，以后可能改成theme，即多主题
  pageSettings: {
    enableMultiPage: true,
    totalPages: 2,
  },
  sections: [
    {
      id: 'basic-info',
      title: '基本信息',
      iconName: 'user',
      type: 'basic',
      visible: true,
      order: 1,
      data: {
        avatar: 'https://phzdoc.oss-cn-beijing.aliyuncs.com/uPic/avatar.JPG',
        name: '白玩',
        email: 'example@gmail.com',
        phone: '12345678901',
        gender: '男',
        age: '24',
        location: '北京',
        website: '',
        customFields: [
          {
            id: '1',
            label: '7年工作经验',
            value: '',
            iconName: 'briefcase',
          },
          {
            id: '2',
            label: '期望城市',
            value: '北京',
            iconName: 'map-pin',
          },
          {
            id: '3',
            label: '个人网站',
            value: 'https://whitemeta.cn',
            iconName: 'globe',
          },
          {
            id: '4',
            label: 'b站',
            value: 'https://space.bilibili.com/107889531',
            iconName: 'tv',
          },
        ],
      },
    },
    {
      id: 'advantages',
      title: '个人优势',
      iconName: 'star',
      type: 'list',
      editorType: 'text',
      visible: true,
      order: 2,
      data: {
        content:
          '<p>熟练使用 <strong>HTML5 + CSS3</strong> 技术，具备扎实的前端基础</p><p>熟练掌握 <strong>JavaScript (ES6+)</strong> 和 <strong>Vue</strong> 技术栈，并深入了解其原理</p><p>丰富的大型网站开发经验，对<span style="color: #3b82f6;">前端工程化</span>、<span style="color: #3b82f6;">性能优化</span>有丰富的实战经验</p><p>熟练掌握 <strong>TypeScript</strong>、<strong>SCSS</strong></p><p>擅长 <strong>Webpack</strong> 配置与前端架构设计</p><p>熟悉 <strong>Node.js</strong>，包括 Express/Koa 等服务端框架</p>',
      },
    },
    {
      id: 'projects',
      title: '项目经历',
      iconName: 'settings',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 3,
      data: [
        {
          description:
            '<p>一个基于 <strong>React 19</strong> 构建的现代化在线简历编辑器，提供<span style="color: #3b82f6;">所见即所得</span>的编辑体验</p><ul><li>为了更轻量、更容易定制，组件库选择了 <strong>Shadcn/UI</strong></li><li>构建工具选择了 <strong>Vite</strong> 并优化了首屏加载性能，总资源小于 1MB</li><li>基于 <strong>Docker + GithubAction</strong> 实现全自动 CI/CD</li><li>这份项目是开源的，地址 <a href="https://github.com/WhiteP1ay/resumaker" target="_blank">https://github.com/WhiteP1ay/resumaker</a></li><li><em>这份简历就是通过这个编辑工具制作出来的</em></li></ul>',
          endDate: '',
          id: '1756977218779',
          secondarySubtitle: 'resume.whitemeta.cn',
          startDate: '',
          subtitle: '全栈',
          title: '简历编辑器',
        },
        {
          id: '1757064171447',
          title: '个人网站',
          subtitle: '全栈',
          secondarySubtitle: 'whitemeta.cn',
          startDate: '',
          endDate: '',
          description:
            '<p>一个基于 <strong>Next 15</strong> 构建的博客网站</p><ul><li>良好的 SEO，Google 搜索 <span style="color: #ef4444;">"whitemeta"</span>，本站排名第一</li><li>基于 <strong>TailwindCSS</strong> 实现 PC &amp; H5 双端适配</li><li>基于 <strong>Google Analytics</strong> 实现全站流量统计</li><li>当然博客网站最重要的还是内容，希望您能通过博文来更全面了解我 😊</li></ul>',
        },
      ],
    },
    {
      id: 'education',
      title: '教育背景',
      iconName: 'graduation-cap',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 4,
      data: [
        {
          id: '1',
          title: '清华大学',
          subtitle: '计算机科学与技术硕士',
          secondarySubtitle: '2016.09 - 2018.06',
          startDate: '2016.09',
          endDate: '2018.06',
          description: '',
        },
        {
          id: '2',
          title: '北京理工大学',
          subtitle: '软件工程学士',
          secondarySubtitle: '2012.09 - 2016.06',
          startDate: '2012.09',
          endDate: '2016.06',
          description: '',
        },
      ],
    },
    {
      id: 'experience',
      title: '工作经历',
      iconName: 'briefcase',
      type: 'timeline',
      editorType: 'timeline',
      visible: true,
      order: 5,
      data: [
        {
          id: '1',
          title: '阿里巴巴集团',
          subtitle: '高级前端工程师',
          secondarySubtitle: '2021.03 - 2024.06',
          startDate: '2021.03',
          endDate: '2024.06',
          description:
            '<p>负责<strong>淘宝商家平台</strong>前端开发与架构设计工作</p><p><strong style="color: #3b82f6;">【主要职责】</strong></p><ul><li>负责商家后台核心业务模块的前端开发，包括<strong>商品管理</strong>、<strong>订单处理</strong>、<strong>数据分析</strong>等</li><li>参与前端架构设计，建立组件库和开发规范，提升团队开发效率</li><li>优化页面性能，首屏加载时间从 <span style="color: #ef4444;">3.2s</span> 优化至 <span style="color: #10b981;">1.1s</span>，用户体验显著提升</li><li>负责移动端 H5 页面开发，实现 PC 端和移动端的响应式适配</li></ul><p><strong style="color: #3b82f6;">【核心业绩】</strong></p><ul><li>主导开发的商品管理系统日均处理订单量超过 <strong>50 万单</strong></li><li>建立的前端组件库被团队 10+ 项目复用，开发效率提升 <span style="color: #10b981;">40%</span></li><li>优化的数据可视化方案，页面渲染性能提升 <span style="color: #10b981;">60%</span></li><li>获得<span style="color: #f59e0b;">年度优秀员工奖</span>、<span style="color: #f59e0b;">技术创新奖</span>等荣誉</li></ul>',
        },
        {
          id: '2',
          title: '字节跳动',
          subtitle: '前端工程师',
          secondarySubtitle: '2019.07 - 2021.02',
          startDate: '2019.07',
          endDate: '2021.02',
          description:
            '<p>参与<strong>抖音创作者平台</strong>和<strong>企业服务</strong>相关产品的前端开发</p><p><strong style="color: #3b82f6;">【主要职责】</strong></p><ul><li>负责抖音创作者中心数据看板的前端开发和维护</li><li>参与企业级 <strong>SaaS</strong> 产品的前端架构设计和开发</li><li>配合产品和设计团队，实现高质量的用户界面和交互体验</li><li>参与前端工程化建设，搭建自动化测试和部署流程</li></ul><p><strong style="color: #3b82f6;">【核心业绩】</strong></p><ul><li>开发的创作者数据大屏支持<strong>千万级 DAU</strong> 的实时数据展示</li><li>参与的企业服务平台服务客户数超过 <strong>10 万家</strong></li><li>建立的前端监控体系，线上 bug 数量减少 <span style="color: #10b981;">70%</span></li><li>主导的代码重构项目，代码质量和可维护性显著提升</li></ul>',
        },
      ],
      pageNumber: 2,
    },
  ],
};

export const resumeAtom = atomWithStorage<Resume>('resume-data', initialResume);

export const resetResumeAtom = atom(null, (_get, set) => {
  set(resumeAtom, initialResume);
});

/**
 * 更新指定模块的数据
 */
export const updateSectionDataAtom = atom(
  null,
  (
    get,
    set,
    update: {
      sectionId: string;
      data: BasicInfo | TimelineItem[] | ListItem[] | TextContent;
      iconName?: string;
    }
  ) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      if (section.id === update.sectionId) {
        return {
          ...section,
          data: update.data,
          ...(update.iconName !== undefined && {
            iconName: update.iconName,
            icon: update.iconName,
          }),
        };
      }
      return section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

/**
 * 更新指定模块的属性（标题、图标、可见性等）
 */
export const updateSectionPropsAtom = atom(
  null,
  (get, set, update: { sectionId: string; props: Partial<Omit<ResumeSection, 'id' | 'data'>> }) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      if (section.id === update.sectionId) {
        return { ...section, ...update.props };
      }
      return section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

/**
 * 更新模块顺序
 */
export const updateSectionsOrderAtom = atom(null, (get, set, sections: ResumeSection[]) => {
  const resume = get(resumeAtom);
  // 获取基本信息模块
  const basicSection = resume.sections.find((section) => section.type === 'basic');

  // 合并基本信息模块和其他模块，确保基本信息模块不丢失
  const allSections = basicSection ? [basicSection, ...sections] : sections;

  set(resumeAtom, { ...resume, sections: allSections });
});

/**
 * 添加新模块
 */
export const addSectionAtom = atom(null, (get, set, section: ResumeSection) => {
  const resume = get(resumeAtom);
  set(resumeAtom, { ...resume, sections: [...resume.sections, section] });
});

/**
 * 删除模块
 */
export const deleteSectionAtom = atom(null, (get, set, sectionId: string) => {
  const resume = get(resumeAtom);
  const updatedSections = resume.sections.filter((section) => section.id !== sectionId);
  set(resumeAtom, { ...resume, sections: updatedSections });
});

/**
 * 获取指定模块
 */
export const getSectionAtom = atom((get) => {
  return (sectionId: string) => {
    const resume = get(resumeAtom);
    return resume.sections.find((section) => section.id === sectionId);
  };
});

/**
 * 获取所有非基本信息模块
 */
export const getNonBasicSectionsAtom = atom((get) => {
  const resume = get(resumeAtom);
  return resume.sections
    .filter((section) => section.type !== 'basic')
    .sort((a, b) => a.order - b.order);
});

/**
 * 获取基本信息模块
 */
export const getBasicSectionAtom = atom((get) => {
  const resume = get(resumeAtom);
  return resume.sections.find((section) => section.type === 'basic');
});

/**
 * 更新页面设置
 */
export const updatePageSettingsAtom = atom(
  null,
  (get, set, pageSettings: { enableMultiPage: boolean; totalPages: number }) => {
    const resume = get(resumeAtom);
    set(resumeAtom, { ...resume, pageSettings });
  }
);

/**
 * 批量更新多个模块的页面分配
 */
export const updateMultipleSectionsPageAtom = atom(
  null,
  (get, set, updates: Array<{ sectionId: string; pageNumber: number }>) => {
    const resume = get(resumeAtom);
    const updatedSections = resume.sections.map((section) => {
      const update = updates.find((u) => u.sectionId === section.id);
      if (update) {
        return { ...section, pageNumber: update.pageNumber };
      }
      return section;
    });
    set(resumeAtom, { ...resume, sections: updatedSections });
  }
);

/**
 * 获取指定页面的模块列表
 */
export const getSectionsByPageAtom = atom((get) => {
  return (pageNumber: number) => {
    const resume = get(resumeAtom);
    return resume.sections
      .filter((section) => section.type !== 'basic')
      .filter((section) => (section.pageNumber || 1) === pageNumber)
      .filter((section) => section.visible)
      .sort((a, b) => a.order - b.order);
  };
});

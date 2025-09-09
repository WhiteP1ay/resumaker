import type { Resume, ResumeCollection, ResumeMetadata } from '@/types/resume';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 初始简历数据
export const initialResume: Resume = {
  id: '1',
  title: '我的简历',
  template: 'default',
  layout: 'top-bottom',
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
          {
            id: '5',
            label: '清华大学',
            value: '',
            iconName: 'graduation-cap',
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
          '1. 熟练使用 html5 + css3 技术\n2. 熟练掌握 javascript (es6+) 和 Vue  技术栈,并深入了解其原理。\n3. 丰富的大型网站开发经验，对前端工程化，性能优化有丰富的实战经验。\n4. 熟练掌握 Typescript，SCSS 。\n5. 擅长 webpack  配置与前端架构设计。\n6. 熟悉 node.js ，包括 express/koa  等服务端框架',
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
            '一个基于 React 19 构建的现代化在线简历编辑器，提供所见即所得的编辑体验。\n- 为了更轻量、更容易定制，组件库选择了Shadcn/UI \n- 构建工具选择了 Vite 并优化了首屏加载性能，总资源小于1MB\n- 基于 Docker + GithubAction 实现全自动 CI/CD\n- 这份项目是开源的，地址 https://github.com/WhiteP1ay/resumaker\n- 这份简历就是通过这个编辑工具制作出来的',
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
            '一个基于 Next 15 构建的博客网站\n- 良好的SEO，Google搜索"whitemeta"，本站排名第一\n- 基于TailwindCSS 实现 PC & H5 双端适配\n- 基于Google Analytics 实现全站流量统计\n- 当然博客网站最重要的还是内容，希望您能通过博文来更全面了解我',
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
      order: 4,
      data: [
        {
          id: '1',
          title: '阿里巴巴',
          subtitle: '2000.01 - 2000.06',
          secondarySubtitle: '',
          startDate: '',
          endDate: '',
          description: '',
        },
        {
          id: '2',
          title: '字节跳动',
          subtitle: '2000.01 - 2000.06',
          secondarySubtitle: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    },
  ],
};

// 初始简历集合
const initialCollection: ResumeCollection = {
  currentResumeId: '1',
  resumes: {
    '1': initialResume,
  },
  metadata: {
    '1': {
      id: '1',
      title: '我的简历',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: '默认简历',
    },
  },
};

// 简历集合存储
export const resumeCollectionAtom = atomWithStorage<ResumeCollection>(
  'resume-collection',
  initialCollection
);

// 当前简历原子
export const currentResumeAtom = atom(
  (get) => {
    const collection = get(resumeCollectionAtom);
    return collection.resumes[collection.currentResumeId] || Object.values(collection.resumes)[0];
  },
  (get, set, resume: Resume) => {
    const collection = get(resumeCollectionAtom);
    set(resumeCollectionAtom, {
      ...collection,
      resumes: {
        ...collection.resumes,
        [resume.id]: resume,
      },
      metadata: {
        ...collection.metadata,
        [resume.id]: {
          ...collection.metadata[resume.id],
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }
);

// 切换当前简历
export const switchResumeAtom = atom(null, (get, set, resumeId: string) => {
  const collection = get(resumeCollectionAtom);
  if (collection.resumes[resumeId]) {
    set(resumeCollectionAtom, {
      ...collection,
      currentResumeId: resumeId,
    });
  }
});

// 创建新简历
export const createResumeAtom = atom(null, (get, set, title: string, description?: string) => {
  const collection = get(resumeCollectionAtom);
  const newId = Date.now().toString();
  const now = new Date().toISOString();

  const newResume: Resume = {
    ...initialResume,
    id: newId,
    title,
  };

  const newMetadata: ResumeMetadata = {
    id: newId,
    title,
    createdAt: now,
    updatedAt: now,
    description,
  };

  set(resumeCollectionAtom, {
    ...collection,
    currentResumeId: newId,
    resumes: {
      ...collection.resumes,
      [newId]: newResume,
    },
    metadata: {
      ...collection.metadata,
      [newId]: newMetadata,
    },
  });

  return newId;
});

// 删除简历
export const deleteResumeAtom = atom(null, (get, set, resumeId: string) => {
  const collection = get(resumeCollectionAtom);

  // 不能删除唯一的简历
  if (Object.keys(collection.resumes).length <= 1) {
    return false;
  }

  const { [resumeId]: deletedResume, ...remainingResumes } = collection.resumes;
  const { [resumeId]: deletedMetadata, ...remainingMetadata } = collection.metadata;

  // 如果删除的是当前简历，切换到第一个可用的简历
  let newCurrentId = collection.currentResumeId;
  if (collection.currentResumeId === resumeId) {
    newCurrentId = Object.keys(remainingResumes)[0];
  }

  set(resumeCollectionAtom, {
    currentResumeId: newCurrentId,
    resumes: remainingResumes,
    metadata: remainingMetadata,
  });

  return true;
});

// 重命名简历
export const renameResumeAtom = atom(
  null,
  (get, set, resumeId: string, newTitle: string, newDescription?: string) => {
    const collection = get(resumeCollectionAtom);

    if (!collection.resumes[resumeId]) return false;

    set(resumeCollectionAtom, {
      ...collection,
      resumes: {
        ...collection.resumes,
        [resumeId]: {
          ...collection.resumes[resumeId],
          title: newTitle,
        },
      },
      metadata: {
        ...collection.metadata,
        [resumeId]: {
          ...collection.metadata[resumeId],
          title: newTitle,
          description: newDescription,
          updatedAt: new Date().toISOString(),
        },
      },
    });

    return true;
  }
);

// 复制简历
export const duplicateResumeAtom = atom(null, (get, set, resumeId: string, newTitle?: string) => {
  const collection = get(resumeCollectionAtom);
  const sourceResume = collection.resumes[resumeId];

  if (!sourceResume) return null;

  const newId = Date.now().toString();
  const now = new Date().toISOString();
  const title = newTitle || `${sourceResume.title} - 副本`;

  const newResume: Resume = {
    ...sourceResume,
    id: newId,
    title,
  };

  const newMetadata: ResumeMetadata = {
    id: newId,
    title,
    createdAt: now,
    updatedAt: now,
    description: `${collection.metadata[resumeId]?.description || ''} (副本)`,
  };

  set(resumeCollectionAtom, {
    ...collection,
    currentResumeId: newId,
    resumes: {
      ...collection.resumes,
      [newId]: newResume,
    },
    metadata: {
      ...collection.metadata,
      [newId]: newMetadata,
    },
  });

  return newId;
});

// 导入单个简历
export const importResumeAtom = atom(
  null,
  (get, set, resume: Resume, metadata?: Partial<ResumeMetadata>) => {
    const collection = get(resumeCollectionAtom);
    const now = new Date().toISOString();

    // 确保ID唯一
    let newId = resume.id;
    if (collection.resumes[newId]) {
      newId = Date.now().toString();
    }

    const importedResume: Resume = {
      ...resume,
      id: newId,
    };

    const importedMetadata: ResumeMetadata = {
      id: newId,
      title: resume.title,
      createdAt: now,
      updatedAt: now,
      description: '导入的简历',
      ...metadata,
    };

    set(resumeCollectionAtom, {
      ...collection,
      currentResumeId: newId,
      resumes: {
        ...collection.resumes,
        [newId]: importedResume,
      },
      metadata: {
        ...collection.metadata,
        [newId]: importedMetadata,
      },
    });

    return newId;
  }
);

// 批量导入简历
export const importBatchResumesAtom = atom(
  null,
  (get, set, resumes: Resume[]) => {
    const collection = get(resumeCollectionAtom);
    const now = new Date().toISOString();
    const importedIds: string[] = [];

    // 准备新的简历和元数据
    const newResumes: Record<string, Resume> = { ...collection.resumes };
    const newMetadata: Record<string, ResumeMetadata> = { ...collection.metadata };

    for (const resume of resumes) {
      // 确保ID唯一
      let newId = resume.id;
      let counter = 1;
      while (newResumes[newId]) {
        newId = `${resume.id}_${counter}`;
        counter++;
      }

      const importedResume: Resume = {
        ...resume,
        id: newId,
      };

      const importedMetadata: ResumeMetadata = {
        id: newId,
        title: resume.title,
        createdAt: now,
        updatedAt: now,
        description: '导入的简历',
      };

      newResumes[newId] = importedResume;
      newMetadata[newId] = importedMetadata;
      importedIds.push(newId);
    }

    // 如果导入了简历，将当前简历切换到第一个导入的简历
    const newCurrentId = importedIds.length > 0 ? importedIds[0] : collection.currentResumeId;

    set(resumeCollectionAtom, {
      ...collection,
      currentResumeId: newCurrentId,
      resumes: newResumes,
      metadata: newMetadata,
    });

    return importedIds;
  }
);

// 获取所有简历列表
export const resumeListAtom = atom((get) => {
  const collection = get(resumeCollectionAtom);
  return Object.values(collection.metadata).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
});

// 批量删除简历
export const batchDeleteResumesAtom = atom(
  null,
  (get, set, resumeIds: string[]) => {
    const collection = get(resumeCollectionAtom);
    
    // 不能删除所有简历，至少要保留一个
    if (resumeIds.length >= Object.keys(collection.resumes).length) {
      return false;
    }

    // 过滤出要删除的简历
    const resumesToDelete = resumeIds.filter(id => collection.resumes[id]);
    if (resumesToDelete.length === 0) {
      return false;
    }

    // 创建新的简历和元数据对象，排除要删除的简历
    const newResumes: Record<string, Resume> = { ...collection.resumes };
    const newMetadata: Record<string, ResumeMetadata> = { ...collection.metadata };
    
    resumesToDelete.forEach(id => {
      delete newResumes[id];
      delete newMetadata[id];
    });

    // 如果当前简历被删除了，切换到第一个可用的简历
    let newCurrentId = collection.currentResumeId;
    if (resumesToDelete.includes(collection.currentResumeId)) {
      newCurrentId = Object.keys(newResumes)[0];
    }

    set(resumeCollectionAtom, {
      currentResumeId: newCurrentId,
      resumes: newResumes,
      metadata: newMetadata,
    });

    return true;
  }
);

// 获取当前简历ID
export const currentResumeIdAtom = atom((get) => {
  const collection = get(resumeCollectionAtom);
  return collection.currentResumeId;
});

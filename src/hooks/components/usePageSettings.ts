import { useResumeActions } from '@/hooks/useResumeActions';
import { resumeAtom } from '@/store/resumeStore';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

export const usePageSettings = () => {
  const resume = useAtomValue(resumeAtom);
  const { getNonBasicSections, toggleMultiPageMode, batchSetSectionsPage } = useResumeActions();
  const [localPageAssignments, setLocalPageAssignments] = useState<Record<string, number>>({});

  const isMultiPageEnabled = resume.pageSettings?.enableMultiPage || false;
  const sections = getNonBasicSections;

  // 初始化本地页面分配状态
  const initializeLocalAssignments = useCallback(() => {
    const assignments: Record<string, number> = {};
    sections.forEach((section) => {
      assignments[section.id] = section.pageNumber || 1;
    });
    setLocalPageAssignments(assignments);
  }, [sections]);

  // 自动初始化数据
  useEffect(() => {
    initializeLocalAssignments();
  }, [initializeLocalAssignments]);

  // 启用多页模式
  const handleEnableMultiPage = useCallback(() => {
    toggleMultiPageMode(true, 2);
    initializeLocalAssignments();
  }, [toggleMultiPageMode, initializeLocalAssignments]);

  // 禁用多页模式
  const handleDisableMultiPage = useCallback(() => {
    toggleMultiPageMode(false, 1);
    const resetUpdates = sections.map((section) => ({
      sectionId: section.id,
      pageNumber: 1,
    }));
    batchSetSectionsPage(resetUpdates);
  }, [toggleMultiPageMode, sections, batchSetSectionsPage]);

  // 更新模块页面分配
  const handleSectionPageChange = useCallback(
    (sectionId: string, pageNumber: number) => {
      setLocalPageAssignments((prev) => ({
        ...prev,
        [sectionId]: pageNumber,
      }));
      // 立即同步到全局状态，保证预览区域实时响应页码修改。
      batchSetSectionsPage([{ sectionId, pageNumber }]);
    },
    [batchSetSectionsPage]
  );

  // 应用页面分配更改
  const applyPageAssignments = useCallback(() => {
    const updates = Object.entries(localPageAssignments).map(([sectionId, pageNumber]) => ({
      sectionId,
      pageNumber,
    }));
    batchSetSectionsPage(updates);
  }, [localPageAssignments, batchSetSectionsPage]);

  // 自动分配（奇数模块在第一页，偶数模块在第二页）
  const handleAutoAssign = useCallback(() => {
    const assignments: Record<string, number> = {};
    const updates: Array<{ sectionId: string; pageNumber: number }> = [];
    sections.forEach((section, index) => {
      const pageNumber = (index % 2) + 1;
      assignments[section.id] = pageNumber;
      updates.push({ sectionId: section.id, pageNumber });
    });
    setLocalPageAssignments(assignments);
    batchSetSectionsPage(updates);
  }, [sections, batchSetSectionsPage]);

  // 重置分配（所有模块到第一页）
  const handleResetAssignments = useCallback(() => {
    const assignments: Record<string, number> = {};
    const updates: Array<{ sectionId: string; pageNumber: number }> = [];
    sections.forEach((section) => {
      assignments[section.id] = 1;
      updates.push({ sectionId: section.id, pageNumber: 1 });
    });
    setLocalPageAssignments(assignments);
    batchSetSectionsPage(updates);
  }, [sections, batchSetSectionsPage]);

  // 获取每页的模块数量
  const getPageSectionCount = useCallback(
    (pageNumber: number) => {
      return Object.values(localPageAssignments).filter((page) => page === pageNumber).length;
    },
    [localPageAssignments]
  );

  return {
    // 状态
    isMultiPageEnabled,
    sections,
    localPageAssignments,

    // 操作函数
    handleEnableMultiPage,
    handleDisableMultiPage,
    handleSectionPageChange,
    handleAutoAssign,
    handleResetAssignments,
    getPageSectionCount,

    // 生命周期
    applyPageAssignments,
  };
};

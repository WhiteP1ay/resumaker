import {
  exportMultipleResumes,
  exportResumeToFile,
  importMultipleResumes,
  importResumeFromFile
} from '@/lib/fileUtils';
import {
  batchDeleteResumesAtom,
  createResumeAtom,
  currentResumeAtom,
  currentResumeIdAtom,
  deleteResumeAtom,
  duplicateResumeAtom,
  importBatchResumesAtom,
  importResumeAtom,
  renameResumeAtom,
  resumeCollectionAtom,
  resumeListAtom,
  switchResumeAtom,
} from '@/store/resumeCollectionStore';
import type { Resume, ResumeMetadata } from '@/types/resume';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

/**
 * 简历管理Hook
 */
export const useResumeManager = () => {
  // 原子值
  const currentResume = useAtomValue(currentResumeAtom);
  const currentResumeId = useAtomValue(currentResumeIdAtom);
  const resumeList = useAtomValue(resumeListAtom);
  const collection = useAtomValue(resumeCollectionAtom);

  // 设置函数
  const setCurrentResume = useSetAtom(currentResumeAtom);
  const switchResume = useSetAtom(switchResumeAtom);
  const createResume = useSetAtom(createResumeAtom);
  const deleteResume = useSetAtom(deleteResumeAtom);
  const renameResume = useSetAtom(renameResumeAtom);
  const duplicateResume = useSetAtom(duplicateResumeAtom);
  const importResume = useSetAtom(importResumeAtom);
  const importBatchResumes = useSetAtom(importBatchResumesAtom);
  const batchDeleteResumes = useSetAtom(batchDeleteResumesAtom);

  /**
   * 导出当前简历
   */
  const exportCurrentResume = useCallback(() => {
    return exportResumeToFile(currentResume);
  }, [currentResume]);

  /**
   * 导出指定简历
   */
  const exportResume = useCallback((resumeId: string) => {
    const resume = collection.resumes[resumeId];
    if (resume) {
      return exportResumeToFile(resume);
    }
    return false;
  }, [collection.resumes]);

  /**
   * 导出所有简历
   */
  const exportAllResumes = useCallback(() => {
    const allResumes = Object.values(collection.resumes);
    return exportMultipleResumes(allResumes, '所有简历');
  }, [collection.resumes]);

  /**
   * 导入单个简历
   */
  const importSingleResume = useCallback(async (showMessage?: (message: string, variant?: 'default' | 'info' | 'success' | 'warning' | 'error') => void) => {
    const resume = await importResumeFromFile(showMessage);
    if (resume) {
      // 返回 newId
      return importResume(resume);
    }
    return null;
  }, [importResume]);

  /**
   * 批量导入简历
   */
  const handleImportBatchResumes = useCallback(async (showMessage?: (message: string, variant?: 'default' | 'info' | 'success' | 'warning' | 'error') => void) => {
    const resumes = await importMultipleResumes(showMessage);
    if (resumes && resumes.length > 0) {

      return importBatchResumes(resumes);
    }
    return [];
  }, [importBatchResumes]);

  /**
   * 创建新简历
   */
  const handleCreateResume = useCallback((title: string, description?: string) => {
    return createResume(title, description);
  }, [createResume]);

  /**
   * 删除简历
   */
  const handleDeleteResume = useCallback((resumeId: string) => {
    return deleteResume(resumeId);
  }, [deleteResume]);

  /**
   * 批量删除简历
   */
  const handleBatchDeleteResumes = useCallback((resumeIds: string[]) => {
    return batchDeleteResumes(resumeIds);
  }, [batchDeleteResumes]);

  /**
   * 重命名简历
   */
  const handleRenameResume = useCallback((resumeId: string, newTitle: string, newDescription?: string) => {
    return renameResume(resumeId, newTitle, newDescription);
  }, [renameResume]);

  /**
   * 复制简历
   */
  const handleDuplicateResume = useCallback((resumeId: string, newTitle?: string) => {
    return duplicateResume(resumeId, newTitle);
  }, [duplicateResume]);

  /**
   * 切换简历
   */
  const handleSwitchResume = useCallback((resumeId: string) => {
    switchResume(resumeId);
  }, [switchResume]);

  /**
   * 更新当前简历
   */
  const updateCurrentResume = useCallback((resume: Resume) => {
    setCurrentResume(resume);
  }, [setCurrentResume]);

  /**
   * 获取简历元数据
   */
  const getResumeMetadata = useCallback((resumeId: string): ResumeMetadata | undefined => {
    return collection.metadata[resumeId];
  }, [collection.metadata]);

  /**
   * 获取简历数据
   */
  const getResumeData = useCallback((resumeId: string): Resume | undefined => {
    return collection.resumes[resumeId];
  }, [collection.resumes]);

  return {
    // 当前状态
    currentResume,
    currentResumeId,
    resumeList,
    totalCount: resumeList.length,

    // 基本操作
    switchResume: handleSwitchResume,
    createResume: handleCreateResume,
    deleteResume: handleDeleteResume,
    batchDeleteResumes: handleBatchDeleteResumes,
    renameResume: handleRenameResume,
    duplicateResume: handleDuplicateResume,
    updateCurrentResume,

    // 导入导出
    exportCurrentResume,
    exportResume,
    exportAllResumes,
    importSingleResume,
    importBatchResumes: handleImportBatchResumes,

    // 工具函数
    getResumeMetadata,
    getResumeData,
  };
};

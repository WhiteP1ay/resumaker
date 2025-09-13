import type { Resume } from '@/types/resume';

/**
 * 导出简历为JSON文件
 */
export const exportResumeToFile = (resume: Resume) => {
  try {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.title || '简历'}.json`;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 清理URL对象
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('导出简历失败:', error);
    return false;
  }
};

/**
 * 从文件导入简历
 */
export const importResumeFromFile = (showMessage?: (message: string, variant?: 'default' | 'info' | 'success' | 'warning' | 'error') => void): Promise<Resume | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      try {
        const text = await file.text();
        const resume = JSON.parse(text) as Resume;
        
        // 基本验证
        if (!resume.id || !resume.title || !resume.sections) {
          throw new Error('无效的简历文件格式');
        }

        resolve(resume);
      } catch (error) {
        console.error('导入简历失败:', error);
        showMessage?.('导入失败：文件格式不正确或文件已损坏', 'error');
        resolve(null);
      }
    };

    input.oncancel = () => {
      resolve(null);
    };

    // 触发文件选择
    input.click();
  });
};

/**
 * 批量导出简历
 */
export const exportMultipleResumes = (resumes: Resume[], filename: string = '简历合集') => {
  try {
    const dataStr = JSON.stringify(resumes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('批量导出简历失败:', error);
    return false;
  }
};

/**
 * 批量导入简历
 */
export const importMultipleResumes = (showMessage?: (message: string, variant?: 'default' | 'info' | 'success' | 'warning' | 'error') => void): Promise<Resume[] | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        // 检查是否为数组格式（批量导入）
        if (Array.isArray(data)) {
          // 验证每个简历对象
          const resumes = data.filter((item): item is Resume => {
            return item && typeof item === 'object' && item.id && item.title && item.sections;
          });
          
          if (resumes.length === 0) {
            throw new Error('没有找到有效的简历数据');
          }
          
          resolve(resumes);
        } else if (data.id && data.title && data.sections) {
          // 单个简历格式
          resolve([data as Resume]);
        } else {
          throw new Error('无效的文件格式');
        }
      } catch (error) {
        console.error('批量导入简历失败:', error);
        showMessage?.('导入失败：文件格式不正确或文件已损坏', 'error');
        resolve(null);
      }
    };

    input.oncancel = () => {
      resolve(null);
    };

    input.click();
  });
};

/**
 * 验证简历数据格式
 */
export const validateResumeData = (data: unknown): data is Resume => {
  if (!data || typeof data !== 'object') return false;
  
  const resume = data as Partial<Resume>;
  
  return !!(
    resume.id &&
    resume.title &&
    resume.sections &&
    Array.isArray(resume.sections) &&
    resume.sections.length > 0
  );
};

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { ResumePrompt } from '@/types/prompt';
import { DEFAULT_RESUME_PROMPTS } from '@/types/prompt';

// 持久化存储提示词列表
export const promptsAtom = atomWithStorage<ResumePrompt[]>(
  'resume-prompts',
  DEFAULT_RESUME_PROMPTS
);

// 添加提示词
export const addPromptAtom = atom(
  null,
  (get, set, prompt: Omit<ResumePrompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const prompts = get(promptsAtom);
    const now = new Date().toISOString();
    const newPrompt: ResumePrompt = {
      ...prompt,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    set(promptsAtom, [...prompts, newPrompt]);
  }
);

// 更新提示词
export const updatePromptAtom = atom(
  null,
  (get, set, updatedPrompt: Omit<ResumePrompt, 'createdAt' | 'updatedAt'> & { id: string }) => {
    const prompts = get(promptsAtom);
    const now = new Date().toISOString();
    const updatedPrompts = prompts.map(prompt =>
      prompt.id === updatedPrompt.id 
        ? { ...updatedPrompt, createdAt: prompt.createdAt, updatedAt: now }
        : prompt
    );
    set(promptsAtom, updatedPrompts);
  }
);

// 删除提示词
export const deletePromptAtom = atom(
  null,
  (get, set, promptId: string) => {
    const prompts = get(promptsAtom);
    const filteredPrompts = prompts.filter(prompt => prompt.id !== promptId);
    set(promptsAtom, filteredPrompts);
  }
);

// 搜索关键词状态
export const searchKeywordAtom = atom<string>('');

// 重置为默认提示词
export const resetPromptsAtom = atom(
  null,
  (_get, set) => {
    set(promptsAtom, DEFAULT_RESUME_PROMPTS);
  }
);

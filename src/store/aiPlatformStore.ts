import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { AIPlatform } from '@/types/aiPlatform';
import { DEFAULT_AI_PLATFORMS } from '@/types/aiPlatform';

// 持久化存储AI平台列表
export const aiPlatformsAtom = atomWithStorage<AIPlatform[]>(
  'ai-platforms',
  DEFAULT_AI_PLATFORMS
);

// 添加AI平台
export const addAIPlatformAtom = atom(
  null,
  (get, set, platform: Omit<AIPlatform, 'id'>) => {
    const platforms = get(aiPlatformsAtom);
    const newPlatform: AIPlatform = {
      ...platform,
      id: Date.now().toString(), // 简单的ID生成
    };
    set(aiPlatformsAtom, [...platforms, newPlatform]);
  }
);

// 更新AI平台
export const updateAIPlatformAtom = atom(
  null,
  (get, set, updatedPlatform: AIPlatform) => {
    const platforms = get(aiPlatformsAtom);
    const updatedPlatforms = platforms.map(platform =>
      platform.id === updatedPlatform.id ? updatedPlatform : platform
    );
    set(aiPlatformsAtom, updatedPlatforms);
  }
);

// 删除AI平台
export const deleteAIPlatformAtom = atom(
  null,
  (get, set, platformId: string) => {
    const platforms = get(aiPlatformsAtom);
    const filteredPlatforms = platforms.filter(platform => platform.id !== platformId);
    set(aiPlatformsAtom, filteredPlatforms);
  }
);

// 重置为默认平台
export const resetAIPlatformsAtom = atom(
  null,
  (_get, set) => {
    set(aiPlatformsAtom, DEFAULT_AI_PLATFORMS);
  }
);

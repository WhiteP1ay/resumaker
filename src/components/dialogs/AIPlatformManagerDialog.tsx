import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  aiPlatformsAtom,
  addAIPlatformAtom,
  updateAIPlatformAtom,
  deleteAIPlatformAtom,
  resetAIPlatformsAtom,
} from '@/store/aiPlatformStore';
import type { AIPlatform } from '@/types/aiPlatform';
import { Plus, Edit3, Trash2, RotateCcw } from 'lucide-react';
import { useFloatingMessage } from '@/hooks/useFloatingMessage';

interface AIPlatformManagerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditingPlatform {
  id?: string;
  name: string;
  url: string;
  icon: string;
}

export const AIPlatformManagerDialog = ({ isOpen, onClose }: AIPlatformManagerDialogProps) => {
  const platforms = useAtomValue(aiPlatformsAtom);
  const addPlatform = useSetAtom(addAIPlatformAtom);
  const updatePlatform = useSetAtom(updateAIPlatformAtom);
  const deletePlatform = useSetAtom(deleteAIPlatformAtom);
  const resetPlatforms = useSetAtom(resetAIPlatformsAtom);
  const { showSuccess, showError } = useFloatingMessage();

  const [editingPlatform, setEditingPlatform] = useState<EditingPlatform | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddPlatform = () => {
    setEditingPlatform({
      name: '',
      url: '',
      icon: '',
    });
    setIsAdding(true);
  };

  const handleEditPlatform = (platform: AIPlatform) => {
    setEditingPlatform({
      id: platform.id,
      name: platform.name,
      url: platform.url,
      icon: platform.icon || '',
    });
    setIsAdding(false);
  };

  const handleSavePlatform = () => {
    if (!editingPlatform) return;

    // 验证输入
    if (!editingPlatform.name.trim()) {
      showError('请输入平台名称');
      return;
    }
    if (!editingPlatform.url.trim()) {
      showError('请输入平台URL');
      return;
    }

    // 验证URL格式
    try {
      new URL(editingPlatform.url);
    } catch {
      showError('请输入有效的URL地址');
      return;
    }

    if (isAdding) {
      addPlatform({
        name: editingPlatform.name.trim(),
        url: editingPlatform.url.trim(),
        icon: editingPlatform.icon,
      });
      showSuccess('AI平台添加成功');
    } else if (editingPlatform.id) {
      updatePlatform({
        id: editingPlatform.id,
        name: editingPlatform.name.trim(),
        url: editingPlatform.url.trim(),
        icon: editingPlatform.icon,
      });
      showSuccess('AI平台更新成功');
    }

    setEditingPlatform(null);
    setIsAdding(false);
  };

  const handleDeletePlatform = (platformId: string) => {
    deletePlatform(platformId);
    showSuccess('AI平台删除成功');
  };

  const handleResetPlatforms = () => {
    resetPlatforms();
    showSuccess('已重置为默认AI平台');
  };

  const handleCancelEdit = () => {
    setEditingPlatform(null);
    setIsAdding(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>管理AI平台</DialogTitle>
          <DialogDescription>
            添加、编辑或删除常用的AI工具平台。点击平台可以在新标签页中打开。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 平台列表 */}
          <div className="space-y-2">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{platform.icon}</span>
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-gray-500">{platform.url}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditPlatform(platform)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePlatform(platform.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {platforms.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                暂无AI平台，点击下方按钮添加
              </div>
            )}
          </div>

          {/* 编辑表单 */}
          {editingPlatform && (
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h4 className="font-medium mb-3">
                {isAdding ? '添加新平台' : '编辑平台'}
              </h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="platform-name">平台名称</Label>
                  <Input
                    id="platform-name"
                    value={editingPlatform.name}
                    onChange={(e) =>
                      setEditingPlatform({ ...editingPlatform, name: e.target.value })
                    }
                    placeholder="例如：ChatGPT"
                  />
                </div>
                <div>
                  <Label htmlFor="platform-url">平台URL</Label>
                  <Input
                    id="platform-url"
                    value={editingPlatform.url}
                    onChange={(e) =>
                      setEditingPlatform({ ...editingPlatform, url: e.target.value })
                    }
                    placeholder="例如：https://chat.openai.com"
                  />
                </div>
                <div>
                  <Label htmlFor="platform-icon">图标 (emoji)</Label>
                  <Input
                    id="platform-icon"
                    value={editingPlatform.icon}
                    onChange={(e) =>
                      setEditingPlatform({ ...editingPlatform, icon: e.target.value })
                    }
                    maxLength={2}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSavePlatform} size="sm">
                    保存
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    size="sm"
                  >
                    取消
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          {!editingPlatform && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleAddPlatform}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>添加平台</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleResetPlatforms}
                className="flex items-center space-x-2 text-gray-600"
              >
                <RotateCcw className="h-4 w-4" />
                <span>重置为默认</span>
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

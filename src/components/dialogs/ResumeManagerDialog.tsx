import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeManager } from '@/hooks/useResumeManager';
import { useFloatingMessage } from '@/hooks/useFloatingMessage';
import type { ResumeMetadata } from '@/types/resume';
import {
  Check,
  Copy,
  Download,
  Edit3,
  FileText,
  MoreVertical,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { DeleteResumeConfirmDialog } from './DeleteResumeConfirmDialog';

interface ResumeManagerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditingResume {
  id: string;
  title: string;
  description: string;
}

export const ResumeManagerDialog = ({ isOpen, onClose }: ResumeManagerDialogProps) => {
  const {
    resumeList,
    currentResumeId,
    totalCount,
    switchResume,
    createResume,
    deleteResume,
    batchDeleteResumes,
    renameResume,
    duplicateResume,
    exportResume,
    exportAllResumes,
    importSingleResume,
    importBatchResumes,
  } = useResumeManager();

  const { showMessage } = useFloatingMessage();

  const [editingResume, setEditingResume] = useState<EditingResume | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [newResumeDescription, setNewResumeDescription] = useState('');
  const [expandedMenuId, setExpandedMenuId] = useState<string | null>(null);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [selectedResumeIds, setSelectedResumeIds] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    resumeId: string;
    resumeTitle: string;
  }>({
    isOpen: false,
    resumeId: '',
    resumeTitle: '',
  });
  const [batchDeleteConfirm, setBatchDeleteConfirm] = useState<{
    isOpen: boolean;
    selectedCount: number;
  }>({
    isOpen: false,
    selectedCount: 0,
  });

  // 创建新简历
  const handleCreateResume = () => {
    if (!newResumeTitle.trim()) {
      showMessage('请输入简历标题', 'warning');
      return;
    }

    const newId = createResume(newResumeTitle.trim(), newResumeDescription.trim() || undefined);
    if (newId) {
      showMessage('简历创建成功', 'success');
      setIsCreating(false);
      setNewResumeTitle('');
      setNewResumeDescription('');
    } else {
      showMessage('创建失败，请重试', 'error');
    }
  };

  // 开始编辑简历
  const startEditing = (resume: ResumeMetadata) => {
    setEditingResume({
      id: resume.id,
      title: resume.title,
      description: resume.description || '',
    });
    setExpandedMenuId(null);
  };

  // 保存编辑
  const saveEditing = () => {
    if (!editingResume || !editingResume.title.trim()) {
      showMessage('请输入简历标题', 'warning');
      return;
    }

    const success = renameResume(
      editingResume.id,
      editingResume.title.trim(),
      editingResume.description.trim() || undefined
    );

    if (success) {
      showMessage('保存成功', 'success');
      setEditingResume(null);
    } else {
      showMessage('保存失败，请重试', 'error');
    }
  };

  // 取消编辑
  const cancelEditing = () => {
    setEditingResume(null);
  };

  // 请求删除简历
  const requestDeleteResume = (resumeId: string, title: string) => {
    setDeleteConfirm({
      isOpen: true,
      resumeId,
      resumeTitle: title,
    });
    setExpandedMenuId(null);
  };

  // 确认删除简历
  const confirmDeleteResume = () => {
    const { resumeId } = deleteConfirm;
    const success = deleteResume(resumeId);
    if (success) {
      showMessage('简历删除成功', 'success');
    } else {
      showMessage('删除失败，请重试', 'error');
    }
    setDeleteConfirm({
      isOpen: false,
      resumeId: '',
      resumeTitle: '',
    });
  };

  // 取消删除
  const cancelDeleteResume = () => {
    setDeleteConfirm({
      isOpen: false,
      resumeId: '',
      resumeTitle: '',
    });
  };

  // 复制简历
  const handleDuplicateResume = (resumeId: string, title: string) => {
    const newId = duplicateResume(resumeId, `${title} - 副本`);
    if (newId) {
      showMessage('简历复制成功', 'success');
    } else {
      showMessage('复制失败，请重试', 'error');
    }
    setExpandedMenuId(null);
  };

  // 切换简历
  const handleSwitchResume = (resumeId: string) => {
    if (resumeId !== currentResumeId) {
      switchResume(resumeId);
      showMessage('已切换简历', 'success');
    }
  };

  // 导出简历
  const handleExportResume = (resumeId: string, title: string) => {
    const success = exportResume(resumeId);
    if (success) {
      showMessage(`简历"${title}"导出成功`, 'success');
    } else {
      showMessage('导出失败，请重试', 'error');
    }
    setExpandedMenuId(null);
  };

  // 导出所有简历
  const handleExportAll = () => {
    const success = exportAllResumes();
    if (success) {
      showMessage('所有简历导出成功', 'success');
    } else {
      showMessage('导出失败，请重试', 'error');
    }
  };

  // 导入单个简历
  const handleImportSingle = async () => {
    const newId = await importSingleResume(showMessage);
    if (newId) {
      showMessage('简历导入成功', 'success');
    }
  };

  // 批量导入简历
  const handleImportBatch = async () => {
    const importedIds = await importBatchResumes(showMessage);
    if (importedIds.length > 0) {
      showMessage(`成功导入 ${importedIds.length} 份简历`, 'success');
    }
  };

  // 进入批量模式
  const enterBatchMode = () => {
    setIsBatchMode(true);
    setSelectedResumeIds(new Set());
    setExpandedMenuId(null);
  };

  // 退出批量模式
  const exitBatchMode = () => {
    setIsBatchMode(false);
    setSelectedResumeIds(new Set());
  };

  // 切换简历选择状态
  const toggleResumeSelection = (resumeId: string) => {
    const newSelected = new Set(selectedResumeIds);
    if (newSelected.has(resumeId)) {
      newSelected.delete(resumeId);
    } else {
      newSelected.add(resumeId);
    }
    setSelectedResumeIds(newSelected);
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedResumeIds.size === resumeList.length) {
      setSelectedResumeIds(new Set());
    } else {
      setSelectedResumeIds(new Set(resumeList.map((resume) => resume.id)));
    }
  };

  // 请求批量删除
  const requestBatchDelete = () => {
    if (selectedResumeIds.size === 0) {
      showMessage('请选择要删除的简历', 'warning');
      return;
    }

    // 不能删除所有简历
    if (selectedResumeIds.size >= resumeList.length) {
      showMessage('不能删除所有简历，至少要保留一份', 'warning');
      return;
    }

    setBatchDeleteConfirm({
      isOpen: true,
      selectedCount: selectedResumeIds.size,
    });
  };

  // 确认批量删除
  const confirmBatchDelete = () => {
    const success = batchDeleteResumes(Array.from(selectedResumeIds));
    if (success) {
      showMessage(`成功删除 ${selectedResumeIds.size} 份简历`, 'success');
      exitBatchMode();
    } else {
      showMessage('删除失败，请重试', 'error');
    }
    setBatchDeleteConfirm({
      isOpen: false,
      selectedCount: 0,
    });
  };

  // 取消批量删除
  const cancelBatchDelete = () => {
    setBatchDeleteConfirm({
      isOpen: false,
      selectedCount: 0,
    });
  };

  // 格式化日期
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">简历管理</DialogTitle>
            <DialogDescription>管理您的所有简历，支持创建、编辑、导入导出等操作</DialogDescription>
          </DialogHeader>

          {/* 工具栏 */}
          <div className="flex flex-wrap gap-2 py-4 border-b border-gray-200">
            {!isBatchMode ? (
              <>
                <Button
                  onClick={() => setIsCreating(true)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  新建简历
                </Button>

                <Button onClick={handleImportSingle} variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  导入简历
                </Button>

                <Button onClick={handleImportBatch} variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  批量导入
                </Button>

                <Button onClick={handleExportAll} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  导出全部
                </Button>

                {totalCount > 1 && (
                  <Button
                    onClick={enterBatchMode}
                    variant="outline"
                    size="sm"
                    className="text-orange-600 border-orange-300 hover:bg-orange-50"
                  >
                    <X className="h-4 w-4 mr-1" />
                    批量操作
                  </Button>
                )}

                <div className="ml-auto text-sm text-gray-500 flex items-center">
                  共 {totalCount} 份简历
                </div>
              </>
            ) : (
              <>
                <Button onClick={exitBatchMode} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-1" />
                  退出批量模式
                </Button>

                <Button onClick={toggleSelectAll} variant="outline" size="sm">
                  <Check className="h-4 w-4 mr-1" />
                  {selectedResumeIds.size === resumeList.length ? '取消全选' : '全选'}
                </Button>

                <Button
                  onClick={requestBatchDelete}
                  variant="outline"
                  size="sm"
                  disabled={selectedResumeIds.size === 0}
                  className="text-red-600 border-red-300 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  删除选中 ({selectedResumeIds.size})
                </Button>

                <div className="ml-auto text-sm text-gray-500 flex items-center">
                  已选择 {selectedResumeIds.size} / {totalCount} 份简历
                </div>
              </>
            )}
          </div>

          {/* 创建简历表单 */}
          {isCreating && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
              <h3 className="font-medium text-blue-800">创建新简历</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="new-title">简历标题 *</Label>
                  <Input
                    id="new-title"
                    value={newResumeTitle}
                    onChange={(e) => setNewResumeTitle(e.target.value)}
                    placeholder="请输入简历标题"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="new-description">描述</Label>
                  <Input
                    id="new-description"
                    value={newResumeDescription}
                    onChange={(e) => setNewResumeDescription(e.target.value)}
                    placeholder="简历描述（可选）"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsCreating(false);
                    setNewResumeTitle('');
                    setNewResumeDescription('');
                  }}
                >
                  取消
                </Button>
                <Button size="sm" onClick={handleCreateResume}>
                  创建
                </Button>
              </div>
            </div>
          )}

          {/* 简历列表 */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2 p-1">
              {resumeList.map((resume) => (
                <div
                  key={resume.id}
                  className={`
                  p-4 border rounded-lg transition-all duration-200 hover:shadow-md
                  ${
                    resume.id === currentResumeId
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }
                  ${
                    isBatchMode && selectedResumeIds.has(resume.id)
                      ? 'border-orange-500 bg-orange-50'
                      : ''
                  }
                `}
                >
                  {editingResume?.id === resume.id ? (
                    // 编辑模式
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="edit-title">简历标题 *</Label>
                          <Input
                            id="edit-title"
                            value={editingResume.title}
                            onChange={(e) =>
                              setEditingResume({
                                ...editingResume,
                                title: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-description">描述</Label>
                          <Input
                            id="edit-description"
                            value={editingResume.description}
                            onChange={(e) =>
                              setEditingResume({
                                ...editingResume,
                                description: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={cancelEditing}>
                          取消
                        </Button>
                        <Button size="sm" onClick={saveEditing}>
                          保存
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // 显示模式
                    <div className="flex items-center justify-between">
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => {
                          if (isBatchMode) {
                            toggleResumeSelection(resume.id);
                          } else {
                            handleSwitchResume(resume.id);
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          {isBatchMode ? (
                            <div
                              className={`
                              w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer
                              ${
                                selectedResumeIds.has(resume.id)
                                  ? 'bg-orange-500 border-orange-500 text-white'
                                  : 'border-gray-300 hover:border-orange-400'
                              }
                            `}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleResumeSelection(resume.id);
                              }}
                            >
                              {selectedResumeIds.has(resume.id) && <Check className="h-3 w-3" />}
                            </div>
                          ) : (
                            <FileText
                              className={`h-5 w-5 ${
                                resume.id === currentResumeId ? 'text-blue-600' : 'text-gray-400'
                              }`}
                            />
                          )}
                          <div>
                            <h3
                              className={`font-medium ${
                                resume.id === currentResumeId ? 'text-blue-800' : 'text-gray-800'
                              }`}
                            >
                              {resume.title}
                              {resume.id === currentResumeId && (
                                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                  当前
                                </span>
                              )}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>创建于 {formatDate(resume.createdAt)}</span>
                              <span>更新于 {formatDate(resume.updatedAt)}</span>
                              {resume.description && (
                                <span className="max-w-xs truncate">{resume.description}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 操作菜单 */}
                      {!isBatchMode && (
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedMenuId(expandedMenuId === resume.id ? null : resume.id)
                            }
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>

                          {expandedMenuId === resume.id && (
                            <div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="py-1">
                                <button
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
                                  onClick={() => startEditing(resume)}
                                >
                                  <Edit3 className="h-4 w-4" />
                                  <span>编辑</span>
                                </button>
                                <button
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
                                  onClick={() => handleDuplicateResume(resume.id, resume.title)}
                                >
                                  <Copy className="h-4 w-4" />
                                  <span>复制</span>
                                </button>
                                <button
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2"
                                  onClick={() => handleExportResume(resume.id, resume.title)}
                                >
                                  <Download className="h-4 w-4" />
                                  <span>导出</span>
                                </button>
                                {totalCount > 1 && (
                                  <button
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 text-red-600 flex items-center space-x-2"
                                    onClick={() => requestDeleteResume(resume.id, resume.title)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span>删除</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 点击外部关闭菜单 */}
      {expandedMenuId && (
        <div className="fixed inset-0 z-0" onClick={() => setExpandedMenuId(null)} />
      )}

      {/* 删除确认对话框 */}
      <DeleteResumeConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDeleteResume}
        onConfirm={confirmDeleteResume}
        resumeTitle={deleteConfirm.resumeTitle}
        isLastResume={totalCount <= 1}
      />

      {/* 批量删除确认对话框 */}
      <Dialog open={batchDeleteConfirm.isOpen} onOpenChange={cancelBatchDelete}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600">确认批量删除</DialogTitle>
            <DialogDescription>
              您确定要删除选中的 {batchDeleteConfirm.selectedCount} 份简历吗？此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={cancelBatchDelete}>
              取消
            </Button>
            <Button onClick={confirmBatchDelete} className="bg-red-600 hover:bg-red-700">
              确认删除
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

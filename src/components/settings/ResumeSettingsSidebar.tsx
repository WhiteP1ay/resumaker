import { usePageSettings } from '@/hooks/components/usePageSettings';
import { ChevronLeft, ChevronRight, Database, FileText, List, Palette, Settings2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { DataOperationPanel } from './DataOperationPanel';
import { ModuleManagementTab } from './ModuleManagementTab';
import { PageSettingsTab } from './PageSettingsTab';
import { CustomCssSettingsPanel } from './CustomCssSettingsPanel';
import { ThemeSelectPanel } from './ThemeSelectPanel';

type SettingsTab = 'theme' | 'modules' | 'pages' | 'custom-css' | 'data';

const tabItems: Array<{ id: SettingsTab; label: string; icon: ComponentType<{ className?: string }> }> = [
  { id: 'theme', label: '主题', icon: Palette },
  { id: 'modules', label: '模块', icon: List },
  { id: 'pages', label: '分页', icon: FileText },
  { id: 'custom-css', label: 'CSS', icon: Settings2 },
  { id: 'data', label: '数据', icon: Database },
];

interface ResumeSettingsSidebarProps {
  onClearResume: () => void;
}

export const ResumeSettingsSidebar = ({ onClearResume }: ResumeSettingsSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>('theme');
  const pageSettings = usePageSettings();
  const applyAssignmentsRef = useRef(pageSettings.applyPageAssignments);

  useEffect(() => {
    applyAssignmentsRef.current = pageSettings.applyPageAssignments;
  }, [pageSettings.applyPageAssignments]);

  useEffect(() => {
    return () => {
      applyAssignmentsRef.current();
    };
  }, []);

  const handleTabChange = (tab: SettingsTab) => {
    if (activeTab === 'pages' && tab !== 'pages') {
      pageSettings.applyPageAssignments();
    }
    setActiveTab(tab);
  };

  return (
    <aside
      className={`shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-[340px]'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="h-12 border-b border-gray-100 px-3 flex items-center justify-between">
          {!collapsed && <h2 className="text-sm font-semibold text-gray-900">简历设置</h2>}
          <button
            type="button"
            aria-label={collapsed ? '展开设置面板' : '折叠设置面板'}
            className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <div className="p-2 border-b border-gray-100">
          <div className={`grid ${collapsed ? 'grid-cols-1' : 'grid-cols-5'} gap-1`}>
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-label={collapsed ? tab.label : undefined}
                  className={`h-8 rounded-md text-xs flex items-center justify-center gap-1 transition-colors ${
                    isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                  title={tab.label}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {!collapsed && <span>{tab.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {!collapsed && (
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {activeTab === 'theme' && <ThemeSelectPanel />}
            {activeTab === 'modules' && <ModuleManagementTab />}
            {activeTab === 'pages' && <PageSettingsTab pageSettings={pageSettings} />}
            {activeTab === 'custom-css' && <CustomCssSettingsPanel />}
            {activeTab === 'data' && <DataOperationPanel onClearResume={onClearResume} />}
          </div>
        )}
      </div>
    </aside>
  );
};

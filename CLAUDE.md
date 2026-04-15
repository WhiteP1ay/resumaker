# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作提供指引。

## 常用命令

```bash
pnpm dev          # 启动开发服务器（端口 5173）
pnpm build        # TypeScript 检查 + Vite 生产构建
pnpm preview      # 本地预览生产构建
pnpm lint         # Biome lint 检查
pnpm lint:fix     # Biome lint 自动修复
pnpm format       # Biome 格式化所有文件
pnpm type-check   # TypeScript 类型检查（不输出文件）
```

暂未配置测试框架。

## 架构说明

Resumaker 是纯前端 SPA（React + TypeScript + Vite）

部署基础路径为 `/resume/`

**路由**（React Router，basename `/resume`）：
- `/` → 编辑器（MainPage → MainPageContainer）
- `/preview` → 只读预览 + 打印（PreviewPage，懒加载）

**状态管理**（Jotai + `atomWithStorage`）：
- `src/store/resumeStore.ts` 中的单一 `resumeAtom` 存储完整简历数据，自动同步到 localStorage。
- 写操作通过只写派生 atom（`updateSectionDataAtom`、`addSectionAtom` 等）完成——组件调用 `useSetAtom()`，不直接修改状态。
- `useResumeActions()`（`src/hooks/useResumeActions.ts`）是主要的 CRUD 封装 hook，优先使用它而非直接操作 store atom。

**组件分层**：
- `src/pages/` — 薄路由包装层，几乎无逻辑
- `src/containers/` — 连接状态的组件，负责布局与编排逻辑
- `src/components/` — 展示层；`ui/` 存放 Shadcn/Radix 封装，`editors/` 存放各模块编辑 UI，`theme/` 存放简历渲染组件

**数据模型**（`src/types/resume.ts`）：
- `Resume` 包含 `sections: ResumeSection[]`，每个 section 有 `type`（`basic` | `timeline` | `list` | `text`）及对应类型的 `data`。
- 各模块内容（描述、列表项）以 **HTML 字符串**形式存储（来自 React Quill），处理时需作为 HTML 而非纯文本。
- 通过 `pageSettings` 和每个 section 的 `pageNumber` 支持多页简历。

**路径别名**：`@/` 映射到 `src/`。

**样式**：TailwindCSS + CSS 变量主题（HSL 格式）。打印布局使用 `print:` Tailwind 变体，通过浏览器打印对话框导出 PDF。

**提交规范**：遵循 Conventional Commits（`feat:`、`fix:`、`refactor:` 等）。

## 代码质量自动检查

每次写完或修改 React 组件后，**无需用户提醒**，主动按以下顺序自动执行：

1. **`react-best-practices`** — 检查 bundle 优化、重渲染、异步瀑布流等问题
2. **`composition-patterns`** — 检查组件是否有 boolean prop 泛滥、可用复合组件替代的结构
3. **`web-design-guidelines`** — 修改了 `src/components/theme/` 或任何展示层组件时检查 UI/UX/可访问性

发现问题直接修复，不需要先报告再等确认。

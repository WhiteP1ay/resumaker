/**
 * 可复用的内容渲染组件
 */
import type { ListItem, TextContent, TimelineItem } from '@/types/resume';

interface ListContentProps {
  data: ListItem[];
}

export const ListContent = ({ data }: ListContentProps) => (
  <div className="space-y-1 print:space-y-1">
    {data.map((item, index) => (
      <div key={item.id} className="flex items-start space-x-3">
        <span className="text-sm font-medium mt-0.5 shrink-0">{index + 1}.</span>
        <span className="text-sm text-gray-700 leading-relaxed">{item.content}</span>
      </div>
    ))}
  </div>
);

interface TimelineContentProps {
  data: TimelineItem[];
}

export const TimelineContent = ({ data }: TimelineContentProps) => (
  <div className="space-y-4 print:space-y-3">
    {data.map((item) => (
      <div key={item.id} className="relative">
        <div className="flex justify-between items-start mb-2 print:mb-1">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1 print:mb-0.5">
              <h3 className="text-base font-semibold text-gray-900 print:text-sm">{item.title}</h3>
              <span className="text-sm text-gray-600">{item.subtitle}</span>
            </div>
            {item.secondarySubtitle && (
              <div className="text-sm text-gray-700 font-medium">{item.secondarySubtitle}</div>
            )}
          </div>
          {(item.startDate || item.endDate) && (
            <div className="text-sm text-gray-600 ml-4 shrink-0">
              {item.startDate} {item.startDate && item.endDate && '-'} {item.endDate}
            </div>
          )}
        </div>

        {item.description && (
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pl-0 mt-2 print:mt-1">
            {item.description}
          </div>
        )}
      </div>
    ))}
  </div>
);

interface TextContentRendererProps {
  data: TextContent;
}

export const TextContentRenderer = ({ data }: TextContentRendererProps) => (
  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{data.content}</div>
);

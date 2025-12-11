import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export interface CardAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface CardMeta {
  icon: React.ElementType;
  label: string;
  className?: string;
}

export interface CardProps {
  icon?: React.ElementType;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  metadata?: CardMeta[];
  action?: CardAction;
  footer?: React.ReactNode;
  buttonLabel?: string;
  onButtonClick?: () => void;
  buttonVariant?: "primary" | "success" | "secondary";
}

export const ShowcaseCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  tags,
  metadata,
  action,
  footer,
  buttonLabel,
  onButtonClick,
  buttonVariant,
}: CardProps) => {
  return (
    <Card className="bg-white border-2 border-[#D4AF37] rounded-xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-start">
        {Icon && (
          <div className="bg-[#D4AF37] bg-opacity-10 p-3 rounded-lg mr-4 shrink-0">
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-[#0D090A] wrap-break-words mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-[#D4AF37] font-medium">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-[#0D090A] text-sm sm:text-base grow">
          {description}
        </p>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs sm:text-sm bg-[#D4AF37] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Metadata */}
      {metadata && metadata.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-[#D4AF37] border-opacity-20">
          {metadata.map(({ icon: MetaIcon, label }, idx) => (
            <div
              key={idx}
              className="flex items-center text-xs sm:text-sm text-[#0D090A]"
            >
              <MetaIcon className="w-4 h-4 mr-2 text-[#D4AF37] shrink-0" />
              <span className="wrap-break-words">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer override */}
      {footer && <div className="pt-4 border-t border-[#D4AF37]">{footer}</div>}

      {/* Action button */}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 w-full py-2 sm:py-3 rounded-lg font-semibold transition-all hover:opacity-90 bg-[#D4AF37] text-white text-sm sm:text-base"
        >
          {action.label}
        </button>
      )}
    </Card>
  );
};

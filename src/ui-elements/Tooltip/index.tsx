import React from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import "./styles.scss";

type TooltipPlacement =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";

interface Props extends Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: TooltipPlacement;
}

export default function Tooltip({
  children,
  content,
  placement = "auto",
  ...rest
}: Props) {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement });

  return (
    <span className="tooltip-wrapper">
      <span ref={setTriggerRef} {...rest}>
        {children}
      </span>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: "tooltip tooltip-container" })}
        >
          <div {...getArrowProps({ className: "tooltip tooltip-arrow" })} />
          {content}
        </div>
      )}
    </span>
  );
}

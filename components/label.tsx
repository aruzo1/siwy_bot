import { ComponentProps, forwardRef } from "react";
import { useClassNameMerged } from "@/hooks";

export const Label = forwardRef<HTMLLabelElement, ComponentProps<"label">>(
  ({ className, children, ...rest }, ref) => {
    const classNameMerged = useClassNameMerged("text-lg", className);

    return (
      <label ref={ref} className={classNameMerged} {...rest}>
        {children}
      </label>
    );
  },
);

Label.displayName = "Label";

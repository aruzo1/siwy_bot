import { ComponentProps, forwardRef } from "react";
import { useClassNameMerged } from "@/hooks";

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, children, ...rest }, ref) => {
    const classNameMerged = useClassNameMerged("btn", className);

    return (
      <button ref={ref} className={classNameMerged} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

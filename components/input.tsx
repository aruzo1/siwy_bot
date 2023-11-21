import { ComponentProps, forwardRef } from "react";
import { useClassNameMerged } from "@/hooks";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, ...rest }, ref) => {
    const classNameMerged = useClassNameMerged(
      `rounded border border-neutral-700 bg-neutral-900 px-4 py-4 outline-none 
       transition-colors placeholder:text-neutral-700 focus:border-indigo-500`,
      className,
    );

    return <input ref={ref} className={classNameMerged} {...rest} />;
  },
);

Input.displayName = "Input";

import { ComponentProps, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        className={`rounded-lg border border-neutral-700 bg-neutral-900 px-4 
                    py-4 outline-none transition-colors 
                    placeholder:text-neutral-700 focus:border-indigo-500`}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

import { ComponentProps, forwardRef } from "react";

export const Label = forwardRef<HTMLLabelElement, ComponentProps<"label">>(
  (props, ref) => {
    return <label ref={ref} className="text-lg" {...props} />;
  },
);

Label.displayName = "Label";

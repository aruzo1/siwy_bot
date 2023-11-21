import { ComponentProps, forwardRef } from "react";

export const FieldSet = forwardRef<
  HTMLFieldSetElement,
  ComponentProps<"fieldset">
>((props, ref) => {
  return <fieldset ref={ref} className="flex flex-col gap-2" {...props} />;
});

FieldSet.displayName = "FieldSet";

import { ComponentProps, forwardRef } from "react";
import { useClassNameMerged } from "@/hooks";

export const FieldSet = forwardRef<
  HTMLFieldSetElement,
  ComponentProps<"fieldset">
>(({ className, children, ...rest }, ref) => {
  const classNameMerged = useClassNameMerged("flex flex-col gap-2", className);

  return (
    <fieldset ref={ref} className={classNameMerged} {...rest}>
      {children}
    </fieldset>
  );
});

FieldSet.displayName = "FieldSet";

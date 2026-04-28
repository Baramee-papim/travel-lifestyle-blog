import { Toaster as Sonner } from "sonner";
import type { ComponentProps } from "react";

const Toaster = ({
  ...props
}: ComponentProps<typeof Sonner>) => {
  return (
    <Sonner
      closeButton    
      {...props} 
    />
  );
}

export { Toaster }
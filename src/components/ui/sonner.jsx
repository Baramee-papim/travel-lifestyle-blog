import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      richColors
      closeButton
      {...props} 
    />
  );
}

export { Toaster }

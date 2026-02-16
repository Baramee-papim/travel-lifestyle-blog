import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      closeButton
      toastOptions={{
        style: {
          borderRadius: "12px",
          fontFamily: '"Poppins", sans-serif',
        },
      }}
      {...props} 
    />
  );
}

export { Toaster }
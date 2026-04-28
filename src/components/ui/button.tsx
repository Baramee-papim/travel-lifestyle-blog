import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-body-1 font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-brown-300",
  {
    variants: {
      variant: {
        default: "border border-transparent hover:bg-brown-400 hover:text-white cursor-pointer",
        outline: "border bg-transparent hover:border-brown-400 hover:text-brown-400 cursor-pointer",
        link: "rounded-none border-none bg-transparent px-0 py-0 h-auto underline underline-offset-2 hover:text-brown-400 cursor-pointer",
      },
      state: {
        default: "",
        Hover: "",
        Pressed: "",
        Disable: "pointer-events-none opacity-50",
      },
      size: {
        default: "h-12 px-10 has-[>svg]:px-8",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      { variant: "default", state: "default", className: "bg-brown-600 text-white" },
      { variant: "default", state: "Hover", className: "bg-brown-400 text-white" },
      { variant: "default", state: "Pressed", className: "bg-brown-500 text-white" },
      { variant: "default", state: "Disable", className: "bg-brown-600 text-white" },

      { variant: "outline", state: "default", className: "border-brown-600 text-brown-600" },
      { variant: "outline", state: "Hover", className: "border-brown-400 text-brown-400" },
      { variant: "outline", state: "Pressed", className: "border-brown-500 text-brown-500" },
      { variant: "outline", state: "Disable", className: "border-brown-600 text-brown-600" },

      { variant: "link", state: "default", className: "text-brown-600" },
      { variant: "link", state: "Hover", className: "text-brown-400" },
      { variant: "link", state: "Pressed", className: "text-brown-500" },
      { variant: "link", state: "Disable", className: "text-brown-600" },
    ],
    defaultVariants: {
      variant: "default",
      state: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  state,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const isDisabled = props.disabled || state === "Disable"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-state={state}
      data-size={size}
      className={cn(buttonVariants({ variant, state, size, className }))}
      disabled={isDisabled}
      {...props} />
  );
}

export { Button, buttonVariants }

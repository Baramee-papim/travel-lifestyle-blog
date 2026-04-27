import * as React from "react";
import { cn } from "@/lib/utils";

type MenuProps = Omit<React.ComponentProps<"button">, "children"> & {
  icon: React.ReactNode | string;
  name: string;
};

const Menu = React.forwardRef<HTMLButtonElement, MenuProps>(
  ({ icon, name, className, type = "button", ...props }, ref) => {
    const renderedIcon =
      typeof icon === "string" ? (
        <img
          src={icon}
          alt={name}
          className="object-contain shrink-0 text-brown-400"
        />
      ) : (
        <span className="shrink-0 text-brown-400 [&_svg]:text-brown-400 [&_svg]:fill-current [&_svg]:stroke-current">
          {icon}
        </span>
      );

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "w-full flex items-center gap-4 px-6 py-2 rounded-[12px] bg-brown-100 text-left text-brown-500 text-body-1 font-semibold shadow-[2px_2px_16px_0_rgba(0,0,0,0.1)] transition-colors hover:bg-brown-200/70",
          className
        )}
        {...props}
      >
        {renderedIcon}
        <span>{name}</span>
      </button>
    );
  }
);

Menu.displayName = "Menu";

export { Menu };
export type { MenuProps };

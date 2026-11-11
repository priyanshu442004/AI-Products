import * as React from "react";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

const DropdownMenuContext = React.createContext(undefined);

const DropdownMenu = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  hoverMode = false,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      if (onOpenChange) {
        const newValue = typeof value === "function" ? value(open) : value;
        onOpenChange(newValue);
      }
    },
    [isControlled, onOpenChange, open]
  );

  return (
    <DropdownMenuContext.Provider
      value={{ open, setOpen, hoverMode, triggerRef }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef(
  ({ children, asChild, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
      throw new Error("DropdownMenuTrigger must be used within a DropdownMenu");
    }

    const { setOpen, hoverMode, triggerRef } = context;

    const handleClick = (e) => {
      e.stopPropagation();
      setOpen((prev) => !prev);

      if (props.onClick) {
        props.onClick(e);
      }
    };

    const triggerHoverTimeoutRef = React.useRef(null);

    React.useImperativeHandle(ref, () => {
      if (!triggerRef.current) {
        console.warn(
          "DropdownMenuTrigger ref is null. Ensure children forward their ref when asChild is true."
        );
        return document.createElement("button");
      }
      return triggerRef.current;
    }, []);

    const handleMouseEnter = (e) => {
      if (hoverMode) {
        if (triggerHoverTimeoutRef.current) {
          clearTimeout(triggerHoverTimeoutRef.current);
        }
        triggerHoverTimeoutRef.current = setTimeout(() => {
          setOpen(true);
        }, 100);
        if (triggerRef.current) {
          triggerRef.current._hoverTimeoutRef =
            triggerHoverTimeoutRef.current;
        }
      }

      if (props.onMouseEnter) {
        props.onMouseEnter(e);
      }
    };

    const handleMouseLeaveTrigger = (e) => {
      if (hoverMode) {
        if (triggerHoverTimeoutRef.current) {
          clearTimeout(triggerHoverTimeoutRef.current);
        }
      }
      if (props.onMouseLeave) {
        props.onMouseLeave(e);
      }
    };

    const { onClick, onMouseEnter, onMouseLeave, ...otherProps } = props;

    if (asChild) {
      const child = React.Children.only(children);

      if (!React.isValidElement(child)) {
        throw new Error(
          "DropdownMenuTrigger when asChild is true must have a single valid React element child."
        );
      }

      return React.cloneElement(child, {
        ...child.props,
        ref: (node) => {
          triggerRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }

          const childRef = child.ref;
          if (childRef) {
            if (typeof childRef === "function") {
              childRef(node);
            } else if (childRef.hasOwnProperty("current")) {
              childRef.current = node;
            }
          }
        },
        onClick: (e) => {
          handleClick(e);
          if (child.props.onClick) child.props.onClick(e);
        },
        onMouseEnter: (e) => {
          handleMouseEnter(e);
          if (child.props.onMouseEnter) child.props.onMouseEnter(e);
        },
        onMouseLeave: (e) => {
          handleMouseLeaveTrigger(e);
          if (child.props.onMouseLeave) child.props.onMouseLeave(e);
        },
      });
    }

    return (
      <button
        ref={(node) => {
          triggerRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveTrigger}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const dropdownMenuContentVariants = cva(
  `z-50 min-w-[8rem] overflow-hidden rounded-xl border-2 border-[#E5E7EB]
   bg-white p-1 text-[#0F172A] shadow-[0_8px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)]`,
  {
    variants: {
      variant: {
        default: "",
        contextMenu: "min-w-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const DropdownMenuContent = React.forwardRef(
  (
    {
      className,
      children,
      align = "center",
      alignOffset = 0,
      side = "bottom",
      sideOffset = 4,
      variant,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
      throw new Error("DropdownMenuContent must be used within a DropdownMenu");
    }

    const { open, setOpen, hoverMode, triggerRef } = context;
    const menuRef = React.useRef(null);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const [menuWidth, setMenuWidth] = React.useState(null);

    const contentMouseLeaveTimeoutRef = React.useRef(null);

    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, setOpen, triggerRef]);

    const handleMouseLeave = (e) => {
      if (hoverMode) {
        if (contentMouseLeaveTimeoutRef.current) {
          clearTimeout(contentMouseLeaveTimeoutRef.current);
        }
        contentMouseLeaveTimeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, 150);
      }

      if (props.onMouseLeave) {
        props.onMouseLeave(e);
      }
    };

    const handleMouseEnterContent = (e) => {
      if (hoverMode) {
        if (contentMouseLeaveTimeoutRef.current) {
          clearTimeout(contentMouseLeaveTimeoutRef.current);
        }
        if (triggerRef.current) {
          if (triggerRef.current._hoverTimeoutRef) {
            clearTimeout(triggerRef.current._hoverTimeoutRef);
            triggerRef.current._hoverTimeoutRef = null;
          }
        }
      }
      if (props.onMouseEnter) {
        props.onMouseEnter(e);
      }
    };

    React.useEffect(() => {
      if (!open || !triggerRef.current) return;

      const updatePosition = () => {
        if (!triggerRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        let menuRect = menuRef.current?.getBoundingClientRect();

        if (!menuRect) {
          const dummyDiv = document.createElement("div");
          dummyDiv.style.visibility = "hidden";
          dummyDiv.style.position = "absolute";
          dummyDiv.style.minWidth = "8rem";
          dummyDiv.style.padding = "1px";
          dummyDiv.style.border = "1px solid";
          dummyDiv.className = cn(
            dropdownMenuContentVariants({ variant }),
            className
          );
          document.body.appendChild(dummyDiv);
          menuRect = dummyDiv.getBoundingClientRect();
          document.body.removeChild(dummyDiv);
        }

        let top = 0;
        let left = 0;

        if (side === "bottom") {
          top = triggerRect.bottom + sideOffset;
        } else if (side === "top") {
          top = triggerRect.top - (menuRect?.height || 0) - sideOffset;
        } else if (side === "left" || side === "right") {
          top =
            triggerRect.top +
            triggerRect.height / 2 -
            (menuRect?.height || 0) / 2;
        }

        if (side === "right") {
          left = triggerRect.right + sideOffset;
        } else if (side === "left") {
          left = triggerRect.left - (menuRect?.width || 0) - sideOffset;
        } else {
          if (align === "start") {
            left = triggerRect.left + alignOffset;
          } else if (align === "center") {
            left =
              triggerRect.left +
              triggerRect.width / 2 -
              (menuRect?.width || 0) / 2 +
              alignOffset;
          } else if (align === "end") {
            left = triggerRect.right - (menuRect?.width || 0) - alignOffset;
          }
        }

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (left + (menuRect?.width || 0) > windowWidth) {
          left = windowWidth - (menuRect?.width || 0) - 8;
        }

        if (left < 8) {
          left = 8;
        }

        if (top + (menuRect?.height || 0) > windowHeight) {
          if (
            side === "bottom" &&
            triggerRect.top > (menuRect?.height || 0) + sideOffset
          ) {
            top = triggerRect.top - (menuRect?.height || 0) - sideOffset;
          } else {
            const maxHeight = windowHeight - top - 8;
            if (menuRef.current) {
              menuRef.current.style.maxHeight = `${maxHeight}px`;
            }
          }
        }

        setPosition({ top, left });
        
        // Set menu width to match trigger width
        if (triggerRef.current) {
          setMenuWidth(triggerRef.current.getBoundingClientRect().width);
        }
      };

      updatePosition();

      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [
      open,
      align,
      alignOffset,
      side,
      sideOffset,
      triggerRef,
      children,
      variant,
      className,
    ]);

    const { onMouseLeave, onMouseEnter, ...otherProps } = props;

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              menuRef.current = node;
            }}
            className={cn(
              dropdownMenuContentVariants({ variant }),
              "dropdown-scrollbar",
              className
            )}
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: 50,
              maxHeight: "calc(90vh - 60px)",
              overflowY: "auto",
              width: menuWidth ? `${menuWidth}px` : "auto",
              minWidth: menuWidth ? `${menuWidth}px` : "200px",
            }}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnterContent}
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            {...otherProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuLabel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  )
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuItem = React.forwardRef(
  ({ className, inset, disabled = false, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
      throw new Error("DropdownMenuItem must be used within a DropdownMenu");
    }

    const { setOpen } = context;

    const handleClick = (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      setOpen(false);

      if (props.onClick) {
        props.onClick(e);
      }
    };

    const { onClick, ...otherProps } = props;

    return (
      <div
        ref={ref}
        className={cn(
          `relative flex cursor-pointer select-none items-center 
        rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-150
        focus:bg-[#F8FAFC] focus:text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#0F172A] 
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
          inset && "pl-8",
          className
        )}
        onClick={handleClick}
        data-disabled={disabled ? "" : undefined}
        {...otherProps}
      />
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-[#E5E7EB]", className)}
      {...props}
    />
  )
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-1", className)} {...props} />
  )
);
DropdownMenuGroup.displayName = "DropdownMenuGroup";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
};

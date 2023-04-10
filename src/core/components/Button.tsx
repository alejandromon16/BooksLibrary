import { motion, MotionProps } from 'framer-motion';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  icon?: React.ReactNode;
  animationProps?: MotionProps;
}

const Button: React.FC<ButtonProps> = ({
  href,
  icon,
  children,
  animationProps = {},
  ...props
}) => {
  const ButtonComponent = href ? 'a' : 'button';
  const MotionButton = motion(ButtonComponent);

  return (
    <MotionButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...animationProps}
      as={ButtonComponent}
      href={href}
      style={{
        padding:"var(--space-2xs) var(--space-2xs)",
        backgroundColor:"var(--color-primary)",
        borderRadius:"var(--br-button)",
        borderColor:"transparent",
        color:"var(--color-white)",
        fontWeight:"var(--fw-bold)",
        outline: "none",
      }}
      {...props}
    >
      {icon && <span className="icon">{icon}</span>}
      {children && <span className="text">{children}</span>}
    </MotionButton>
  );
};

export default Button;

import React from "react";

interface ExampleProps extends React.ComponentProps<"p"> {
  text: string;
  variant?: 'primary' | 'secondary';
}

export default function Example({ text, variant = 'primary', ...props }: ExampleProps) {
  return (
    <p className={variant === 'primary' ? 'text-blue-500' : 'text-red-500'} {...props}>
      {text}
    </p>
  )
}

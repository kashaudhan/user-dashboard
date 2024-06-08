type ButtonProps = {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);
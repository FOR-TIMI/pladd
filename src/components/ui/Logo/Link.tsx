import React from 'react';

interface LinkProps {
    children?: React.ReactNode;
    className?: string;
}

const LogoLink: React.FC<LinkProps> = ({ children, className }) => {
    return (
        <a
          href="#"
          className={"flex items-center gap-2 logo-link " + className}
          aria-label="Pladd Technologies Consulting Inc."
        >
          <img className="w-8 h-8"  src="/logo.svg" alt="Pladd Technologies consulting Inc." />
          <div className="text-gradient text-2xl font-bold">Pladd</div>
          {children}
        </a>
    );
};

export default LogoLink;
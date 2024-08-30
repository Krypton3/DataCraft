import React from "react";

interface IconProps {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  [key: string]: any;
}

export const Activity: React.FC<IconProps> = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path d="M6.918 14.854l2.993-3.889 3.414 2.68 2.929-3.78" />
        <path d="M19.668 2.35a1.922 1.922 0 11-1.922 1.922 1.921 1.921 0 011.922-1.922z" />
        <path d="M20.756 9.269a20.809 20.809 0 01.194 3.034c0 6.938-2.312 9.25-9.25 9.25s-9.25-2.312-9.25-9.25 2.313-9.25 9.25-9.25a20.931 20.931 0 012.983.187" />
      </g>
    </svg>
  );
};

export const Flash: React.FC<IconProps> = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.09 13.28h3.09v7.2c0 1.68.91 2.02 2.02.76l7.57-8.6c.93-1.05.54-1.92-.87-1.92h-3.09v-7.2c0-1.68-.91-2.02-2.02-.76l-7.57 8.6c-.92 1.06-.53 1.92.87 1.92Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Server: React.FC<IconProps> = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.32 10H4.69c-1.48 0-2.68-1.21-2.68-2.68V4.69c0-1.48 1.21-2.68 2.68-2.68h14.63C20.8 2.01 22 3.22 22 4.69v2.63C22 8.79 20.79 10 19.32 10ZM19.32 22H4.69c-1.48 0-2.68-1.21-2.68-2.68v-2.63c0-1.48 1.21-2.68 2.68-2.68h14.63c1.48 0 2.68 1.21 2.68 2.68v2.63c0 1.47-1.21 2.68-2.68 2.68ZM6 5v2M10 5v2M6 17v2M10 17v2M14 6h4M14 18h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const Model: React.FC<IconProps> = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="6" cy="12" r="2" stroke={fill} strokeWidth="1.5" />
      <circle cx="18" cy="12" r="2" stroke={fill} strokeWidth="1.5" />
      <circle cx="12" cy="6" r="2" stroke={fill} strokeWidth="1.5" />
      <circle cx="12" cy="18" r="2" stroke={fill} strokeWidth="1.5" />
      <line x1="8" y1="12" x2="10" y2="6" stroke={fill} strokeWidth="1.5" />
      <line x1="8" y1="12" x2="10" y2="18" stroke={fill} strokeWidth="1.5" />
      <line x1="16" y1="12" x2="14" y2="6" stroke={fill} strokeWidth="1.5" />
      <line x1="16" y1="12" x2="14" y2="18" stroke={fill} strokeWidth="1.5" />
    </svg>
  );
};

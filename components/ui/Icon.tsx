interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export default function Icon({ name, size = 20, className, ...props }: IconProps) {
  return (
    <svg width={size} height={size} className={className} {...props}>
      <use href={`/sprite.svg#icon-${name}`} />
    </svg>
  );
}

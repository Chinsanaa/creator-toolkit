export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  ring?: boolean;
  className?: string;
}

export declare function Avatar(props: AvatarProps): JSX.Element;

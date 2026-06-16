export interface ProgressBarProps {
  label?: string;
  value: number;
  max?: number;
  format?: (value: number, max: number) => string;
  className?: string;
}

export declare function ProgressBar(props: ProgressBarProps): JSX.Element;

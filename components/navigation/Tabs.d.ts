export interface Tab {
  value: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange?: (value: string) => void;
  variant?: 'pill' | 'underline';
  className?: string;
}

export declare function Tabs(props: TabsProps): JSX.Element;

export type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
};

export type TableData = Record<string, any>[];
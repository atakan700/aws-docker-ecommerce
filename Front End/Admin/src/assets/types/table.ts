export type TableColumn<T> = {
  header: string;
  accessor: keyof T;
};

export type TableData = Record<string, any>[];
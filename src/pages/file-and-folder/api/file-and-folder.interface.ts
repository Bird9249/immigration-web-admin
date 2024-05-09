export interface FileAndFolderState {
  parent_id: string;
}

export interface FileAndFolderResponse {
  id: number;
  parent_id: number;
  name: string;
  size: number;
  type: "file" | "directory";
  created_at: string;
  updated_at: string;
}

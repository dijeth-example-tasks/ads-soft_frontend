export interface RecordModel {
  data: Record<string, string>
  access: boolean
}

export interface FindRequestBody {
  data: Record<string, string>
}

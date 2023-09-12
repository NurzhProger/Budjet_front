export interface budget_list {
  count?: number,
  next: string,
  previous?: string,
  results: [budget_list_doc]
}

export interface budget_list_doc {
  id: number,
  org_name: string,
  _organization: number,
  _date:string,
  god_ucheta: string,
  _vid_dannyh: string,
  _vid_operacii: string,
  deleted: boolean,
}

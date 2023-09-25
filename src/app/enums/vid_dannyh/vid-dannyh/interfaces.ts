export interface vid_dannyh {
    name: string
}

export interface vvid_dannyh_list {
    count?: number,
    next: string,
    previous?: string,
    results: [vid_dannyh]
}
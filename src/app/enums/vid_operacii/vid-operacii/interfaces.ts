export interface vid_operacii {
    name: string
}

export interface vid_operacii_list {
    count?: number,
    next: string,
    previous?: string,
    results: [vid_operacii]
}
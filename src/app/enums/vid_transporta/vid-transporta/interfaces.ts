export interface vid_transporta_element {
    name: string
}

export interface vid_transporta_list {
    count?: number,
    next: string,
    previous?: string,
    results: [vid_transporta_element]
}
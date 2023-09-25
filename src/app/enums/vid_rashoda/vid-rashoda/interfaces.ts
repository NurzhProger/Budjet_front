export interface vid_rashoda {
    name: string
}

export interface vid_rashoda_list {
    count?: number,
    next: string,
    previous?: string,
    results: [vid_rashoda]
}
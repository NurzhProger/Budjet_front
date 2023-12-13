export interface zakluchenie_doc {
    id: number,
    nom: string,
    _organization: {
        id: number,
        name_rus: string,
        name_kaz: string
    },
    _date: string,
    god_ucheta: string,
    deleted: boolean,
    comment: string,
    summ: number,
    _vid_dannyh: string,
    _vid_rashoda: string

}

export interface zakluchenie_list {
    count?: number,
    next: string,
    previous?: string,
    results: [zakluchenie_doc]
}
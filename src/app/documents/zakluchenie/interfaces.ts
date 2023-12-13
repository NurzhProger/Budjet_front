
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

export interface zakluchenie_detail {
    head: zakluchenie_doc,
    tbl: [zakluchenie_doc_tab]
}

export interface zakluchenie_doc_tab {
    id: number,
    _zakluchenie: {
        id: number,
        nom: string,
        org_name: string
    },
    _spec: {
        id: number,
        code: string,
        name_rus: string
    }
    _fkr: {
        id: number,
        code: string,
        name_rus: string
    },
    original_summ: number,
    changes_summ: number,
    final_summ: number,
    description: string,
    characteristics: string
}
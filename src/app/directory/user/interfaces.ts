export interface user_detail {
    id: number,
    last_login: string,
    date_joined: string,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    is_active: boolean,
    organization: org_detail
}

export interface org_detail {
    id: number,
    name_rus: string
}

export interface user_list {
    count?: number,
    next: string,
    previous?: string,
    results: [user_detail]
}

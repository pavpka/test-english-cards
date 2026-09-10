export type User = {
    username: string,
    password: string
}

type AuthResponse = {
    isAllowed: boolean,
    token: string | null
}

const mockUser: User = {
    username: "admin",
    password: "admin"
}

export function authUser(user: User): Promise<AuthResponse> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isAllowed =
                user.username === mockUser.username &&
                user.password === mockUser.password

            resolve({isAllowed, token: 'abc' })
        }, 1000)
    })
}

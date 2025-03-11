class User {
    name: string
    email: string
    password: string
    

    constructor(name: string, email: string, password: string) {
        this.name = name
        this.email = email
        this.password = password
        
    }
}

const getUsers = (): User[] => {
    const usersData = localStorage.getItem('users')
    return usersData ? JSON.parse(usersData) : []
}

const saveUsers = (users: User[]): void => {
    localStorage.setItem('users', JSON.stringify(users))
}

const register = (name: string, email: string, password: string): string => {
    const users = getUsers()

    if (users.some((user) => user.email === email)) {
        return 'Email already registered!'
    }

    const newUser = new User(name, email, password)
    users.push(newUser)
    saveUsers(users)

    return 'User registered successfully!'
}

const login = (email: string, password: string): string => {
    const users = getUsers()

    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
        return `Login successful! Welcome, ${user.name}!`
    } else {
        return 'User not found'
    }
}

export { User, register, login }

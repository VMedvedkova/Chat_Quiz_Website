export const getQestions = async () => {
    const request = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard')
    return await request.json()
}

export const getUsers = async () => {
    const request = await fetch('https://jsonplaceholder.typicode.com/users')
    return await request.json()
}

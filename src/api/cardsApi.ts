const mockUrl = "https://6aa2a4cfccb3db9689a6d31a.mockapi.io/v1/cards";

export type CardResponse = {
    id: number,
    wordOfTheDay: boolean,
    word: string,
    partOfSpeech: string,
    example: string,
    translation: string

}

export function getCards(): Promise<CardResponse[]> {
    return fetch(mockUrl).then(res => res.json())
    .then((res : CardResponse[]) => res)
    .catch((e) => {throw new Error(e)})
}

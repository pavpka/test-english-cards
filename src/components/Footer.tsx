export type Contacts = {
	label: string
	links: {
		label: string
		url: string
	}[]
}[];

export function Footer ({contacts} : {contacts : Contacts }) {

    return (
        <>
        {contacts.map((element) => {
            return (
                <div key={element.label}>
                    <div>{element.label}</div>
                    {element.links.map ((link, linkIndex) => { return (
                        <a key={linkIndex} href={link.url} target="blank">
                        {link.label}
                        </a>
                    );})}
                </div>
            )
        })}
        </>
    )
}
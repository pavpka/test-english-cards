import "./Footer.scss";

export type Contacts = {
	label: string
	links: {
		label: string
		url: string
	}[]
}[];

export function Footer ({contacts} : {contacts : Contacts }) {

    return (
        <footer className="footer">
        {contacts.map((element) => {
            return (
                <div className="footer__column" key={element.label}>
                    <div className="footer__title">{element.label}</div>
                    {element.links.map ((link, linkIndex) => { return (
                        <a className="footer__link" key={linkIndex} href={link.url} target="blank">
                        {link.label}
                        </a>
                    );})}
                </div>
            )
        })}
        </footer>
    )
}
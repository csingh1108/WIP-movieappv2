import {footerLinks} from "../constants/index.js";

const Footer = () => {
    return (
        <section id="footer" className="flex flex-col mt-12">
            <div className={`flex-1 flex w-full justify-between flex-wrap md:flex-row flex-col md:mt-0 mt-10 font-montserrat text-white md:text-left text-center`}>
                {footerLinks.map((footerLink) => (
                    <div key={footerLink.key}>
                        <h1 className=" text-[20px]">{footerLink.title}</h1>
                        <ul className="list-none mt-8">
                            {footerLink.links.map((link,index) => (
                                <li key={link.name} className={`font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${index !== footerLink.length-1 ? "mb-4" : "mb-0"}`}>
                                    {link.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="text-white font-montserrat mt-16">
                <p>2023 Apex Theatre. All Rights Reserved.</p>
            </div>
            
        </section>
    );
};

export default Footer;
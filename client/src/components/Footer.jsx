import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaSquareThreads,
    FaGithubSquare,
    FaSquareXTwitter,
} from "react-icons/fa";

const FooterComp = () => {
    return (
        <Footer
            container
            className="border border-t-8 border-emerald-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link
                            to="/"
                            className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                            <span className="px-2 py-1 bg-gradient-to-r from-rose-500  to-emerald-500 rounded-lg text-white">
                                VIG&apos;s
                            </span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-6 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    My Projects
                                </Footer.Link>
                                <Footer.Link
                                    href="/about"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    VIG&apos;s Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us" />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href="https://www.github.com/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    GitHub
                                </Footer.Link>
                                <Footer.Link
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    LinkedIn
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#">
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider>
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright
                            href="#"
                            by="VIG's Blog"
                            year={new Date().getFullYear()}
                        />
                        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                            <Footer.Icon
                                href="https://www.facebook.com"
                                icon={FaFacebookSquare}
                            />
                            <Footer.Icon
                                href="https://www.instagram.com"
                                icon={FaInstagramSquare}
                            />
                            <Footer.Icon
                                href="https://www.threads.com"
                                icon={FaSquareThreads}
                            />
                            <Footer.Icon
                                href="https://www.github.com"
                                icon={FaGithubSquare}
                            />
                            <Footer.Icon
                                href="https://www.xtwitter.com"
                                icon={FaSquareXTwitter}
                            />
                        </div>
                    </div>
                </Footer.Divider>
            </div>
        </Footer>
    );
};

export default FooterComp;

import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="flex flex-col w-full border-t z-10 bg-black text-white py-10 gap-8">
			<section className="flex flex-row justify-around max-sm:flex-col max-sm:items-center">
				<div>
					<h2 className="text-2xl font-bold max-sm:text-center">ClickEtPaf</h2>
					<p className="text-gray-400">
						Une recherche, un clic, une histoire, une claque !
					</p>
				</div>

				<nav aria-label="Réseaux Sociaux" className="mt-8 flex justify-center md:justify-start space-x-6">
					<Link href="https://www.instagram.com/clicketpaf_?igsh=bmlsNmZib3A3ZXN0&utm_source=qr" className="text-gray-400 hover:text-white">
						<FaInstagram size={20} />
					</Link>
					<Link href="https://www.linkedin.com/in/clicket-paf-9900b8351/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="text-gray-400 hover:text-white">
						<FaLinkedin size={20} />
					</Link>
				</nav>
			</section>

			<section className="flex flex-col items-center gap-2">
				<nav aria-label="Footer Navigation">
					<ul className="flex flex-row w-full justify-center gap-8">
						<li>
							<Link href="/histoires" className="hover:text-gray-300">
								Histoires
							</Link>
						</li>
						<li>
							<Link href="/about" className="hover:text-gray-300">
								À propos
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:text-gray-300">
								Contact
							</Link>
						</li>
					</ul>
				</nav>

				<hr className="border-t border-white w-1/2" />

				<p className="text-gray-500">
					© {new Date().getFullYear()} Click&Paf. Tous droits réservés.
				</p>
			</section>
		</footer>
	);
}

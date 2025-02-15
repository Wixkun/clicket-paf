import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className='flex flex-col w-full border-t z-10 bg-black text-white py-10 gap-8'>
			<div className='flex flex-row justify-around'>
				<div>
					<h2 className='text-2xl font-bold'>ClickEtPaf</h2>
					<p className='text-gray-400'>
						Une recherche, un clic, une histoire, une claque !
					</p>
				</div>

				<div className='mt-8 flex justify-center md:justify-start space-x-6'>
					<Link href='#' className='text-gray-400 hover:text-white'>
						<FaInstagram size={20} />
					</Link>
					<Link href='#' className='text-gray-400 hover:text-white'>
						<FaLinkedin size={20} />
					</Link>
				</div>
			</div>

			<div className='flex flex-col items-center gap-2'>
				<ul className='flex flex-row w-full justify-center gap-8'>
					<li>
						<Link href='/histoires' className='hover:text-gray-300'>
							Histoires
						</Link>
					</li>
					<li>
						<Link href='/about' className='hover:text-gray-300'>
							À propos
						</Link>
					</li>
					<li>
						<Link href='/contact' className='hover:text-gray-300'>
							Contact
						</Link>
					</li>
				</ul>

				<hr className='border-t border-white w-1/2' />

				<p className='text-gray-500'>
					© {new Date().getFullYear()} Click&Paf. Tous droits
					réservés.
				</p>
			</div>
		</footer>
	);
}

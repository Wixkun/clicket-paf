import Image from "next/image";
import Link from "next/link";

export default function StoryBlog() {
  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Header Section */}
      <header className="text-center mt-8 mb-8">
        <h1 className="text-4xl font-bold">
          Découvrez des <span className="text-gray-500">Histoires Absurdes</span>
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Plongez dans des récits captivants allant du policier au fantastique, avec une touche d'humour.
        </p>
      </header>

      {/* Featured Image */}
      <div className="flex justify-center">
        <Image 
          src="/images/story-cover.jpg" 
          alt="Histoires absurdes en ligne" 
          width={800} 
          height={450} 
          priority 
        />
      </div>

      {/* CTA Section */}
      <div className="text-center mt-6">
        <Link href="/histoires" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Lire des Histoires
        </Link>
      </div>

    </div>
  );
}

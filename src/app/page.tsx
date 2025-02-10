import { Card, CardContent } from "@/components/ui/card";

export default function StoryBlog() {
  return (
    <div className="bg-gray-100 min-h-screen">

      
      {/* Header Section */}
      <header className="text-center mt-8 mb-8">
        <h1 className="text-4xl font-bold">
          Discover the World's <span className="text-gray-500">Greatest</span> Stories
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Plongez dans des récits captivants allant du policier à la romance, en passant par la science-fiction.
        </p>
        <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Explore More
        </button>
      </header>
      
      {/* Top Genres Section */}
      <section className="mb-12 px-6">
        <h2 className="text-2xl font-semibold mb-4">Top Genres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Policier", "Romance", "Science-Fiction", "Fantastique"].map((genre, index) => (
            <Card key={index} className="p-4 text-center">
              <div className="bg-gray-300 h-40 w-full rounded-md mb-2"></div>
              <p className="font-medium">{genre}</p>
            </Card>
          ))}
        </div>
      </section>
      
      {/* Latest Stories Section */}
      <section className="px-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Stories</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-4">
            <div className="bg-gray-300 h-60 w-full rounded-md mb-2"></div>
            <h3 className="font-semibold text-lg">Le Mystère du Manoir Abandonné</h3>
            <p className="text-gray-600">Une enquête haletante dans un manoir aux secrets bien gardés.</p>
          </Card>
          <div className="space-y-4">
            {["Un Amour Interdit", "Les Chroniques du Futur", "L'Ombre du Détective"].map((story, index) => (
              <Card key={index} className="p-4">
                <div className="bg-gray-300 h-20 w-full rounded-md mb-2"></div>
                <p className="font-medium">{story}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

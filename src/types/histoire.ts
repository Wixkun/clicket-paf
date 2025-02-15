export interface Histoire {
	id: string;
	titre: string;
	contenu: string;
	auteur: string;
	created_at: string;
	slug: string;
}

export interface HistoireWithImage extends Histoire {
	image: string;
}

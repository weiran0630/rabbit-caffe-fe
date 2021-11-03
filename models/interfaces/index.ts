export interface Formats {}

export interface ProviderMetadata {}

export interface IImage {
	id: string;
	name: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string;
	provider: string;
	provider_metadata: ProviderMetadata;
	related: string;
	created_by: string;
	updated_by: string;
}

export interface IPlaceOrigin {
	id: string;
	place_name: string;
	published_at: string;
	created_by: string;
	updated_by: string;
}

export interface IRoastLevel {
	id: string;
	level: string;
	published_at: string;
	created_by: string;
	updated_by: string;
}

export interface ICategory {
	id: string;
	cate_name: string;
	cate_image: IImage;
	published_at: string;
	created_by: string;
	updated_by: string;
}

export interface ICompany {
	id: string;
	com_name: string;
	published_at: string;
	created_by: string;
	updated_by: string;
}

export interface IProduct {
	id: string;
	title: string;
	unit: string;
	description: string;
	price: number;
	image: IImage[];
	place_origin: IPlaceOrigin;
	roast_level: IRoastLevel;
	category: ICategory;
	company: ICompany;
	published_at: Date;
}

export interface IFilter {
	searchTerm?: string;
	categoryId?: string;
	companyId?: string;
	placeOriginId?: string;
	roastLevelId?: string;
}

export interface ICategory {
	id: number;
	cate_name: string;
	product: number;
	created_at: Date;
	updated_at: Date;
	cate_image?: IImage;
}

export interface ICompany {
	id: number;
	com_name: string;
	product: number;
	created_at: Date;
	updated_at: Date;
}

export interface IRoastLevel {
	id: number;
	level: string;
	product: number;
	created_at: Date;
	updated_at: Date;
}

export interface ProviderMetadata {
	public_id: string;
	resource_type: string;
}

export interface Small {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path?: any;
	size: number;
	width: number;
	height: number;
	provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata2 {
	public_id: string;
	resource_type: string;
}

export interface Thumbnail {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path?: any;
	size: number;
	width: number;
	height: number;
	provider_metadata: ProviderMetadata2;
}

export interface ProviderMetadata3 {
	public_id: string;
	resource_type: string;
}

export interface Medium {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path?: any;
	size: number;
	width: number;
	height: number;
	provider_metadata: ProviderMetadata3;
}

export interface Formats {
	small: Small;
	thumbnail: Thumbnail;
	medium: Medium;
}

export interface ProviderMetadata4 {
	public_id: string;
	resource_type: string;
}

export interface IImage {
	id: number;
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
	previewUrl?: any;
	provider: string;
	provider_metadata: ProviderMetadata4;
	created_at: Date;
	updated_at: Date;
}

export interface IPlaceOrigin {
	id: number;
	place_name: string;
	product?: number;
	created_at: Date;
	updated_at: Date;
}

export interface IProduct {
	id: number;
	title: string;
	price: number;
	unit: string;
	description: string;
	category: ICategory;
	company: ICompany;
	place_origin?: number;
	roast_level: IRoastLevel;
	created_at: Date;
	updated_at: Date;
	image: IImage[];
	place_origins: IPlaceOrigin[];
}

export interface IFilter {
	searchTerm: string;
	categoryId: number | null;
	companyId: number | null;
	placeOriginId: number | null;
	roastLevelId: number | null;
}

// concat IProduct with amount
export type CartItemType = IProduct & { amount: number };

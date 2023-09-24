export interface RegisterBody {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	files: File[];
}

export interface LoginBody {
	email: string;
	password: string;
}

export interface LoginResponse {
	token?: string;
}

export interface AuthUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	active: boolean;
	createdAt: string;
	updatedAt: string;
	avatar: string;
	photos: Photo[];
	fullName: string;
}

export interface Photo {
	id: number;
	name: string;
	url: string;
	createdAt: string;
	updatedAt: string;
}

export interface ApiError {
	message?: string;
	status?: number;
}

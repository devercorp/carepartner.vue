export type LoginForm = {
	id: string;
	password: string;
};

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
};

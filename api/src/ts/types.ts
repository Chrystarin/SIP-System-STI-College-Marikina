type Requestor = {
	role: 'admin' | 'moderator' | 'teacher';
	employeeId: string;
	createdAt: Date;
};

export { Requestor };
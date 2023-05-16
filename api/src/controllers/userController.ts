import { RequestHandler } from 'express';
import { UserRequestHandler } from '../ts/interfaces';
import User, { IUser } from '../models/User';

const getUsers: RequestHandler = async (req, res) => {
	// Destructure the employeeId and role properties from the query object in the request and cast it to IUser
	const { employeeId, role } = req.query as unknown as IUser;

	// Query the database for users that match the employeeId and role properties and exclude the credentials property from the result
	const users = await User.find({ employeeId, role }, { credentials: 0 })
		.lean()
		.exec();

	// Send a JSON response containing the users array
	res.json(users);
};

const updatePassword: UserRequestHandler = async (req, res) => {
	// Extract the new password from the request body.
	const { password } = req.body.credentials;

	// Get the user object from the request object
	const user = req.user;

	// Update the user's password in the database.
	user.credentials.password = password;
	await user.save();

	// Send a success response to the client.
	res.json({ message: 'Password updated successfully' }); // send a JSON response to the client
};

export { getUsers, updatePassword };
